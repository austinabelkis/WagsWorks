function PullQuote({ children, attribution }) {
  return (
    <section className="wwk-pq">
      <div className="wwk-pq__bg" aria-hidden="true" />
      <blockquote className="wwk-pq__q">{children}</blockquote>
      {attribution && <div className="wwk-pq__attr ww-stamp">— {attribution}</div>}
    </section>
  );
}
window.PullQuote = PullQuote;
