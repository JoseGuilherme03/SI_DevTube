import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getVideos, getCategories } from "../services/api";
import { LogOut, PlusCircle, X } from "lucide-react";
import { VideoForm } from "../components/VideoForm";

export const HomePage = () => {
  const [videoList, setVideoList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);

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
    setIsDialogOpen(true);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogRef.current.close();
  };

  return (
    <div
      className={`flex flex-col bg-black h-screen w-screen text-white gap-8 ${
        isDialogOpen ? "overflow-hidden" : ""
      }`}
    >
      <header className="h-20 border-b border-blue-500 flex items-center justify-center relative">
        <h1 className="text-4xl font-bold">DevTube</h1>
        <div className="absolute right-10 flex gap-10">
          <button
            className="bg-blue-500 py-3 px-5 rounded-lg text-xl flex items-center gap-2"
            onClick={openDialog}
          >
            <PlusCircle /> Cadastrar Vídeo
          </button>
          <button className="bg-blue-500 py-3 px-5 rounded-lg text-xl flex items-center gap-2">
            <LogOut /> Logout
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-5 text-white flex-grow">
        {categoriesList &&
          categoriesList.map((category) => (
            <div key={category.id} className="flex flex-col px-10 gap-3 h-1/2">
              <h2 className="text-3xl">{category.name}</h2>
              <div className="flex gap-10 h-full w-full">
                {videoList &&
                  videoList
                    .filter((video) => video.category_id === category.id)
                    .map((video) => (
                      <iframe
                        key={video.id}
                        src={video.url}
                        className="h-full w-[25%]"
                      />
                    ))}
              </div>
            </div>
          ))}
          
      </main>
      {isDialogOpen && (
        <div className="fixed inset-0 h-screen w-screen 1/2 bg-black opacity-50 z-10"></div>
      )}
      <dialog ref={dialogRef} className="p-8 bg-gray-800 rounded-lg w-1/3">
        <div className="flex">
          <h2 className="text-3xl text-white">Cadastrar Vídeo</h2>{" "}
          <button
            onClick={closeDialog}
            className="absolute top-2 end-3 bg-gray-900 p-2 rounded-full text-white"
          >
            <X></X>
          </button>
        </div>
        <VideoForm
          categoriesList={categoriesList}
          setVideoList={setVideoList}
          setShowForm={closeDialog}
        />
      </dialog>
    </div>
  );
};
