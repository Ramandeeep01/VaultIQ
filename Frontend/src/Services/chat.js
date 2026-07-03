import api from "../api";

// Get chat history of a vault
export const getChats = async (vaultId) => {
  const res = await api.get(`/chat/${vaultId}`, {
    withCredentials: true,
  });

  return res.data;
};