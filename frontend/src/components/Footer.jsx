import { officeLocations } from "../data/locations";

const exploreLinks = [
  "Home",
  "About AcdyOn",
  "Programs",
  "Universities",
  "Doctoral Pathways",
  "AcdyOn × upGrad",
  "Honorary Recognition",
  "AI & Technology",
  "Contact Us",
];

const legalLinks = [
  "Privacy Policy",
  "Terms & Conditions",
  "Refund Policy",
  "Cookie Policy",
];

export default function Footer() {
  return (
    <footer className="bg-[#090909] py-16 text-white">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_1.4fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/acdyon-logo.webp" alt="AcdyOn Logo" className="h-9 w-auto object-contain brightness-0 invert" />
              <span className="text-2xl font-semibold tracking-[-0.06em]">
                AcdyOn
              </span>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              AcdyOn provides access to globally recognized executive education,
              doctoral pathways, academic advancement programmes, and honorary
              recognition opportunities through international institutional partnerships.
            </p>

            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-white/35">
              Global Executive Education & Academic Recognition Platform
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-white/40">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a href="#top" className="text-sm text-white/65 transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-white/40">
              Offices
            </h3>

            <div className="mt-5 grid gap-7 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {officeLocations.map((office) => (
                <article key={office.id}>
                  <p className="text-sm font-medium">
                    {office.flag} {office.country}
                  </p>
                  <p className="mt-2 text-xs font-medium text-white/70">
                    {office.name}
                  </p>
                  <a
                    className="mt-2 block text-xs text-white/45 hover:text-white"
                    href={`mailto:${office.email}`}
                  >
                    {office.email}
                  </a>
                  <a
                    className="mt-1 block text-xs text-white/45 hover:text-white"
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                  >
                    {office.phone}
                  </a>
                  <p className="mt-2 text-xs leading-5 text-white/40">
                    {office.address}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <a key={link} href="#top" className="text-xs text-white/45 hover:text-white">
                  {link}
                </a>
              ))}
            </div>

            <p className="text-xs text-white/40">
              © 2026 AcdyOn Technologies LLC. All Rights Reserved.
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-white/35">
            <p>USA Entity: AcdyOn Technologies LLC · Wyoming, United States</p>
            <p>UK Entity: AcdyOn Technologies Ltd · Wolverhampton, United Kingdom</p>
            <p>
              India Operational Entity: REBB Ventures Private Limited · Noida, UP, India
            </p>
            <p className="mt-4 max-w-5xl">
              AcdyOn facilitates access to programmes and academic pathways
              through partner institutions. Final admissions, academic evaluation,
              credential conferral and academic standards are governed by the
              respective institutions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
