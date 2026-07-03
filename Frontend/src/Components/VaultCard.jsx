import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVault, deleteVault } from "../Services/vault";

const VaultCard = ({ vault }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: vault.name,
    description: vault.description,
  });

  // ---------------- UPDATE ----------------
  const updateMutation = useMutation({
    mutationFn: ({ vaultId, vaultData }) =>
      updateVault(vaultId, vaultData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] });
      setIsEditing(false);
    },
  });

  // ---------------- DELETE ----------------
  const deleteMutation = useMutation({
    mutationFn: deleteVault,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      vaultId: vault._id,
      vaultData: form,
    });
  };

  return (
    <div className="group relative bg-white border border-[#a2a8d3]/40 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col justify-between h-[260px]">

      {!isEditing ? (
        <>
          <div>

            <h1 className="text-xl font-bold text-[#113f67] truncate">
              {vault.name}
            </h1>

            <p className="text-sm text-gray-500 mt-2 line-clamp-3">
              {vault.description || "No description provided"}
            </p>

          </div>

          <div className="flex flex-col gap-2 mt-6">

            <button
              onClick={() => navigate(`/vault/${vault._id}`)}
              className="bg-[#113f67] text-white py-2 rounded-xl font-semibold hover:bg-[#38598b] transition"
            >
              Open Vault
            </button>

            <div className="flex gap-2">

              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 border border-[#a2a8d3] text-[#113f67] py-2 rounded-xl hover:bg-[#e7eaf6] transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteMutation.mutate(vault._id)}
                className="flex-1 border border-red-300 text-red-500 py-2 rounded-xl hover:bg-red-50 transition"
              >
                Delete
              </button>

            </div>

          </div>
        </>
      ) : (
        // ---------------- EDIT MODE ----------------
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            className="border border-[#a2a8d3] rounded-xl px-3 py-2 outline-none focus:border-[#113f67]"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Vault name"
          />

          <textarea
            className="border border-[#a2a8d3] rounded-xl px-3 py-2 outline-none focus:border-[#113f67] resize-none h-24"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Description"
          />

          <div className="flex gap-2 mt-2">

            <button
              type="submit"
              className="flex-1 bg-[#113f67] text-white py-2 rounded-xl hover:bg-[#38598b]"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 border border-gray-300 py-2 rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>

        </form>
      )}

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-[#a2a8d3]/10 to-transparent pointer-events-none"></div>

    </div>
  );
};

export default VaultCard;