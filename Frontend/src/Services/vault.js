import api from "../api";

export const getAllVaults = async () => {
  const response = await api.get("/vault/vaults");
  return response.data;
};

export const createVault = async (vaultData) => {
    const response = await api.post("/vault/create-vault", vaultData);
    return response.data;
};

export const getVaultById = async (vaultId) => {
    const response = await api.get(`/vault/vault/${vaultId}`);
    return response.data;
};

export const updateVault = async (vaultId, vaultData) => {
    const response = await api.put(`/vault/vault/${vaultId}`, vaultData);
    return response.data;
};

export const deleteVault = async (vaultId) => {
    const response = await api.delete(`/vault/vault/${vaultId}`);
    return response.data;
};  

export const getDocumentsByVault = async (vaultId) => {
  const response = await api.get(`/document/${vaultId}`);
  return response.data;
};

