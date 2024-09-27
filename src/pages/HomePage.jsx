import React, { useState, useRef, useEffect } from "react";
import { getVideos, getCategories, login, register } from "../services/api";
import { Header } from "../components/Header";
import { VideoList } from "../components/VideoList";
import { LoginDialog } from "../components/LoginDialog";
import { RegisterDialog } from "../components/RegisterDialog";
import { VideoDialog } from "../components/VideoDialog";

export const HomePage = () => {
  const [videoList, setVideoList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const loginDialogRef = useRef(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const registerDialogRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await getVideos();
      setVideoList(videos);
      const categories = await getCategories();
      setCategoriesList(categories);
    };

    fetchVideos();
  }, []);

  const openDialog = () => {
    if (isLoggedIn) {
      setIsDialogOpen(true);
      dialogRef.current.showModal();
    } else {
      openLoginDialog();
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogRef.current.close();
  };

  const openLoginDialog = () => {
    setIsLoginOpen(true);
    loginDialogRef.current.showModal();
  };

  const closeLoginDialog = () => {
    setIsLoginOpen(false);
    loginDialogRef.current.close();
  };

  const openRegisterDialog = () => {
    setIsRegisterOpen(true);
    registerDialogRef.current.showModal();
  };

  const closeRegisterDialog = () => {
    setIsRegisterOpen(false);
    registerDialogRef.current.close();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setIsLoggedIn(true);
      setLoginError("");
      closeLoginDialog();
    } catch (error) {
      setLoginError("Usuário ou senha inválidos");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setRegisterError("");
      closeRegisterDialog();
    } catch (error) {
      setRegisterError("Dados Incorretos");
    }
  };

  return (
    <div
      className={`flex flex-col bg-black h-screen w-screen pb-10 overflow-x-hidden text-white gap-8 no-scrollbar ${
        isDialogOpen || isLoginOpen || isRegisterOpen ? "overflow-hidden" : ""
      }`}
    >
      <Header
        isLoggedIn={isLoggedIn}
        openDialog={openDialog}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
      />

      <main className="flex flex-col gap-8 text-white flex-grow">
        <VideoList categoriesList={categoriesList} videoList={videoList} />
      </main>

      {isDialogOpen && (
        <div className="fixed inset-0 h-screen w-screen bg-black opacity-50 z-10"></div>
      )}
      {isLoginOpen && (
        <div className="fixed inset-0 h-screen w-screen bg-black opacity-50 z-10"></div>
      )}
      {isRegisterOpen && (
        <div className="fixed inset-0 h-screen w-screen bg-black opacity-50 z-10"></div>
      )}
      <VideoDialog
        dialogRef={dialogRef}
        closeDialog={closeDialog}
        categoriesList={categoriesList}
        setVideoList={setVideoList}
      />
      <LoginDialog
        loginDialogRef={loginDialogRef}
        closeLoginDialog={closeLoginDialog}
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
      />
      <RegisterDialog
        registerDialogRef={registerDialogRef}
        closeRegisterDialog={closeRegisterDialog}
        handleRegister={handleRegister}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        registerError={registerError}
      />
    </div>
  );
};
