const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "http://127.0.0.1:11434",
});

async function chatWithAI(prompt) {

  const response = await ollama.chat({
    model: "qwen2.5:3b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });


  return response.message.content;
}

module.exports = {
  chatWithAI,
};