import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVault } from "../Services/vault";

const CreateVaultForm = () => {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: createVault,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] });

      setForm({
        name: "",
        description: "",
      });

      setShowForm(false);
    },

    onError: (error) => {
      alert(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-2 rounded-xl bg-[#113f67] text-white font-semibold hover:bg-[#38598b] transition"
      >
        + Create Vault
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />

          {/* MODAL BOX */}
          <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-[#a2a8d3]">

            <h2 className="text-2xl font-bold text-[#113f67]">
              Create New Vault
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Organize your documents into a secure space
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Vault Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border-b-2 border-[#a2a8d3] py-3 outline-none focus:border-[#113f67] transition"
              />

              {/* DESCRIPTION */}
              <textarea
                name="description"
                placeholder="Vault Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border-b-2 border-[#a2a8d3] py-3 outline-none focus:border-[#113f67] transition resize-none"
                rows={3}
              />

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="px-5 py-2 rounded-xl bg-[#113f67] text-white hover:bg-[#38598b] transition"
                >
                  {mutation.isPending ? "Creating..." : "Create"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default CreateVaultForm;