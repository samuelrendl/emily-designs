import Image from "next/image";

export default function About() {
  return (
    <section className="flex flex-col gap-7 mx-2 max-w-[1500px] pt-5 justify-center items-center lg:flex-row 2xl:mx-auto">
      <div className="flex flex-col gap-4">
        <h2 className="font-playfair text-2xl underline">About me</h2>
        <p>
          I remember sketching designs in kindergarden and hating it when it was
          time to abandon the colourful pencils and gather for nap time. I guess
          this never really changed: I’m still obsessed with designing costumes
          and my sleep schedule is still not the best…
        </p>
        <p>
          But no matter if it’s for a theatre production, film or a photo
          shooting creating costumes that help the viewer escape into a
          different world is always a new beautiful challenge.
        </p>
        <p>
          I’m convinced that your financial situation should never stop you from
          starting a project. So I‘m happy to help no matter your budget,
          whatever it is I’m sure we can find a good solution for everyone and
          create something that helps you tell the story visually. <br/> So are you
          ready to go time travelling through costumes?
        </p>
      </div>
      <div className="w-full max-w-[500px] rounded-md lg:order-first">
        <Image
          src="/photos/About/aboutPhoto.jpg"
          height={1000}
          width={1000}
          alt="Emily Kontu"
          className="object-contain rounded-md"
        />
      </div>
    </section>
  );
}
