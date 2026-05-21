// ─── WagsWorks 2026 · Main App ────────────────────────────────────────────────
// SPA with hash routing: #about | #sponsorship | #calendar | #clients | #team | #contact
// All components loaded via window.* from separate <script type="text/babel"> tags.

const PAGES = ["about", "sponsorship", "calendar", "clients", "team", "contact"];

// ── Marquee copy — pulled from WW_EVENTS at render time ────────────────────────
function getEventMarquee() {
  const evts = window.WW_EVENTS || [];
  return evts.map(e => e.name);
}

// ── About / Home page ───────────────────────────────────────────────────────────
function AboutPage({ onNav }) {
  const brands = (window.WW_BRANDS || []).slice(0, 20); // first 20 for marquee

  const spons = {
    eyebrow: "Why sponsor with us",
    title: "More than a logo<br>on a banner.",
    body: "WagsWorks embeds your brand inside the experience — before the first note plays and long after the encore. Here's what that looks like in practice.",
    bullets: [
      {
        title: "Exclusive venue relationships",
        text: "We hold preferred partnerships across 30+ properties — amphitheater series, music festivals, cultural events, and food festivals — giving sponsors access unavailable through standard channels.",
      },
      {
        title: "Full-funnel activation",
        text: "From digital pre-promotion to on-site sampling, merch integrations, and post-event reporting — your investment works across every touchpoint.",
      },
      {
        title: "Qualified audiences",
        text: "Our events draw 21–45 year-olds with above-average disposable income and strong brand loyalty. They're here because they care deeply about something.",
      },
      {
        title: "Transparent reporting",
        text: "Every engagement comes with an after-action report: reach, impressions, samples distributed, digital mentions, and photo documentation.",
      },
    ],
    onPrimary: () => onNav("contact"),
    onSecondary: () => window.open("assets/WagsWorks-2026-Sponsorship-Deck.pdf"),
  };

  return (
    <>
      <Hero
        eyebrow="WagsWorks · Portland, OR · Est. 2016"
        line1={{ text: "Live music sponsorship" }}
        line2={{ text: "done right" }}
        hand="Coffee is for closers."
        onCta={onNav}
      />

      <Marquee items={getEventMarquee()} accent="marigold" />

      <SizzleReel />

      <PullQuote>
        We don't sell banner space. We sell moments — the kind your customers
        remember six months later when they're choosing which brand to buy.
      </PullQuote>

      <SponsorshipBlock {...spons} />

      <Marquee items={getEventMarquee()} accent="tomato" />

      <section className="wwk-cta-band">
        <div className="ww-stamp wwk-cta-band__eyebrow">Ready to talk?</div>
        <h2 className="wwk-cta-band__title">
          Let's find the right fit<span className="ww-stop">.</span>
        </h2>
        <div className="wwk-cta-band__actions">
          <Button variant="primary" icon="→" onClick={() => onNav("contact")}>
            Reach out
          </Button>
          <Button variant="secondary" icon="→" onClick={() => onNav("sponsorship")}>
            See sponsorship options
          </Button>
        </div>
      </section>
    </>
  );
}

// ── Events / Who We Represent page ─────────────────────────────────────────────
function SponsorshipPage({ onNav }) {
  const events = window.WW_EVENTS || [];
  const [selected, setSelected] = React.useState(null);

  return (
    <section className="wwk-events-pg">
      <div className="wwk-events-pg__head">
        <div className="ww-stamp wwk-events-pg__eyebrow">What we represent</div>
        <h2 className="wwk-events-pg__title">
          {events.length} properties<span className="ww-stop">.</span><br />
          One team<span className="ww-stop">.</span>
        </h2>
        <p className="wwk-events-pg__sub">
          Festivals, amphitheater series, food events, cultural gatherings —
          we hold preferred sponsorship access across the full portfolio.
          Pick one, or build a multi-property package.
        </p>
      </div>

      <div className="wwk-events-pg__grid">
        {events.map((evt, i) => (
          <EventCard key={evt.key || i} event={evt} onClick={setSelected} />
        ))}
      </div>

      {selected && (
        <div className="wwk-events-pg__drawer" onClick={() => setSelected(null)}>
          <div className="wwk-events-pg__drawer-inner" onClick={e => e.stopPropagation()}>
            <button className="wwk-events-pg__close" onClick={() => setSelected(null)}
                    aria-label="Close">✕</button>
            <div className="ww-stamp wwk-events-pg__drawer-format">{selected.format}</div>
            <h2 className="wwk-events-pg__drawer-name">{selected.name}</h2>
            <p className="wwk-events-pg__drawer-loc">{selected.location}</p>
            {selected.description && (
              <p className="wwk-events-pg__drawer-desc">{selected.description}</p>
            )}
            {selected.stats && selected.stats.length > 0 && (
              <dl className="wwk-events-pg__drawer-stats">
                {selected.stats.map((s, i) => (
                  <div key={i}>
                    <dt>{s.lbl}</dt>
                    <dd>{s.val}</dd>
                  </div>
                ))}
              </dl>
            )}
            {selected.artists && selected.artists.length > 0 && (
              <div className="wwk-events-pg__drawer-artists">
                <div className="ww-stamp">Past artists</div>
                <p>{selected.artists.join(" · ")}</p>
              </div>
            )}
            <div className="wwk-events-pg__drawer-ctas">
              <Button variant="primary" icon="→" onClick={() => { setSelected(null); onNav("contact"); }}>
                Inquire about sponsorship
              </Button>
              {selected.url && (
                <Button variant="secondary" icon="↗" href={selected.url} target="_blank">
                  Event website
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Clients (brand wall) page ────────────────────────────────────────────────
function ClientsPage() {
  return (
    <BrandStrip
      eyebrow="Past &amp; current clients"
      title="60+ brands<br>that trust us."
    />
  );
}

// ── App shell ───────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = React.useState(() => {
    const hash = window.location.hash.replace("#", "");
    return PAGES.includes(hash) ? hash : "about";
  });
  const [mood, setMood] = React.useState("daylight");

  // keep URL hash in sync
  React.useEffect(() => {
    window.location.hash = page === "about" ? "" : page;
  }, [page]);

  // listen for back/forward
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      setPage(PAGES.includes(h) ? h : "about");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const nav = (p) => {
    if (PAGES.includes(p)) {
      setPage(p);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const moodClass = mood === "afterdark"
    ? "wwk-app wwk-mood--afterdark"
    : "wwk-app wwk-mood--daylight";

  const renderPage = () => {
    switch (page) {
      case "about":        return <AboutPage onNav={nav} />;
      case "sponsorship":  return <SponsorshipPage onNav={nav} />;
      case "calendar":     return <CalendarPage />;
      case "clients":      return <ClientsPage />;
      case "team":         return <TeamPage />;
      case "contact":      return <ContactBlock id="contact-form" />;
      default:             return <AboutPage onNav={nav} />;
    }
  };

  return (
    <div className={moodClass}>
      <Header active={page} onNav={nav} />
      <main className="wwk-main">
        {renderPage()}
      </main>
      <Footer onNav={nav} />
      <TweaksPanel mood={mood} setMood={setMood} />
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
