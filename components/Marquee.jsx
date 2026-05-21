function Marquee({ items, accent = "ink" }) {
  const list = [...items, ...items, ...items];
  return (
    <div className={"wwk-mq wwk-mq--" + accent}>
      <div className="wwk-mq__track">
        {list.map((t, i) => (
          <span className="wwk-mq__item" key={i}>
            <span>{t}</span>
            <span className="wwk-mq__sep">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
window.Marquee = Marquee;
