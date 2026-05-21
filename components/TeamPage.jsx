// Scott Wagner  → assets/team/scott-wagner.jpg
// Austin Abelkis → assets/team/austin-abelkis.jpg

const TEAM = [
  {
    name: "Scott Wagner",
    role: "Founder & Executive Producer",
    photo: "assets/team/austin-abelkis.jpg",
    bio: "Scott has spent 20+ years producing live events across the Pacific Northwest — from intimate theater runs to 25,000-person festivals. Before founding WagsWorks, he built deep relationships with the region's most respected promoters and venue operators, learning exactly what brands need to do to earn a place inside the experience rather than being bolted onto it. He created WagsWorks to give sponsors a smarter, more authentic path: one grounded in real venue access, genuine audience trust, and the kind of on-the-ground execution you can only get from someone who's been doing this for two decades.",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/scottwagner" },
    ],
  },
  {
    name: "Austin Abelkis",
    role: "Operations Manager",
    photo: "assets/team/scott-wagner.jpg",
    bio: "Austin bridges the gap between brand strategy and on-the-ground activation. With a background in design, marketing, and digital storytelling, he shapes how WagsWorks shows up to the world — from the sponsorship decks that open doors, to the digital presence that keeps WagsWorks top of mind year-round. He works directly with brand partners to map goals to the right properties, build multi-event packages, and make sure every activation looks and feels intentional. If Scott knows the venues, Austin knows how to make them work for a brand.",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/austinabelkis" },
    ],
  },
];

function TeamMember({ member }) {
  return (
    <div className="wwk-team__card">
      <div className="wwk-team__photo-wrap">
        <img
          src={member.photo}
          alt={member.name}
          className="wwk-team__photo"
          loading="lazy"
        />
      </div>
      <div className="wwk-team__body">
        <div className="wwk-team__role ww-stamp">{member.role}</div>
        <h3 className="wwk-team__name">{member.name}</h3>
        <p className="wwk-team__bio">{member.bio}</p>
        <div className="wwk-team__links">
          {member.links.map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noreferrer noopener"
               className="wwk-team__link ww-stamp">
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamPage() {
  return (
    <section className="wwk-team">
      <div className="wwk-team__head">
        <div className="ww-stamp wwk-team__eyebrow">The people behind it</div>
        <h2 className="wwk-team__title">
          Small team<span className="ww-stop">.</span><br />
          Big shows<span className="ww-stop">.</span>
        </h2>
        <p className="wwk-team__sub">
          WagsWorks is a lean, specialist operation — which means every client
          gets direct access to the people who actually know the venues,
          the fans, and the opportunities.
        </p>
      </div>
      <div className="wwk-team__grid">
        {TEAM.map((m, i) => <TeamMember key={i} member={m} />)}
      </div>
      <div className="wwk-team__values">
        <div className="ww-stamp wwk-team__eyebrow">What we believe</div>
        <ul className="wwk-team__value-list">
          {[
            ["Local first", "We know these markets because we live in them."],
            ["Brand as guest", "Great sponsorships feel native, not slapped on."],
            ["Measurable, always", "Every activation includes reporting your CFO will actually read."],
            ["Long-term thinking", "We'd rather build a three-year partnership than a one-off deal."],
          ].map(([h, t], i) => (
            <li key={i}>
              <span className="wwk-team__vnum">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{h}</strong>
                <p>{t}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
window.TeamPage = TeamPage;
