import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import api from "../api";
import { getAllVaults } from "../Services/vault";

import CreateVaultForm from "../Components/CreateVaultForm";
import VaultCard from "../Components/VaultCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vaults"],
    queryFn: getAllVaults,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e7eaf6] flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-[#113f67]">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#e7eaf6] flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-600">
          Something went wrong.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e7eaf6]">

      <div className="bg-[#113f67] text-white shadow-xl">

        <div className="max-w-7xl mx-auto px-10 py-8 flex justify-between items-center">

          <div>
            <h1 className="text-5xl font-black tracking-wide">
              VaultIQ
            </h1>

            <div className="w-24 h-1 bg-[#a2a8d3] rounded-full mt-3"></div>

            <p className="mt-5 text-[#e7eaf6] text-lg">
              Securely organize your documents and chat with AI.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="border-2 border-white px-7 py-3 rounded-xl font-semibold transition duration-300 hover:bg-white hover:text-[#113f67]"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-10 py-10">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-[#113f67]">
            Create New Vault
          </h2>

          <p className="text-gray-500 mt-2">
            Store resumes, notes, PDFs and let AI answer questions from them.
          </p>

          <div className="mt-8">
            <CreateVaultForm />
          </div>

        </div>

        <div className="mt-12">

          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-4xl font-bold text-[#113f67]">
                Your Vaults
              </h2>

              <p className="text-gray-500 mt-2">
                Open any vault to upload documents or chat with AI.
              </p>
            </div>

            <div className="bg-[#a2a8d3] text-[#113f67] px-6 py-3 rounded-xl font-semibold">
              {data.length} Vault{data.length !== 1 ? "s" : ""}
            </div>

          </div>

          {data.length === 0 ? (

            <div className="mt-10 bg-white rounded-3xl shadow-lg p-16 text-center">

              <h3 className="text-3xl font-bold text-[#113f67]">
                No Vaults Yet
              </h3>

              <p className="text-gray-500 mt-3">
                Create your first vault above to start uploading documents.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">

              {data.map((vault) => (
                <VaultCard
                  key={vault._id}
                  vault={vault}
                />
              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;