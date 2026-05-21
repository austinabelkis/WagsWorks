// Calendar page — Gantt chart of all 30 events + per-venue show listings.
// Data: WW_EVENTS (month ranges), WW_SHOWS (discrete show dates).

const CAL_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun",
                    "Jul","Aug","Sep","Oct","Nov","Dec"];

const BAR_COLORS = {
  marigold:   "wwk-cal__bar--marigold",
  tomato:     "wwk-cal__bar--tomato",
  pine:       "wwk-cal__bar--pine",
  bulb:       "wwk-cal__bar--bulb",
  ink:        "wwk-cal__bar--tomato",   // remap: dark-on-dark was invisible
  paper:      "wwk-cal__bar--bulb",     // remap: paper-on-paper was washed out
};

const VENUE_META = {
  "edgefield":   { label: "Edgefield Concerts",         accent: "marigold" },
  "cuthbert":    { label: "Cuthbert Amphitheater",       accent: "tomato"   },
  "grand-lodge": { label: "Grand Lodge",                 accent: "pine"     },
  "marymoor":    { label: "Marymoor Live",               accent: "bulb"     },
  "outlaw":      { label: "Outlaw Field",                accent: "marigold" },
  "pdx-live":    { label: "PDX Live",                    accent: "tomato"   },
};

// ── Gantt row for one event ──────────────────────────────────────────────────
function GanttRow({ event }) {
  const [mStart, mEnd] = event.month || [1, 1];
  const barClass = BAR_COLORS[event.posterColor] || BAR_COLORS.marigold;

  // Bar spans from start month to end month, positioned absolutely over the cells.
  // Name col = 260px; 12 equal month cols share the rest.
  const pct = (m) => `calc(260px + ${m} * (100% - 260px) / 12)`;
  const left  = `calc(${pct(mStart - 1)} + 4px)`;
  const right = `calc(100% - ${pct(mEnd)} + 4px)`;

  return (
    <div className="wwk-cal__row">
      <div className="wwk-cal__name">
        <span className="wwk-cal__name-text">{event.name}</span>
        <span className="wwk-cal__name-loc">{event.location.split(" · ")[0]}</span>
      </div>
      {CAL_MONTHS.map((_, i) => (
        <div key={i} className="wwk-cal__cell" />
      ))}
      {/* absolutely positioned bar overlaying the month cells */}
      <div
        className={`wwk-cal__bar ${barClass}`}
        style={{ position: "absolute", top: "50%", transform: "translateY(-50%)",
                 left, right, height: "22px", zIndex: 1 }}
        title={`${event.name} · ${CAL_MONTHS[(mStart||1)-1]}–${CAL_MONTHS[(mEnd||1)-1]}`}
      >
        <span className="wwk-cal__bar-label">{event.name}</span>
        {event.key && VENUE_META[event.key] && (
          <span className="wwk-cal__live-dot" />
        )}
      </div>
    </div>
  );
}

// ── Show listing for one venue ───────────────────────────────────────────────
function VenueShows({ venueKey, data }) {
  const meta = VENUE_META[venueKey];
  const accent = meta
    ? `var(--ww-${meta.accent})`
    : "var(--ww-marigold)";

  const accentClass = meta ? `wwk-cal__show-block--${meta.accent}` : "";

  return (
    <div className={`wwk-cal__show-block ${accentClass}`}>
      <div className="wwk-cal__show-head">
        <div>
          <div className="ww-stamp" style={{ color: accent }}>{data.presenter || ""}</div>
          <h3>{meta ? meta.label : data.venue}</h3>
          <div className="wwk-cal__show-sub ww-stamp">{data.window}</div>
        </div>
      </div>
      <ul className="wwk-cal__show-list">
        {(data.shows || []).map((s, i) => {
          const d = new Date(s.date + "T12:00:00");
          const lbl = `${CAL_MONTHS[d.getMonth()]} ${d.getDate()}`;
          return (
            <li key={i}>
              <span className="wwk-cal__show-date">{lbl}</span>
              <span className="wwk-cal__show-title">
                {s.title}
                {s.sub && <span className="wwk-cal__show-show-sub"> {s.sub}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Main CalendarPage ────────────────────────────────────────────────────────
function CalendarPage() {
  const events = window.WW_EVENTS || [];
  const shows  = window.WW_SHOWS  || {};
  const venueKeys = Object.keys(VENUE_META).filter(k => shows[k]);

  return (
    <section className="wwk-cal">

      {/* Page header */}
      <div className="wwk-cal__pg-head">
        <div className="ww-stamp wwk-cal__pg-eyebrow">2026 season</div>
        <h2 className="wwk-cal__pg-title">
          {events.length} properties<span className="ww-stop">.</span>
        </h2>
        <p className="wwk-cal__pg-sub">
          Every bar is a sponsorship opportunity. Click through to discuss access.
        </p>
      </div>

      {/* Gantt chart */}
      <div className="wwk-cal__gantt-wrap">
        {/* Month header */}
        <div className="wwk-cal__head">
          <div className="wwk-cal__head-name">Property</div>
          {CAL_MONTHS.map(m => (
            <div key={m} className="wwk-cal__head-month">{m}</div>
          ))}
        </div>

        {/* Event rows */}
        <div className="wwk-cal__rows">
          {events.map(evt => (
            <GanttRow key={evt.key} event={evt} />
          ))}
        </div>

        <div className="wwk-cal__legend">
          <div className="ww-stamp">About this chart</div>
          <p>Bars represent the active season window for each property.
             Discrete show dates are listed by venue below.</p>
        </div>
      </div>

      {/* Per-venue show listings */}
      <div className="wwk-cal__shows">
        <div className="wwk-cal__shows-head">
          <h3 className="wwk-cal__shows-h">
            <span className="ww-stamp">Venue calendars</span><br />
            Confirmed 2026 shows
          </h3>
        </div>
        <div className="wwk-cal__shows-list">
          {venueKeys.map(k => (
            <VenueShows key={k} venueKey={k} data={shows[k]} />
          ))}
        </div>
      </div>

    </section>
  );
}
window.CalendarPage = CalendarPage;
