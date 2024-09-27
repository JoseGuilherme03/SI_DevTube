import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const VideoList = ({ categoriesList, videoList }) => {
  return (
    <>
      {categoriesList &&
        categoriesList.map((category) => {
          const filteredVideos = videoList.filter(
            (video) => video.category_id === category.id
          );

          if (filteredVideos.length === 0) return null;

          return (
            <div key={category.id} className="flex flex-col px-10 gap-3 h-72">
              <h2 className="text-3xl">{category.name}</h2>

              <div className="flex gap-7 h-full w-full">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={4}
                  slidesPerGroup={1}
                  navigation
                  pagination={{ clickable: true }}
                  style={{ width: "100%" }}
                  modules={[Navigation]}
                >
                  {filteredVideos.map((video) => (
                    <SwiperSlide
                      key={video.id}
                      style={{ width: "25%", minWidth: "300px" }}
                    >
                      <iframe src={video.url} className="h-full w-full" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          );
        })}
    </>
  );
};
