function Footer({ onNav }) {
  const year = new Date().getFullYear();

  return (
    <footer className="wwk-footer">
      <div className="wwk-footer__inner">
        <div className="wwk-footer__brand">
          <div
            className="wwk-footer__logo"
            role="img"
            aria-label="WagsWorks logomark"
          />
        </div>

        <nav className="wwk-footer__nav" aria-label="Footer navigation">
          <div className="wwk-footer__col">
            <div className="ww-stamp wwk-footer__col-head">Company</div>
            {[
              ["About",       "about"],
              ["Team",        "team"],
              ["Contact",     "contact"],
            ].map(([label, page]) => (
              <button key={page} className="wwk-footer__link"
                      onClick={() => onNav?.(page)}>
                {label}
              </button>
            ))}
          </div>
          <div className="wwk-footer__col">
            <div className="ww-stamp wwk-footer__col-head">Work</div>
            {[
              ["Sponsorship",   "sponsorship"],
              ["Clients",       "clients"],
              ["Calendar",      "calendar"],
            ].map(([label, page]) => (
              <button key={page} className="wwk-footer__link"
                      onClick={() => onNav?.(page)}>
                {label}
              </button>
            ))}
          </div>
          <div className="wwk-footer__col">
            <div className="ww-stamp wwk-footer__col-head">Connect</div>
            <a className="wwk-footer__link" href="mailto:scott@wagsworks.com">
              scott@wagsworks.com
            </a>
            <a className="wwk-footer__link" href="https://instagram.com/wagsworks"
               target="_blank" rel="noreferrer noopener">
              Instagram ↗
            </a>
            <a className="wwk-footer__link"
               href="assets/WagsWorks-2026-Sponsorship-Deck.pdf"
               download="WagsWorks-2026-Sponsorship-Deck.pdf"
               target="_blank">
              Sponsorship Deck ↓
            </a>
          </div>
        </nav>
      </div>

      <div className="wwk-footer__bar">
        <span>© {year} WagsWorks. Portland, OR.</span>
        <span className="wwk-footer__bar-right ww-stamp">
          PNW &amp; Beyond ★ Est. 2016
        </span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
