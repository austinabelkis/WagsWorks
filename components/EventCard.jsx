// Derive card color from event format + badges — colors mean something:
//   marigold → Amphitheater series (flagship venues)
//   pine     → Outdoor/camping festivals (green = nature)
//   bulb     → Food & harvest events (warm yellow)
//   tomato   → Urban / indoor / everything else
function deriveColor(event) {
  const fmt = (event.format || "").toLowerCase();
  const badges = [
    ...(event.badges || []),
    ...(event.badge ? [event.badge] : []),
  ];
  if (fmt.includes("amphitheater"))                             return "marigold";
  if (fmt.includes("food") || fmt.includes("harvest"))         return "bulb";
  if (badges.some(b => b === "Outdoors" || b === "Camping"))   return "pine";
  return "tomato";
}

function EventCard({ event, onClick }) {
  const colorKey = deriveColor(event);

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun",
                      "Jul","Aug","Sep","Oct","Nov","Dec"];
  const [mStart, mEnd] = event.month || [0, 0];
  const dateStr = mStart === mEnd
    ? monthNames[mStart - 1]
    : `${monthNames[mStart - 1]}–${monthNames[mEnd - 1]}`;

  const badges = event.badges || (event.badge ? [event.badge] : []);

  return (
    <article
      className={`wwk-evt wwk-evt--link wwk-evt--${colorKey}`}
      onClick={() => onClick?.(event)}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick?.(event)}
      aria-label={event.name}
    >
      {/* coloured top banner */}
      <div className="wwk-evt__banner">
        <span className="wwk-evt__format ww-stamp">{event.format}</span>
        <span className="wwk-evt__visit">→</span>
      </div>

      {/* floating badges */}
      {badges.length > 0 && (
        <div className="wwk-evt__badges">
          {badges.map((b, i) => {
            const mod = (b === "Outdoors" || b === "Camping") ? " wwk-evt__badge--pine" : "";
            return <span key={i} className={`wwk-evt__badge${mod}`}>{b}</span>;
          })}
        </div>
      )}

      <div className="wwk-evt__body">
        <div className="wwk-evt__date-row ww-stamp">{dateStr}</div>
        <h3 className="wwk-evt__name">{event.name}</h3>
        <p className="wwk-evt__loc">{event.location}</p>

        {event.description && (
          <p className="wwk-evt__desc">{event.description}</p>
        )}

        {event.stats && event.stats.length > 0 && (
          <div className="wwk-evt__stats">
            {event.stats.slice(0, 3).map((s, i) => (
              <span key={i} className="wwk-evt__stat">
                <span className="wwk-evt__stat-val">{s.val}</span>
                <span className="wwk-evt__stat-lbl">{s.lbl}</span>
              </span>
            ))}
          </div>
        )}

        {event.artists && event.artists.length > 0 && (
          <div className="wwk-evt__artists">
            <div className="wwk-evt__artists-lbl ww-stamp">Past artists</div>
            <div className="wwk-evt__artists-stack">
              {event.artists.map((a, i) => <span key={i}>{a}</span>)}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
window.EventCard = EventCard;
