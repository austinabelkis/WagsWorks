function SponsorshipBlock({ eyebrow, title, body, bullets, onPrimary, onSecondary }) {
  return (
    <section className="wwk-spons">
      <div className="wwk-spons__head">
        <div className="ww-stamp wwk-spons__eyebrow">{eyebrow}</div>
        <h2 className="wwk-spons__title" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div className="wwk-spons__body">
        <p className="wwk-spons__lede">{body}</p>
        <ul className="wwk-spons__list">
          {bullets.map((b, i) => (
            <li key={i}>
              <span className="wwk-spons__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="wwk-spons__btitle">{b.title}</div>
                <div className="wwk-spons__btext">{b.text}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="wwk-spons__cta">
          <Button variant="primary" icon="→" onClick={onPrimary}>Reach out</Button>
          <Button variant="secondary" icon="↗" onClick={onSecondary}>Sponsorship deck (PDF)</Button>
        </div>
      </div>
    </section>
  );
}
window.SponsorshipBlock = SponsorshipBlock;
