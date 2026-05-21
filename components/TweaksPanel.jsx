// Dev-only panel: mood toggle (daylight / afterdark) + accent picker.
// Rendered only when ?tweaks=1 is in the URL (or localStorage.wwkTweaks = "1").

function TweaksPanel({ mood, setMood }) {
  const [open, setOpen] = React.useState(false);

  const show =
    new URLSearchParams(window.location.search).get("tweaks") === "1" ||
    localStorage.getItem("wwkTweaks") === "1";

  if (!show) return null;

  return (
    <div className={"wwk-tweaks" + (open ? " wwk-tweaks--open" : "")}>
      <button
        className="wwk-tweaks__toggle"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle tweaks panel"
      >
        ⚙
      </button>
      {open && (
        <div className="wwk-tweaks__body">
          <div className="wwk-tweaks__row">
            <span className="ww-stamp">Mood</span>
            <div className="wwk-tweaks__pills">
              {["daylight", "afterdark"].map(m => (
                <button
                  key={m}
                  className={"wwk-tweaks__pill" + (mood === m ? " wwk-tweaks__pill--on" : "")}
                  onClick={() => setMood(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
window.TweaksPanel = TweaksPanel;
