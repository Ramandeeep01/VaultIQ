import api from "../api";

// send question to backend AI
export const askAI = async (message, vaultId) => {
  const res = await api.post("/ai/chat", {
    message,
    vaultId,
  });

  return res.data;
};