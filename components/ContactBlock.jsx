function ContactBlock({ id }) {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "", email: "", company: "", message: ""
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // In production, wire this to a form backend (Formspree, Netlify, etc.)
    // For now, open mailto as a graceful fallback.
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\n\n${form.message}`
    );
    window.open(`mailto:scott@wagsworks.com?subject=Sponsorship%20Inquiry%20from%20${encodeURIComponent(form.name)}&body=${body}`);
    setSent(true);
  };

  return (
    <section className="wwk-contact" id={id}>
      <div className="wwk-contact__head">
        <div className="ww-stamp wwk-contact__eyebrow">Get in touch</div>
        <h2 className="wwk-contact__title">
          Let's make<br />
          something<span className="ww-stop">.</span>
        </h2>
        <p className="wwk-contact__sub">
          Whether you want to sponsor a festival, partner on production,
          or just learn what's possible — we'd love to hear from you.
        </p>
      </div>

      {sent ? (
        <div className="wwk-contact__thanks">
          <span className="wwk-contact__thanks-icon" aria-hidden="true">✦</span>
          <p>Your message is on its way to Scott's inbox. We'll be in touch soon.</p>
        </div>
      ) : (
        <form className="wwk-contact__form" onSubmit={submit} noValidate>
          <div className="wwk-contact__row">
            <label className="wwk-contact__field">
              <span className="wwk-contact__label ww-stamp">Name *</span>
              <input
                type="text" required
                placeholder="Your name"
                value={form.name} onChange={set("name")}
              />
            </label>
            <label className="wwk-contact__field">
              <span className="wwk-contact__label ww-stamp">Email *</span>
              <input
                type="email" required
                placeholder="you@company.com"
                value={form.email} onChange={set("email")}
              />
            </label>
          </div>
          <label className="wwk-contact__field wwk-contact__field--full">
            <span className="wwk-contact__label ww-stamp">Company / Brand</span>
            <input
              type="text"
              placeholder="Optional"
              value={form.company} onChange={set("company")}
            />
          </label>
          <label className="wwk-contact__field wwk-contact__field--full">
            <span className="wwk-contact__label ww-stamp">Message *</span>
            <textarea
              required rows={5}
              placeholder="Tell us about your brand, the events you're interested in, and any goals you have in mind…"
              value={form.message} onChange={set("message")}
            />
          </label>
          <div className="wwk-contact__actions">
            <Button variant="primary" icon="→">Send it</Button>
            <p className="wwk-contact__note">
              Or reach Scott directly at{" "}
              <a href="mailto:scott@wagsworks.com">scott@wagsworks.com</a>
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
window.ContactBlock = ContactBlock;
