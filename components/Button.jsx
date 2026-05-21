function Button({ children, variant = "primary", size = "md", onClick, href, download, target, icon }) {
  const cls = `wwk-btn wwk-btn--${variant} wwk-btn--${size}`;
  const inner = (
    <span className="wwk-btn__inner">
      <span>{children}</span>
      {icon && <span className="wwk-btn__icon">{icon}</span>}
    </span>
  );
  if (href) {
    return <a className={cls} href={href} download={download} target={target} onClick={onClick}>{inner}</a>;
  }
  return <button className={cls} type="button" onClick={onClick}>{inner}</button>;
}
window.Button = Button;
