import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/user/login", form);
      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen overflow-y-hidden bg-[#e7eaf6] flex items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-5xl min-h-[580px] overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div className="hidden md:flex md:w-[42%] flex-col justify-between bg-[#113f67] relative overflow-hidden p-12 text-white">

          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#38598b]/40"></div>
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#a2a8d3]/20"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-black tracking-wide">
              VaultIQ
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#a2a8d3]" />

            <h2 className="mt-20 text-4xl font-bold leading-tight">
              Welcome
              <br />
              Back.
            </h2>

            <p className="mt-6 text-lg text-[#e7eaf6]/90">
              Access your vaults, documents and AI workspace.
            </p>
          </div>

          <div className="relative z-10">
            <p className="uppercase tracking-[3px] text-sm text-[#a2a8d3]">
              New to VaultIQ?
            </p>

            <Link
              to="/signup"
              className="mt-5 inline-flex rounded-xl border border-white px-8 py-3 font-semibold transition duration-300 hover:bg-white hover:text-[#113f67]"
            >
              Signup
            </Link>
          </div>

        </div>

        <div className="flex-1 flex items-center bg-white">

          <div className="w-full p-10 md:p-14">

            <h1 className="text-4xl font-bold text-[#113f67]">
              Login
            </h1>

            <p className="mt-2 text-gray-500">
              Login to your VaultIQ account.
            </p>

            <form
              onSubmit={submit}
              className="mt-10 space-y-8"
            >

              <input
                type="email"
                placeholder="Email"
                className="w-full border-b-2 border-[#a2a8d3] bg-transparent py-3 text-lg outline-none transition focus:border-[#113f67]"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border-b-2 border-[#a2a8d3] bg-transparent py-3 text-lg outline-none transition focus:border-[#113f67]"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <button className="w-full rounded-xl bg-[#113f67] py-3 text-lg font-semibold text-white transition duration-300 hover:bg-[#38598b]">
                Login
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}