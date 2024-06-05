import PhotoComponent from "@/components/photoComponent/photoComponent";
import SinglePhotos from "@/components/singlePhotos/SinglePhotos";

import films from "../../../utils/films.json";
import plays from "../../../utils/plays.json";
import costumeRecreations from "../../../utils/costumeRecreations.json";
import sketches from "../../../utils/sketches.json";
import sewingProjects from "../../../utils/sewingProjects.json";
import photoProjects from "../../../utils/photoProjects.json";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <section className="max-w-[1800px] mx-auto w-full pt-5">
      <div className="mx-2 mb-10">
        <h2 className="text-2xl font-bold border-solid border-black border-b-2 mb-4 font-playfair">
          Short Films
        </h2>
        <PhotoComponent photos={films.shortFilms} />
      </div>
      <div className="mx-2 mb-10">
        <h2 className="text-2xl font-bold border-solid border-black border-b-2 mb-4 font-playfair">
          Plays
        </h2>
        <PhotoComponent photos={plays.plays} />
      </div>
      <div className="mx-2 mb-10">
        <h2 className="text-2xl font-bold border-solid border-black border-b-2 mb-4 font-playfair">
          Costume Recreations
        </h2>
        <SinglePhotos url={costumeRecreations.urls} />
      </div>
      <div className="mx-2 mb-10">
        <h2 className="text-2xl font-bold border-solid border-black border-b-2 mb-4 font-playfair">
          Sketches
        </h2>
        <SinglePhotos url={sketches.urls} />
      </div>
      <div className="mx-2 mb-10">
        <h2 className="text-2xl font-bold border-solid border-black border-b-2 mb-4 font-playfair">
          Individual Sewing Projects
        </h2>
        <SinglePhotos url={sewingProjects.urls} />
      </div>
      <div className="mx-2 mb-10">
        <h2 className="text-2xl font-bold border-solid border-black border-b-2 mb-4 font-playfair">
          Photo projects
        </h2>
        <SinglePhotos url={photoProjects.urls} />
      </div>
      <div id="Contact" className="mx-2 mb-10 h-96 flex justify-center items-center">
        <Contact />
      </div>
    </section>
  );
}
