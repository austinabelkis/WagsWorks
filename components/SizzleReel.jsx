function SizzleReel() {
  const [playing, setPlaying] = React.useState(false);
  const VIDEO_ID = "ib3gJOaRnV4";

  return (
    <section className="wwk-sizzle">
      <div className="wwk-sizzle__head">
        <h2>See the work<span className="ww-stop">.</span></h2>
        <div className="ww-stamp" style={{ color: "var(--ww-tomato)" }}>WagsWorks</div>
      </div>

      {playing ? (
        <div className="wwk-sizzle__frame">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
            title="WagsWorks sizzle reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          className="wwk-sizzle__poster"
          onClick={() => setPlaying(true)}
          aria-label="Play WagsWorks sizzle reel"
        >
          <img
            className="wwk-sizzle__poster-img"
            src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt=""
            aria-hidden="true"
          />
          <div className="wwk-sizzle__poster-tint" />
          <div className="wwk-sizzle__poster-grain" />
          <div className="wwk-sizzle__poster-stamp">WagsWorks</div>
          <div className="wwk-sizzle__poster-cta">
            <div className="wwk-sizzle__play" aria-hidden="true">▶</div>
            <div className="wwk-sizzle__cta-text">Play reel</div>
          </div>
        </button>
      )}
    </section>
  );
}
window.SizzleReel = SizzleReel;
