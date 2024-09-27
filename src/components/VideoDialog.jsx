import React from "react";
import { X } from "lucide-react";
import { VideoForm } from "./VideoForm";

export const VideoDialog = ({
  dialogRef,
  closeDialog,
  categoriesList,
  setVideoList,
}) => {
  return (
    <dialog ref={dialogRef} className="p-8 bg-gray-800 rounded-lg w-1/3">
      <div className="flex">
        <h2 className="text-3xl text-white">Cadastrar Vídeo</h2>
        <button
          onClick={closeDialog}
          className="absolute top-2 end-3 bg-gray-900 p-2 rounded-full text-white"
        >
          <X />
        </button>
      </div>
      <VideoForm
        categoriesList={categoriesList}
        setVideoList={setVideoList}
        setShowForm={closeDialog}
      />
    </dialog>
  );
};
