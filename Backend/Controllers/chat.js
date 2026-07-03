const mongoose = require("mongoose");
const { chatWithAI } = require("../Services/ollama");
const Document = require("../Models/document");
const Chat = require("../Models/chat");

const chat = async (req, res) => {
  try {
    const { message, vaultId } = req.body;

    if (!message || !vaultId) {
      return res.status(400).json({
        message: "Message and Vault ID are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(vaultId)) {
      return res.status(400).json({
        message: "Invalid vaultId",
      });
    }

    const documents = await Document.find({
      vault: vaultId,
    });

    let context = "";

    for (const doc of documents) {
      if (doc.extractedText && doc.extractedText.trim()) {
        context += `
Document: ${doc.title}

${doc.extractedText.slice(0, 3000)}

----------------------------
`;
      }
    }

    let prompt = "";

    if (!context.trim()) {
      prompt = `
You are VaultIQ AI.

The uploaded documents contain no readable text.

Reply normally using your general knowledge.

User:
${message}
`;
    } else {
      prompt = `
You are VaultIQ AI.

Rules:

1. If the user greets you (hello, hi, hey, good morning, thanks, bye, etc.), reply naturally.

2. If the question is about the uploaded documents, answer ONLY using the uploaded documents.

3. If the answer is not present in the uploaded documents, reply exactly:
"Not found in the uploaded documents."

DOCUMENTS:
${context}

USER QUESTION:
${message}
`;
    }

    const reply = await chatWithAI(prompt);

    // -----------------------------
    // SAVE CHAT
    // -----------------------------
    await Chat.create({
      question: message,
      answer: reply,
      vault: vaultId,
      user: req.user._id, // <-- Change this only if your middleware uses a different property
    });

    return res.status(200).json({
      reply,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  chat,
};