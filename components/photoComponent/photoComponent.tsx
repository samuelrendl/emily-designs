"use client";

import Image from "next/image";
import { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Photo {
  name: string;
  photosUrls?: string[];
  director?: string;
  by?: string;
  dop?: string;
  production?: string;
  costumes?: string;
}

interface PhotoComponentProps {
  photos: {
    [key: string]: Photo;
  };
}

const PhotoComponent: FC<PhotoComponentProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:justify-items-center">
      {Object.entries(photos).map(([key, item]) => (
        <div key={key} className="max-w-[500px]">
          <Swiper
            modules={[Pagination]}
            pagination={{ dynamicBullets: true }}
            grabCursor={true}
            className="h-[350px] 2xl:h-[500px]"
            style={{ margin: 0 }}
          >
            {item.photosUrls?.map((photoUrl, index) => (
              <SwiperSlide key={index} className="relative overflow-hidden">
                <Image
                  src={photoUrl}
                  alt={`Photo ${index + 1} of ${item.name}`}
                  loading="lazy"
                  quality={100}
                  fill={true}
                  sizes="(min-width: 1300px) 500px, 284px"
                  className="object-cover rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="">
            <h3 className="text-lg underline font-bold">{item.name}</h3>
            {item.director ? <p>Director: {item.director}</p> : null}
            {item.by ? <p>By: {item.by}</p> : null}
            {item.dop ? <p>DoP: {item.dop}</p> : null}
            {item.production ? <p>Production: {item.production}</p> : null}
            {item.costumes ? <p>Costumes: {item.costumes}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoComponent;
