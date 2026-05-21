function Header({ active = "about", onNav }) {
  const items = [
    { id: "about",       label: "About" },
    { id: "sponsorship", label: "Who We Represent" },
    { id: "calendar",    label: "Calendar" },
    { id: "clients",     label: "Brand Partners" },
    { id: "team",        label: "The Team" },
    { id: "contact",     label: "Contact" },
  ];
  return (
    <header className="wwk-hdr">
      <a className="wwk-hdr__brand" href="#" onClick={e => { e.preventDefault(); onNav?.("about"); }}>
        <img src="assets/wags-logomark.png" alt="WagsWorks" />
      </a>
      <nav className="wwk-hdr__nav">
        {items.map(it => (
          <a
            key={it.id}
            href={"#" + it.id}
            className={"wwk-hdr__link" + (active === it.id ? " is-active" : "")}
            onClick={e => { e.preventDefault(); onNav?.(it.id); }}
          >
            {it.label}
          </a>
        ))}
      </nav>
      <div className="wwk-hdr__slab" />
    </header>
  );
}
window.Header = Header;
