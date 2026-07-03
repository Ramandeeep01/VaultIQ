import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/signup", form);
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="overflow-y-hidden min-h-screen bg-[#e7eaf6] flex items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-5xl min-h-[580px] overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[42%_58%]">

        <div className="relative hidden md:flex flex-col justify-between bg-[#113f67] p-12 text-white">

          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#38598b] opacity-40"></div>
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#a2a8d3] opacity-20"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-black tracking-wide">
              VaultIQ
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#a2a8d3]" />

            <h2 className="mt-20 text-4xl font-bold leading-tight">
              Your
              <br />
              Knowledge.
              <br />
              Your AI.
            </h2>

            <p className="mt-6 text-lg text-[#e7eaf6]">
              One secure place for everything.
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[3px] text-[#a2a8d3]">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="mt-5 inline-flex rounded-xl border border-white px-8 py-3 font-semibold transition duration-300 hover:bg-white hover:text-[#113f67]"
            >
              Login
            </Link>
          </div>

        </div>

        <div className="flex flex-col justify-center bg-white p-10 md:p-14">

          <h1 className="text-4xl font-bold text-[#113f67]">
            Signup
          </h1>

          <p className="mt-2 text-gray-500">
            Create your account to get started.
          </p>

          <form
            onSubmit={submit}
            className="mt-10 space-y-8"
          >

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b-2 border-[#a2a8d3] bg-transparent py-3 text-lg outline-none transition focus:border-[#113f67]"
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
            />

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
              Signup
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}