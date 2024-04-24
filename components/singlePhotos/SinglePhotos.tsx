import { FC } from "react";
import Image from "next/image";

interface UrlsProps {
  url: object;
}

const SinglePhotos: FC<UrlsProps> = ({ url }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(url).map(([key, item]) => (
        <div key={key} className="relative overflow-hidden max-w-[500px] mx-auto">
          <Image
            src={item}
            alt={`Photo ${key + 1}`}
            height={1000}
            width={1000}
            loading="lazy"
            className="object-contain rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default SinglePhotos;
