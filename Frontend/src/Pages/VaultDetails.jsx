import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getVaultById, getDocumentsByVault } from "../Services/vault";
import { askAI } from "../Services/ai";
import { getChats } from "../Services/chat";
import api from "../api";

const VaultDetails = () => {
  const { vaultId } = useParams();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");

  // ---------------- VAULT ----------------
  const { data: vault } = useQuery({
    queryKey: ["vault", vaultId],
    queryFn: () => getVaultById(vaultId),
  });

  // ---------------- DOCS ----------------
  const { data: documents = [] } = useQuery({
    queryKey: ["documents", vaultId],
    queryFn: () => getDocumentsByVault(vaultId),
  });

  // ---------------- CHATS ----------------
  const { data: chats = [] } = useQuery({
    queryKey: ["chats", vaultId],
    queryFn: () => getChats(vaultId),
  });

  // ---------------- UPLOAD ----------------
  const uploadMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await api.post("/document/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", vaultId] });
      setTitle("");
      setFile(null);
    },
  });

  // ---------------- DELETE DOC ----------------
  const deleteMutation = useMutation({
    mutationFn: async (documentId) => {
      const res = await api.delete(`/document/${documentId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", vaultId] });
    },
  });

  // ---------------- AI CHAT ----------------
  const aiMutation = useMutation({
    mutationFn: ({ message, vaultId }) => askAI(message, vaultId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats", vaultId] });
    },
  });

  const sendMessage = () => {
    if (!input.trim()) return;

    aiMutation.mutate({
      message: input,
      vaultId: String(vaultId),
    });

    setInput("");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !title) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("vaultId", vaultId);
    formData.append("file", file);

    uploadMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[#e7eaf6] p-6">

      <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-[#113f67]">
          {vault?.name}
        </h1>
        <p className="text-gray-500 mt-1">
          {vault?.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1 space-y-6">

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-xl font-semibold text-[#113f67] mb-4">
              Upload Document
            </h2>

            <form onSubmit={handleUpload} className="space-y-3">

              <input
                className="w-full border border-[#a2a8d3] rounded-xl p-2 outline-none focus:border-[#113f67]"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
              />

              <button className="w-full bg-[#113f67] text-white py-2 rounded-xl hover:bg-[#38598b] transition">
                Upload
              </button>

            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-xl font-semibold text-[#113f67] mb-4">
              Documents
            </h2>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">

              {documents.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No documents uploaded yet
                </p>
              )}

              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="border border-gray-200 rounded-xl p-3"
                >
                  <p className="font-medium text-[#113f67]">
                    {doc.title}
                  </p>

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    className="text-sm text-blue-600"
                  >
                    Open File
                  </a>

                  <button
                    onClick={() => deleteMutation.mutate(doc._id)}
                    className="text-red-500 text-sm block mt-1"
                  >
                    Delete
                  </button>
                </div>
              ))}

            </div>
          </div>

        </div>

        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow-md h-[80vh] flex flex-col">

            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-[#113f67]">
                AI Chat
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">

              {chats.map((chat) => (
                <div key={chat._id} className="space-y-2">

                  <div className="flex justify-end">
                    <div className="bg-[#113f67] text-white px-4 py-2 rounded-2xl max-w-[70%]">
                      {chat.question}
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-[#e7eaf6] text-[#113f67] px-4 py-2 rounded-2xl max-w-[70%]">
                      {chat.answer}
                    </div>
                  </div>

                </div>
              ))}

              {aiMutation.isPending && (
                <p className="text-gray-500">AI thinking...</p>
              )}

            </div>

            <div className="p-4 border-t flex gap-2">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-[#a2a8d3] rounded-xl px-3 py-2 outline-none focus:border-[#113f67]"
                placeholder="Ask something..."
              />

              <button
                onClick={sendMessage}
                className="bg-[#113f67] text-white px-6 rounded-xl hover:bg-[#38598b]"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default VaultDetails;