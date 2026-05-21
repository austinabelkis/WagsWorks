// Scrolling carousel of brand logos. Used on the homepage.
// Logos are duplicated 3× so the loop is seamless.
// Expects WW_BRANDS from data/brands.js.
function LogoMarquee({ brands, height = 56 }) {
  const list = [...brands, ...brands, ...brands];
  return (
    <div className="wwk-lmq" style={{ "--lmq-h": height + "px" }}>
      <div className="wwk-lmq__track">
        {list.map((b, i) => {
          const localSrc  = `assets/logos/${b.logo}`;
          const href = b.domain ? `https://${b.domain}` : "#";
          return (
            <a key={i} className="wwk-lmq__item"
               href={href} target={b.domain ? "_blank" : undefined}
               rel="noreferrer noopener" title={b.name}>
              <LogoImg brand={b} localSrc={localSrc} height={height} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// Tries local PNG → CDN fallback → text name
function LogoImg({ brand, localSrc, height }) {
  const [src, setSrc] = React.useState(localSrc);
  const [failed, setFailed] = React.useState(false);

  const tryNext = () => {
    if (src === localSrc && brand.fallbackUrl) {
      setSrc(brand.fallbackUrl);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return <span className="wwk-lmq__name">{brand.name}</span>;
  }
  return (
    <img src={src} alt={brand.name} loading="lazy"
         style={{ maxHeight: height, width: "auto", objectFit: "contain" }}
         onError={tryNext} />
  );
}

window.LogoMarquee = LogoMarquee;
