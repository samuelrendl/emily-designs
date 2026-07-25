import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import aboutPhotoSize from "@/utils/imageDimensions.json";

export const metadata: Metadata = {
  title: "About",
  description:
    "Emily Kontu on designing costumes for theatre, film and photo shoots — and working to any budget.",
};

const ABOUT_PHOTO = "/photos/About/aboutPhoto.jpg";

/** Emily's own copy, kept word for word — only the styling has changed. */
export default function About() {
  const photo = aboutPhotoSize[ABOUT_PHOTO as keyof typeof aboutPhotoSize];

  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 py-12 sm:px-12 lg:flex-row lg:items-start lg:gap-14">
      <div className="w-full lg:max-w-[460px] lg:shrink-0">
        <Image
          src={ABOUT_PHOTO}
          width={photo.width}
          height={photo.height}
          alt="Emily Kontu"
          sizes="(min-width: 1024px) 460px, 92vw"
          priority
          className="h-auto w-full rounded-sm border border-primary shadow-photo"
        />
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="type-h1">About me</h1>
        <p className="type-body-lg">
          I remember sketching designs in kindergarden and hating it when it was
          time to abandon the colourful pencils and gather for nap time. I guess
          this never really changed: I&rsquo;m still obsessed with designing
          costumes and my sleep schedule is still not the best&hellip;
        </p>
        <p className="type-body text-secondary">
          But no matter if it&rsquo;s for a theatre production, film or a photo
          shooting creating costumes that help the viewer escape into a
          different world is always a new beautiful challenge.
        </p>
        <p className="type-body text-secondary">
          I&rsquo;m convinced that your financial situation should never stop you
          from starting a project. So I&rsquo;m happy to help no matter your
          budget, whatever it is I&rsquo;m sure we can find a good solution for
          everyone and create something that helps you tell the story visually.
        </p>
        <p className="type-body-lg">
          So are you ready to go time travelling through costumes?
        </p>

        <div className="mt-2 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="primary">
            Get in Touch
          </ButtonLink>
          <ButtonLink href="/gallery" variant="secondary">
            View Gallery
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
