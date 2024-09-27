import React from "react";
import { X } from "lucide-react";

export const LoginDialog = ({
  loginDialogRef,
  closeLoginDialog,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  loginError,
}) => {
  return (
    <dialog
      ref={loginDialogRef}
      className="p-10 bg-gray-800 rounded-lg h-[38%] w-1/4"
    >
      <div className="flex">
        <h2 className="text-3xl text-white pb-5">Login</h2>
        <button
          onClick={closeLoginDialog}
          className="absolute top-2 end-3 bg-gray-900 p-2 rounded-full text-white"
        >
          <X></X>
        </button>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleLogin}
        autocomplete="off"
      >
        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded bg-gray-700 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autocomplete="off"
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autocomplete="off"
        />
        {loginError && <p className="text-red-500">{loginError}</p>}
        <button type="submit" className="bg-blue-500 py-2 rounded text-white">
          Entrar
        </button>
      </form>
    </dialog>
  );
};
