import { useState } from "react";
import { createVideo, getVideos } from "../services/api";

export const VideoForm = ({ categoriesList, setVideoList, setShowForm }) => {
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    description: "",
    category_id: 0,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^https?:\/\/.+\..+/.test(newVideo.url)) {
      newErrors.url = "URL inválida.";
    }
    if (newVideo.category_id === 0) {
      newErrors.category_id = "Por favor, selecione uma categoria.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      await createVideo(newVideo);
      setShowForm(false);
      const videos = await getVideos();
      setVideoList(videos);
    } catch (error) {
      console.error("Erro ao criar vídeo:", error);
      alert(
        "Ocorreu um erro ao tentar criar o vídeo. Por favor, tente novamente."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 rounded-lg "
    >
      <input
        type="text"
        name="title"
        placeholder="Título do Vídeo"
        value={newVideo.title}
        onChange={handleInputChange}
        className="p-2 rounded"
        required
      />
      {errors.title && <span className="text-red-500">{errors.title}</span>}
      <input
        type="text"
        name="url"
        placeholder="URL Incorporada YouTube (iframe)"
        value={newVideo.url}
        onChange={handleInputChange}
        className="p-2 rounded"
        required
      />
      {errors.url && <span className="text-red-500">{errors.url}</span>}
      <input
        type="text"
        name="description"
        placeholder="Descrição do Vídeo"
        value={newVideo.description}
        onChange={handleInputChange}
        className="p-2 rounded"
      />
      {errors.description && (
        <span className="text-red-500">{errors.description}</span>
      )}
      <select
        name="category_id"
        value={newVideo.category_id}
        onChange={handleInputChange}
        className="p-2 rounded"
        required
      >
        <option value={0}>Selecione uma Categoria</option>
        {categoriesList.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.category_id && (
        <span className="text-red-500">{errors.category_id}</span>
      )}
      <button
        type="submit"
        className="bg-blue-500 py-2 px-4 rounded-lg text-white"
      >
        Cadastrar
      </button>
    </form>
  );
};
