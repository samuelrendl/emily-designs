import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex flex-col items-center font-playfair gap-4 m-auto">
      <p className="text-5xl font-bold">Contact me via</p>
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl">emily.kontu@gmail.com</p>
        <Link
          href={"https://www.instagram.com/emicostumes/?hl=en-gb"}
          target="_blank"
          className="underline text-2xl"
        >
          Instagram
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-bold">and checkout my</p>
        <Link
          href={"https://www.imdb.com/name/nm13903798/?ref_=fn_al_nm_1"}
          target="_blank"
          className="underline text-2xl"
        >
          IMDb
        </Link>
      </div>
    </div>
  );
}
