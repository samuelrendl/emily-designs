import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex flex-col items-center font-playfair gap-3 m-auto">
      <p className="text-5xl">Contact me via</p>
      <p className="select-all text-2xl">emily.kontu@gmail.com</p>
      {/* <p className="text-2xl">or</p> */}
      <Link
        href={"https://www.instagram.com/emicostumes/?hl=en-gb"}
        target="_blank"
        className="underline text-2xl"
      >
        Instagram
      </Link>
      <Link
        href={"https://www.imdb.com/name/nm13903798/"}
        target="_blank"
        className="underline text-2xl"
      >
        IMBd
      </Link>

    </div>
  );
}
