import React from "react";
import { Video, LogIn, UserPlus } from "lucide-react";

export const Header = ({
  isLoggedIn,
  openDialog,
  openLoginDialog,
  openRegisterDialog,
}) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900">
      <h1 className="text-4xl text-white pl-20">DevTube</h1>
      <div className="flex gap-4">
        {isLoggedIn ? (
          <button
            onClick={openDialog}
            className="bg-blue-500 py-2 px-4 rounded text-white flex items-center gap-2"
          >
            <Video /> Adicionar Vídeo
          </button>
        ) : (
          <>
            <button
              onClick={openLoginDialog}
              className="bg-blue-500 py-2 px-4 rounded text-white flex items-center gap-2"
            >
              <LogIn /> Login
            </button>
            <button
              onClick={openRegisterDialog}
              className="bg-blue-500 py-2 px-4 rounded text-white flex items-center gap-2"
            >
              <UserPlus /> Adicionar Conta
            </button>
          </>
        )}
      </div>
    </header>
  );
};
