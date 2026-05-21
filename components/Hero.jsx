function BulbMark({ size = 200, color = "currentColor", strokeWidth = 9, className }) {
  return (
    <svg viewBox="0 0 200 220" width={size} height={size * 1.1}
         className={className} aria-hidden="true"
         fill="none" stroke={color} strokeWidth={strokeWidth}
         strokeLinecap="round" strokeLinejoin="round">
      {/* rays */}
      <line x1="100" y1="6"   x2="100" y2="22" />
      <line x1="38"  y1="32"  x2="50"  y2="44" />
      <line x1="162" y1="32"  x2="150" y2="44" />
      <line x1="14"  y1="92"  x2="32"  y2="92" />
      <line x1="186" y1="92"  x2="168" y2="92" />
      <line x1="22"  y1="138" x2="36"  y2="132" />
      <line x1="178" y1="138" x2="164" y2="132" />
      {/* bulb outline */}
      <path d="M 100 36 C 60 36, 38 66, 38 96 C 38 122, 56 138, 76 152 C 92 164, 96 178, 100 210 C 104 178, 108 164, 124 152 C 144 138, 162 122, 162 96 C 162 66, 140 36, 100 36 Z" />
      {/* WW zigzag */}
      <polyline points="62,108 74,82 86,108 100,82 114,108 126,82 138,108" />
    </svg>
  );
}
window.BulbMark = BulbMark;

function Hero({ eyebrow, line1, line2, hand, onCta }) {
  const renderEyebrow = (text) => {
    if (typeof text !== "string") return text;
    return text.split(" · ").flatMap((p, i) =>
      i === 0
        ? [<span key={i}>{p}</span>]
        : [<span key={i + "d"} className="wwk-hero__dot">·</span>, <span key={i}>{p}</span>]
    );
  };
  return (
    <section className="wwk-hero">
      <div className="wwk-hero__inner">
        <div className="wwk-hero__eyebrow ww-stamp">{renderEyebrow(eyebrow)}</div>
        <h1 className="wwk-hero__h">
          <span>{line1.text}<span className="ww-stop">.</span></span>
          {line2 && <span>{line2.text}<span className="ww-stop">.</span></span>}
        </h1>
        {hand && <div className="wwk-hero__hand">{hand}</div>}
        <div className="wwk-hero__ctas">
          <Button variant="primary" icon="→" onClick={() => onCta?.("contact")}>Reach out</Button>
          <Button variant="ghost" icon="↓"
            href="assets/WagsWorks-2026-Sponsorship-Deck.pdf"
            download="WagsWorks-2026-Sponsorship-Deck.pdf"
            target="_blank">
            Get the deck
          </Button>
        </div>
      </div>
      <aside className="wwk-hero__aside">
        <div className="wwk-hero__poster" aria-hidden="true">
          <BulbMark size={150} strokeWidth={10} className="wwk-hero__bulb" />
          <div className="wwk-hero__poster-caption">Est. Portland, OR · PNW &amp; Beyond</div>
        </div>
      </aside>
    </section>
  );
}
window.Hero = Hero;
