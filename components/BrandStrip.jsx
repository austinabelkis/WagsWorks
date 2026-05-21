// Full sponsor-wall grid — all 60 brand partners in full color.
// Expects window.WW_BRANDS from data/brands.js.
// Logo path: assets/logos/${b.logo}  with CDN fallback → text name.
// No grayscale — color transparent PNGs as-is.

function BrandLogo({ brand }) {
  const localSrc = `assets/logos/${brand.logo}`;
  const [src, setSrc] = React.useState(localSrc);
  const [failed, setFailed] = React.useState(false);

  const tryNext = () => {
    if (src === localSrc && brand.fallbackUrl) {
      setSrc(brand.fallbackUrl);
    } else {
      setFailed(true);
    }
  };

  const href = brand.domain ? `https://${brand.domain}` : "#";

  return (
    <a
      className="wwk-bs__item"
      href={href}
      target={brand.domain ? "_blank" : undefined}
      rel="noreferrer noopener"
      title={brand.name}
    >
      {failed ? (
        <span className="wwk-bs__name">{brand.name}</span>
      ) : (
        <img
          src={src}
          alt={brand.name}
          loading="lazy"
          className="wwk-bs__logo"
          onError={tryNext}
        />
      )}
    </a>
  );
}

function BrandStrip({ eyebrow = "Past clients", title = "Brands we've worked with" }) {
  const brands = window.WW_BRANDS || [];

  return (
    <section className="wwk-bs">
      <div className="wwk-bs__head">
        <div className="ww-stamp wwk-bs__eyebrow">{eyebrow}</div>
        <h2 className="wwk-bs__title" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div className="wwk-bs__grid">
        {brands.map((b, i) => (
          <BrandLogo key={i} brand={b} />
        ))}
      </div>
    </section>
  );
}
window.BrandStrip = BrandStrip;
