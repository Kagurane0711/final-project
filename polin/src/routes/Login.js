import React from "react";
import { FcGoogle } from "react-icons/fc";
import ImgLogin from "../assets/ImgLogin.jpg";
import logo from "../assets/logo.png";
import { getGoogleAuthUrl } from "../services/api";

const Login = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={ImgLogin}
          alt="Perpustakaan Polin"
        />
      </div>

      <div className="bg-slate-50 flex flex-col justify-center px-6">
        <div className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          <img
            className="max-w-[180px] w-full mx-auto mb-6"
            src={logo}
            alt="Polin Logo"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Selamat Datang di Polin
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Masuk dengan akun Google Anda untuk mulai membaca buku digital.
          </p>

          <div className="flex justify-center">
            <a
              href={getGoogleAuthUrl()}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all"
            >
              <FcGoogle className="text-xl mr-3" />
              <span>Masuk dengan Google</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

