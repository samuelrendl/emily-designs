import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectPhotos } from "@/components/gallery/ProjectPhotos";
import { ButtonLink, Tag } from "@/components/ui";
import {
  categoryLabel,
  creditEntries,
  getProject,
  getProjects,
} from "@/utils/portfolio";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Every project is known at build time — required for the static export. */
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const credits = creditEntries(project.credits)
    .map(([label, value]) => `${label}: ${value}`)
    .join(". ");

  return {
    title: project.title,
    description:
      `${categoryLabel(project.category)} - costume design by Emily Kontu.` +
      (credits ? ` ${credits}.` : ""),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const credits = creditEntries(project.credits);

  return (
    <article className="mx-auto max-w-[1200px] px-4 py-12 sm:px-12">
      <Link
        href="/gallery"
        className="type-label text-secondary no-underline transition-colors duration-fast ease-standard hover:text-primary"
      >
        &larr; Back to Gallery
      </Link>

      <header className="mt-6 flex flex-wrap items-start justify-between gap-4 border-b border-primary pb-6">
        <div>
          <h1 className="type-h1">{project.title}</h1>
          {project.year && (
            <p className="type-caption mt-1.5 text-secondary">{project.year}</p>
          )}
        </div>
        <Tag tone="accent">{categoryLabel(project.category)}</Tag>
      </header>

      {credits.length > 0 && (
        <dl className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-[max-content_1fr]">
          {credits.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="type-label text-secondary">{label}</dt>
              <dd className="type-body">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10">
        <ProjectPhotos photos={project.photos} title={project.title} />
      </div>

      <div className="mt-8">
        <ButtonLink href="/gallery" variant="secondary">
          Back to Gallery
        </ButtonLink>
      </div>
    </article>
  );
}
