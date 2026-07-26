import { ButtonLink, GalleryCard, Masonry } from "@/components/ui";
import { categoryLabel, getGalleryItems } from "@/utils/portfolio";

/**
 * Home — ink hero band over a short masonry of selected work.
 *
 * The headline is Emily's own line, lifted from her About copy, rather than
 * the design system's sample hero ("I dress the story before it speaks"),
 * which was written for the brief and not by her.
 */
export default function Home() {
  const selected = getGalleryItems().slice(0, 6);

  return (
    <>
      <section className="bg-ink px-4 py-20 text-center text-primary-inverse sm:px-12 sm:py-24">
        <p className="type-label text-accent-pale">
          Costume Design for Film &amp; Television
        </p>
        <h1 className="type-display-1 mx-auto mt-5 max-w-[900px]">
          Are you ready to go time travelling through costumes?
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/gallery" variant="primary" surface="dark">
            View Gallery
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" surface="dark">
            Get in Touch
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-4 pb-16 pt-14 sm:px-12">
        <h2 className="type-h2">Selected Work</h2>
        <p className="type-body mt-2 max-w-[560px] text-secondary">
          Costumes built for the screen and the stage - plus the sketches,
          recreations and sewing projects behind them.
        </p>

        <div className="mt-8">
          <Masonry>
            {selected.map((item, index) =>
              item.kind === "project" ? (
                <GalleryCard
                  key={item.key}
                  photo={item.cover}
                  title={item.project.title}
                  caption={[
                    item.project.year,
                    categoryLabel(item.project.category),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  href={`/projects/${item.project.slug}`}
                  priority={index < 3}
                />
              ) : (
                // Loose photos have no page of their own; on the home page
                // they lead into the gallery so every card here behaves the
                // same way when you hover or click it.
                <GalleryCard
                  key={item.key}
                  photo={item.loose.photo}
                  title={categoryLabel(item.loose.category)}
                  caption={item.loose.note}
                  href="/gallery"
                  priority={index < 3}
                />
              ),
            )}
          </Masonry>
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/gallery" variant="secondary">
            See All Work
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
