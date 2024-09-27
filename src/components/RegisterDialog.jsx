import React from "react";
import { X } from "lucide-react";

export const RegisterDialog = ({
  registerDialogRef,
  closeRegisterDialog,
  handleRegister,
  username,
  setUsername,
  password,
  setPassword,
  registerError,
}) => {
  return (
    <dialog
      ref={registerDialogRef}
      className="p-10 bg-gray-800 rounded-lg h-[38%] w-1/4"
    >
      <div className="flex">
        <h2 className="text-3xl text-white pb-5">Registrar</h2>
        <button
          onClick={closeRegisterDialog}
          className="absolute top-2 end-3 bg-gray-900 p-2 rounded-full text-white"
        >
          <X></X>
        </button>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleRegister}
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded bg-gray-700 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        {registerError && <p className="text-red-500">{registerError}</p>}
        <button type="submit" className="bg-blue-500 py-2 rounded text-white">
          Registrar
        </button>
      </form>
    </dialog>
  );
};
