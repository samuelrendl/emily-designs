import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with costume designer Emily Kontu by email, Instagram or IMDb.",
};

/**
 * Contact is a set of real links rather than the design system's form: the
 * site is a static export served from GitHub Pages, so there is no server to
 * receive a submission and a form would silently drop messages. The design
 * system's Input/TextArea are ported in components/ui and ready if a form
 * endpoint is ever added.
 */
const CHANNELS = [
  {
    label: "Email",
    value: "emily.kontu@gmail.com",
    href: "mailto:emily.kontu@gmail.com",
    external: false,
  },
  {
    label: "Instagram",
    value: "@emicostumes",
    href: "https://www.instagram.com/emicostumes/?hl=en-gb",
    external: true,
  },
  {
    label: "IMDb",
    value: "Emily Kontu",
    href: "https://www.imdb.com/name/nm13903798/?ref_=fn_al_nm_1",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[720px] px-4 py-16 sm:px-12">
      <h1 className="type-h1">Contact</h1>
      <p className="type-body-lg mt-4 text-secondary">
        Casting a production and need a costume designer? Write to me.
      </p>

      <dl className="mt-10 border-t border-subtle">
        {CHANNELS.map((channel) => (
          <div
            key={channel.label}
            className="flex flex-col gap-1 border-b border-subtle py-5 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <dt className="type-label text-secondary sm:w-28 sm:shrink-0">
              {channel.label}
            </dt>
            <dd className="type-body-lg">
              <Link
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-primary underline decoration-[var(--border-accent)] underline-offset-4 transition-colors duration-fast ease-standard hover:text-secondary"
              >
                {channel.value}
              </Link>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
