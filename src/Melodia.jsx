import { useState, useEffect, useRef } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_SONGS = [
  { id: "1", title: "Midnight Rain", artist: "Taylor Swift", album: "Midnights", albumArt: "https://picsum.photos/seed/song1/300/300", moodTags: ["melancholic", "dreamy", "rainy"], genre: "pop", popularity: 92 },
  { id: "2", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", albumArt: "https://picsum.photos/seed/song2/300/300", moodTags: ["energetic", "nostalgic", "night"], genre: "synth-pop", popularity: 98 },
  { id: "3", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", albumArt: "https://picsum.photos/seed/song3/300/300", moodTags: ["happy", "upbeat", "dance"], genre: "pop", popularity: 95 },
  { id: "4", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", albumArt: "https://picsum.photos/seed/song4/300/300", moodTags: ["dreamy", "sad", "summer"], genre: "indie", popularity: 89 },
  { id: "5", title: "As It Was", artist: "Harry Styles", album: "Harry's House", albumArt: "https://picsum.photos/seed/song5/300/300", moodTags: ["melancholic", "reflective", "pop"], genre: "pop", popularity: 97 },
  { id: "6", title: "Cruel Summer", artist: "Taylor Swift", album: "Lover", albumArt: "https://picsum.photos/seed/song6/300/300", moodTags: ["energetic", "summer", "love"], genre: "pop", popularity: 96 },
  { id: "7", title: "Starboy", artist: "The Weeknd", album: "Starboy", albumArt: "https://picsum.photos/seed/song7/300/300", moodTags: ["dark", "night", "confident"], genre: "r&b", popularity: 93 },
  { id: "8", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", albumArt: "https://picsum.photos/seed/song8/300/300", moodTags: ["happy", "summer", "fun"], genre: "pop", popularity: 91 },
  { id: "9", title: "drivers license", artist: "Olivia Rodrigo", album: "SOUR", albumArt: "https://picsum.photos/seed/song9/300/300", moodTags: ["sad", "heartbreak", "cry"], genre: "pop", popularity: 94 },
  { id: "10", title: "Peaches", artist: "Justin Bieber", album: "Justice", albumArt: "https://picsum.photos/seed/song10/300/300", moodTags: ["chill", "happy", "summer"], genre: "r&b", popularity: 88 },
  { id: "11", title: "good 4 u", artist: "Olivia Rodrigo", album: "SOUR", albumArt: "https://picsum.photos/seed/song11/300/300", moodTags: ["angry", "energetic", "breakup"], genre: "pop-punk", popularity: 93 },
  { id: "12", title: "Stay", artist: "The Kid LAROI", album: "F*CK LOVE 3", albumArt: "https://picsum.photos/seed/song12/300/300", moodTags: ["sad", "love", "longing"], genre: "pop", popularity: 95 },
];

const MOCK_TICKETS = [
  { id: "TKT-001", name: "Alex Morrison", email: "alex@example.com", category: "Bug Report", message: "The music player stops after 30 seconds on iOS Safari.", status: "Open", createdAt: "2025-04-18", adminReply: "" },
  { id: "TKT-002", name: "Sarah Chen", email: "sarah@example.com", category: "Song Issue", message: "Album art is not loading for several jazz recommendations.", status: "In Progress", createdAt: "2025-04-19", adminReply: "We're investigating the CDN issue." },
  { id: "TKT-003", name: "Marcus Webb", email: "marcus@example.com", category: "Account Problem", message: "Can't update my profile picture — keeps giving a 500 error.", status: "Resolved", createdAt: "2025-04-17", adminReply: "Fixed! Please try again with a JPEG under 2MB." },
  { id: "TKT-004", name: "Priya Nair", email: "priya@example.com", category: "Billing", message: "Was charged twice for my premium subscription this month.", status: "Open", createdAt: "2025-04-20", adminReply: "" },
  { id: "TKT-005", name: "Jordan Lee", email: "jordan@example.com", category: "General", message: "Would love a dark/light mode toggle. The dark mode is great but sometimes I want lighter UI.", status: "Open", createdAt: "2025-04-21", adminReply: "" },
];

const MOCK_USERS = [
  { id: "u1", name: "Alex Morrison", email: "alex@example.com", avatar: "https://picsum.photos/seed/u1/60/60", savedPlaylists: 3, status: "Active", joinedAt: "2025-01-12" },
  { id: "u2", name: "Sarah Chen", email: "sarah@example.com", avatar: "https://picsum.photos/seed/u2/60/60", savedPlaylists: 7, status: "Active", joinedAt: "2025-02-03" },
  { id: "u3", name: "Marcus Webb", email: "marcus@example.com", avatar: "https://picsum.photos/seed/u3/60/60", savedPlaylists: 1, status: "Banned", joinedAt: "2025-03-18" },
  { id: "u4", name: "Priya Nair", email: "priya@example.com", avatar: "https://picsum.photos/seed/u4/60/60", savedPlaylists: 5, status: "Active", joinedAt: "2025-01-28" },
  { id: "u5", name: "Jordan Lee", email: "jordan@example.com", avatar: "https://picsum.photos/seed/u5/60/60", savedPlaylists: 2, status: "Active", joinedAt: "2025-04-01" },
];

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #080810;
      --bg2: #0e0e1a;
      --bg3: #141424;
      --violet: #b44dff;
      --violet-dim: rgba(180,77,255,0.15);
      --violet-glow: rgba(180,77,255,0.35);
      --gold: #f5c842;
      --gold-dim: rgba(245,200,66,0.15);
      --card: rgba(255,255,255,0.04);
      --border: rgba(255,255,255,0.08);
      --border-glow: rgba(180,77,255,0.4);
      --text: #e8e8f0;
      --text-muted: rgba(232,232,240,0.5);
      --font-head: 'Cormorant Garamond', Georgia, serif;
      --font-body: 'DM Sans', system-ui, sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--violet-dim); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--violet); }

    .glass {
      background: var(--card);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--border);
      border-radius: 16px;
    }

    .glass-hover {
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }
    .glass-hover:hover {
      border-color: var(--border-glow);
      box-shadow: 0 0 24px var(--violet-glow), 0 8px 32px rgba(0,0,0,0.4);
      transform: translateY(-2px);
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--violet), #8833cc);
      color: white;
      border: none;
      padding: 12px 28px;
      border-radius: 50px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      letter-spacing: 0.5px;
      position: relative;
      overflow: hidden;
    }
    .btn-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0);
      transition: background 0.2s;
      border-radius: inherit;
    }
    .btn-primary:hover::after { background: rgba(255,255,255,0.08); }
    .btn-primary:hover { box-shadow: 0 0 20px var(--violet-glow); transform: scale(1.02); }
    .btn-primary:active { transform: scale(0.98); }

    .btn-ghost {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
      padding: 10px 24px;
      border-radius: 50px;
      font-family: var(--font-body);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-ghost:hover { border-color: var(--violet); color: var(--violet); }

    .btn-gold {
      background: linear-gradient(135deg, var(--gold), #d4a820);
      color: #080810;
      border: none;
      padding: 12px 28px;
      border-radius: 50px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-gold:hover { box-shadow: 0 0 20px rgba(245,200,66,0.4); transform: scale(1.02); }

    .heading {
      font-family: var(--font-head);
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .tag {
      background: var(--violet-dim);
      color: var(--violet);
      border: 1px solid rgba(180,77,255,0.2);
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .tag-gold {
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(245,200,66,0.2);
    }

    input, textarea, select {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border);
      border-radius: 10px;
      color: var(--text);
      font-family: var(--font-body);
      padding: 12px 16px;
      width: 100%;
      font-size: 14px;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }
    input:focus, textarea:focus, select:focus {
      border-color: var(--violet);
      box-shadow: 0 0 0 3px var(--violet-dim);
    }
    input::placeholder, textarea::placeholder { color: var(--text-muted); }
    select option { background: var(--bg2); }

    label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-muted);
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 8px var(--violet-glow); }
      50% { box-shadow: 0 0 24px var(--violet-glow), 0 0 40px rgba(180,77,255,0.2); }
    }
    @keyframes waveBar {
      0%, 100% { transform: scaleY(0.3); }
      50% { transform: scaleY(1); }
    }
    @keyframes orbit {
      from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
      to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .fade-in { animation: fadeUp 0.5s ease forwards; }

    .status-open { color: #ff6b6b; background: rgba(255,107,107,0.1); border: 1px solid rgba(255,107,107,0.2); }
    .status-progress { color: var(--gold); background: var(--gold-dim); border: 1px solid rgba(245,200,66,0.2); }
    .status-resolved { color: #4ade80; background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.2); }

    .noise-bg::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.4;
    }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .full-mobile { width: 100% !important; }
    }
  `}</style>
);

// ─── WAVEFORM VISUALIZER ──────────────────────────────────────────────────────
const WaveVisualizer = ({ playing = true, bars = 32, height = 48 }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} style={{
          width: 3,
          height: "100%",
          background: `linear-gradient(to top, #b44dff, #f5c842)`,
          borderRadius: 2,
          transformOrigin: "bottom",
          animation: playing ? `waveBar ${0.6 + (i % 7) * 0.12}s ease-in-out ${(i * 0.04) % 0.6}s infinite` : "none",
          transform: playing ? "none" : "scaleY(0.3)",
          opacity: 0.7 + (i % 3) * 0.1,
        }} />
      ))}
    </div>
  );
};

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav = ({ page, setPage, user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = user
    ? [
        { label: "Discover", key: "dashboard" },
        { label: "Playlist", key: "playlist" },
        { label: "Support", key: "support" },
        ...(user.isAdmin ? [{ label: "Admin", key: "admin" }] : []),
      ]
    : [{ label: "Support", key: "support" }];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(8,8,16,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "0 32px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #b44dff, #f5c842)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 12px rgba(180,77,255,0.5)",
        }}>
          <span style={{ fontSize: 14 }}>♪</span>
        </div>
        <span className="heading" style={{ fontSize: 22, color: "#e8e8f0", letterSpacing: "-0.5px" }}>
          Melod<span style={{ color: "#b44dff" }}>ia</span>
        </span>
      </button>

      {/* Desktop Links */}
      <div className="hide-mobile" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {links.map(l => (
          <button key={l.key} onClick={() => setPage(l.key)} style={{
            background: page === l.key ? "rgba(180,77,255,0.12)" : "none",
            border: page === l.key ? "1px solid rgba(180,77,255,0.25)" : "1px solid transparent",
            color: page === l.key ? "#b44dff" : "rgba(232,232,240,0.7)",
            padding: "7px 18px", borderRadius: 50, cursor: "pointer",
            font: "500 14px 'DM Sans'", transition: "all 0.2s",
          }}>{l.label}</button>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setPage("profile")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <img src={`https://picsum.photos/seed/${user.name}/40/40`} alt="" style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid #b44dff", objectFit: "cover" }} />
              <span className="hide-mobile" style={{ fontSize: 14, color: "rgba(232,232,240,0.8)" }}>{user.name.split(" ")[0]}</span>
            </button>
            <button className="btn-ghost" style={{ padding: "7px 18px", fontSize: 13 }} onClick={() => { setUser(null); setPage("home"); }}>Sign out</button>
          </div>
        ) : (
          <button className="btn-primary" style={{ padding: "9px 22px" }} onClick={() => setPage("auth")}>Sign in</button>
        )}
      </div>
    </nav>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  const [activeWave, setActiveWave] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setActiveWave(v => v), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 24px 60px",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Ambient blobs */}
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,77,255,0.12) 0%, transparent 70%)",
          top: "10%", left: "50%", transform: "translateX(-50%)",
          pointerEvents: "none", filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)",
          bottom: "20%", right: "10%",
          pointerEvents: "none", filter: "blur(60px)",
        }} />

        {/* Waveform */}
        <div style={{ marginBottom: 40, animation: "float 3s ease-in-out infinite" }}>
          <WaveVisualizer playing={true} bars={48} height={64} />
        </div>

        {/* Badge */}
        <div className="tag" style={{ marginBottom: 24, fontSize: 12, padding: "6px 16px" }}>
          ✦ AI-Powered Music Discovery
        </div>

        <h1 className="heading" style={{ fontSize: "clamp(52px, 8vw, 96px)", lineHeight: 1.05, marginBottom: 24, maxWidth: 800 }}>
          Music that feels<br />
          <span style={{ color: "#b44dff", fontStyle: "italic" }}>exactly</span> like you
        </h1>

        <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.7, marginBottom: 48 }}>
          Melodia reads your mood, the time, the weather — and builds a soundtrack. Not algorithms. <em>Intuition.</em>
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" style={{ fontSize: 16, padding: "14px 36px" }} onClick={() => setPage("auth")}>
            Start Listening Free
          </button>
          <button className="btn-ghost" style={{ fontSize: 16, padding: "14px 36px" }} onClick={() => setPage("dashboard")}>
            Explore Recommendations
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap", justifyContent: "center" }}>
          {[["2.4M+", "Songs curated"], ["98K+", "Active listeners"], ["4.9★", "User rating"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="heading" style={{ fontSize: 32, color: "#b44dff" }}>{val}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag tag-gold" style={{ marginBottom: 16, display: "inline-block" }}>How it works</div>
          <h2 className="heading" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Your mood. Your music.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            { icon: "🎭", title: "Tell us your vibe", desc: "Select mood, genre, activity. Be as specific or abstract as you want — Melodia understands context.", accent: "#b44dff" },
            { icon: "⚡", title: "AI does the thinking", desc: "Our engine cross-references 2.4M songs against your mood profile, listening history, and real-time trends.", accent: "#f5c842" },
            { icon: "🎧", title: "Immerse yourself", desc: "Get 10–15 perfectly curated tracks. Preview, save, rate — the more you interact, the better it gets.", accent: "#b44dff" },
          ].map(f => (
            <div key={f.title} className="glass glass-hover" style={{ padding: 32 }}>
              <div style={{ fontSize: 40, marginBottom: 20 }}>{f.icon}</div>
              <h3 className="heading" style={{ fontSize: 24, marginBottom: 12, color: f.accent }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
const AuthPage = ({ setUser, setPage }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 900));
    if (!form.email || !form.password) { setError("Please fill all fields."); setLoading(false); return; }
    const isAdmin = form.email.includes("admin");
    setUser({ name: form.name || form.email.split("@")[0], email: form.email, isAdmin });
    setPage("dashboard");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,77,255,0.1) 0%, transparent 70%)", top: "20%", left: "50%", transform: "translateX(-50%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="glass" style={{ width: "100%", maxWidth: 420, padding: 40, animation: "fadeUp 0.4s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>♪</div>
          <h2 className="heading" style={{ fontSize: 36 }}>
            {mode === "login" ? "Welcome back" : "Join Melodia"}
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
            {mode === "login" ? "Sign in to your account" : "Create your free account"}
          </p>
        </div>

        <form onSubmit={handle}>
          {mode === "register" && (
            <div className="form-group">
              <label>Full Name</label>
              <input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>

          {error && <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 16 }}>{error}</p>}

          <button className="btn-primary" type="submit" style={{ width: "100%", marginBottom: 16, padding: 14 }} disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>
          {mode === "login" ? "New to Melodia? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ background: "none", border: "none", color: "#b44dff", cursor: "pointer", fontSize: 13, fontFamily: "var(--font-body)" }}>
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </p>

        <div style={{ marginTop: 20, padding: 12, background: "rgba(180,77,255,0.07)", borderRadius: 8, border: "1px solid rgba(180,77,255,0.15)" }}>
          <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>
            💡 Use <strong style={{ color: "var(--text)" }}>admin@melodia.com</strong> to access the admin panel
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── DASHBOARD (RECOMMENDATIONS) ─────────────────────────────────────────────
const DashboardPage = ({ user, savedSongs, setSavedSongs }) => {
  const [moodForm, setMoodForm] = useState({ mood: "", genre: "", activity: "" });
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [generated, setGenerated] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState("");

  const moods = ["Happy", "Sad", "Melancholic", "Energetic", "Chill", "Focused", "Romantic", "Angry", "Nostalgic"];
  const genres = ["Pop", "R&B", "Indie", "Electronic", "Jazz", "Hip-Hop", "Classical", "Rock", "Lo-fi"];
  const activities = ["Study", "Workout", "Sleep", "Commute", "Party", "Meditation", "Cooking", "Running"];

  const generateRecs = async () => {
    setLoading(true);
    setAiInsight("");
    await new Promise(r => setTimeout(r, 1200));

    // Filter songs by mood/genre
    let filtered = MOCK_SONGS.filter(s => {
      const moodMatch = !moodForm.mood || s.moodTags.some(t => t.toLowerCase().includes(moodForm.mood.toLowerCase()) || moodForm.mood.toLowerCase().includes(t));
      const genreMatch = !moodForm.genre || s.genre.toLowerCase().includes(moodForm.genre.toLowerCase());
      return moodMatch || genreMatch;
    });

    if (filtered.length < 6) filtered = MOCK_SONGS;
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 12);
    setSongs(shuffled);
    setGenerated(true);
    setLoading(false);

    // AI insight via Anthropic API
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `A music listener described their current state as: mood="${moodForm.mood || "unspecified"}", genre preference="${moodForm.genre || "any"}", activity="${moodForm.activity || "unspecified"}". Write a single evocative 2-sentence insight about their musical moment — poetic but grounded. Then in one short line, recommend one specific real song not in this list that would fit perfectly. Keep it under 80 words total.`
          }]
        })
      });
      const data = await res.json();
      setAiInsight(data.content?.[0]?.text || "");
    } catch (_) {
      setAiInsight("Your playlist has been curated with care — each track chosen to match the texture of this exact moment.");
    }
    setAiLoading(false);
  };

  const toggleSave = (song) => {
    setSavedSongs(prev =>
      prev.find(s => s.id === song.id) ? prev.filter(s => s.id !== song.id) : [...prev, song]
    );
  };

  const isSaved = (id) => savedSongs.find(s => s.id === id);

  return (
    <div style={{ padding: "88px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <div className="tag" style={{ marginBottom: 12, display: "inline-block" }}>✦ AI Recommendations</div>
        <h1 className="heading" style={{ fontSize: "clamp(32px, 5vw, 56px)", marginBottom: 8 }}>
          What's your <span style={{ color: "#b44dff", fontStyle: "italic" }}>mood</span>?
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16 }}>Tell us how you feel and we'll find the perfect soundtrack.</p>
      </div>

      {/* Mood Form */}
      <div className="glass" style={{ padding: 28, marginBottom: 36 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
          <div>
            <label>Mood</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {moods.map(m => (
                <button key={m} onClick={() => setMoodForm({ ...moodForm, mood: m })} style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                  background: moodForm.mood === m ? "rgba(180,77,255,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${moodForm.mood === m ? "#b44dff" : "rgba(255,255,255,0.08)"}`,
                  color: moodForm.mood === m ? "#b44dff" : "var(--text-muted)",
                  transition: "all 0.2s",
                }}>{m}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div>
            <label>Genre</label>
            <select value={moodForm.genre} onChange={e => setMoodForm({ ...moodForm, genre: e.target.value })}>
              <option value="">Any genre</option>
              {genres.map(g => <option key={g} value={g.toLowerCase()}>{g}</option>)}
            </select>
          </div>
          <div>
            <label>Activity</label>
            <select value={moodForm.activity} onChange={e => setMoodForm({ ...moodForm, activity: e.target.value })}>
              <option value="">Any activity</option>
              {activities.map(a => <option key={a} value={a.toLowerCase()}>{a}</option>)}
            </select>
          </div>
        </div>

        <button className="btn-primary" onClick={generateRecs} disabled={loading} style={{ fontSize: 15, padding: "13px 36px" }}>
          {loading ? "Curating your playlist…" : "✦ Generate Recommendations"}
        </button>
      </div>

      {/* AI Insight */}
      {(aiLoading || aiInsight) && (
        <div className="glass" style={{ padding: 24, marginBottom: 28, borderColor: "rgba(180,77,255,0.2)", animation: "fadeUp 0.4s ease" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 24, lineHeight: 1 }}>✦</div>
            <div>
              <div style={{ fontSize: 11, color: "#b44dff", letterSpacing: 1, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Melodia Insight</div>
              {aiLoading ? (
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#b44dff", animation: `pulse-glow 1s ${i * 0.2}s infinite` }} />)}
                  <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 8 }}>Analyzing your mood…</span>
                </div>
              ) : (
                <p style={{ fontSize: 15, lineHeight: 1.7, fontStyle: "italic", color: "rgba(232,232,240,0.85)" }}>{aiInsight}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Song Cards */}
      {generated && (
        <div style={{ animation: "fadeUp 0.5s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 className="heading" style={{ fontSize: 24 }}>Your playlist — {songs.length} tracks</h2>
            <WaveVisualizer bars={16} height={24} playing={!!playingId} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {songs.map((song, idx) => (
              <div key={song.id} className="glass glass-hover" style={{ padding: 0, overflow: "hidden", animationDelay: `${idx * 0.05}s`, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
                <div style={{ position: "relative" }}>
                  <img src={song.albumArt} alt={song.title} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 50%)" }} />
                  <button
                    onClick={() => setPlayingId(playingId === song.id ? null : song.id)}
                    style={{
                      position: "absolute", bottom: 12, right: 12,
                      width: 40, height: 40, borderRadius: "50%",
                      background: playingId === song.id ? "#b44dff" : "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "none", cursor: "pointer", fontSize: 16,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                      boxShadow: playingId === song.id ? "0 0 16px rgba(180,77,255,0.6)" : "none",
                    }}
                  >
                    {playingId === song.id ? "⏸" : "▶"}
                  </button>
                </div>

                <div style={{ padding: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{song.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>{song.artist}</div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                    {song.moodTags.slice(0, 2).map(t => <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>)}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setFeedback(f => ({ ...f, [song.id]: "like" }))} style={{
                        background: feedback[song.id] === "like" ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${feedback[song.id] === "like" ? "#4ade80" : "rgba(255,255,255,0.1)"}`,
                        color: feedback[song.id] === "like" ? "#4ade80" : "var(--text-muted)",
                        padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontSize: 13, transition: "all 0.2s",
                      }}>👍</button>
                      <button onClick={() => setFeedback(f => ({ ...f, [song.id]: "dislike" }))} style={{
                        background: feedback[song.id] === "dislike" ? "rgba(255,107,107,0.2)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${feedback[song.id] === "dislike" ? "#ff6b6b" : "rgba(255,255,255,0.1)"}`,
                        color: feedback[song.id] === "dislike" ? "#ff6b6b" : "var(--text-muted)",
                        padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontSize: 13, transition: "all 0.2s",
                      }}>👎</button>
                    </div>
                    <button onClick={() => toggleSave(song)} style={{
                      background: "none", border: "none", cursor: "pointer", fontSize: 20,
                      color: isSaved(song.id) ? "#f5c842" : "rgba(255,255,255,0.3)",
                      transition: "all 0.2s",
                    }}>
                      {isSaved(song.id) ? "★" : "☆"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── PLAYLIST PAGE ────────────────────────────────────────────────────────────
const PlaylistPage = ({ savedSongs, setSavedSongs }) => {
  const [playingId, setPlayingId] = useState(null);

  if (savedSongs.length === 0) return (
    <div style={{ padding: "88px 24px", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🎵</div>
      <h2 className="heading" style={{ fontSize: 36, marginBottom: 12 }}>Your playlist is empty</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Save songs from your recommendations to build your collection.</p>
    </div>
  );

  return (
    <div style={{ padding: "88px 24px 60px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
        <div>
          <div className="tag tag-gold" style={{ marginBottom: 10, display: "inline-block" }}>★ Saved</div>
          <h1 className="heading" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>My Playlist</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 6 }}>{savedSongs.length} tracks saved</p>
        </div>
        {playingId && <WaveVisualizer bars={20} height={32} playing />}
      </div>

      <div className="glass" style={{ overflow: "hidden" }}>
        {savedSongs.map((song, i) => (
          <div key={song.id} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "14px 20px",
            borderBottom: i < savedSongs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: 13, color: "var(--text-muted)", width: 24, textAlign: "center" }}>{i + 1}</span>
            <img src={song.albumArt} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{song.title}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{song.artist}</div>
            </div>
            <div className="hide-mobile" style={{ display: "flex", gap: 6 }}>
              {song.moodTags.slice(0, 2).map(t => <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>)}
            </div>
            <button onClick={() => setPlayingId(playingId === song.id ? null : song.id)} style={{
              width: 36, height: 36, borderRadius: "50%",
              background: playingId === song.id ? "rgba(180,77,255,0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${playingId === song.id ? "#b44dff" : "rgba(255,255,255,0.1)"}`,
              cursor: "pointer", fontSize: 14, color: playingId === song.id ? "#b44dff" : "var(--text)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {playingId === song.id ? "⏸" : "▶"}
            </button>
            <button onClick={() => setSavedSongs(prev => prev.filter(s => s.id !== song.id))} style={{
              background: "none", border: "none", cursor: "pointer", color: "rgba(255,107,107,0.5)",
              fontSize: 18, padding: 4, transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#ff6b6b"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,107,107,0.5)"}
            >✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PROFILE PAGE ────────────────────────────────────────────────────────────
const ProfilePage = ({ user, savedSongs }) => {
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: "88px 24px 60px", maxWidth: 800, margin: "0 auto" }}>
      <div className="tag" style={{ marginBottom: 16, display: "inline-block" }}>👤 Account</div>
      <h1 className="heading" style={{ fontSize: 48, marginBottom: 36 }}>Your Profile</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        {/* Avatar */}
        <div className="glass" style={{ padding: 24, textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
            <img src={`https://picsum.photos/seed/${user?.name || "user"}/120/120`} alt="" style={{
              width: 100, height: 100, borderRadius: "50%", objectFit: "cover",
              border: "3px solid #b44dff", boxShadow: "0 0 20px rgba(180,77,255,0.4)",
            }} />
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 28, height: 28, borderRadius: "50%",
              background: "#b44dff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 12, border: "2px solid var(--bg)",
            }}>✎</div>
          </div>
          <div className="heading" style={{ fontSize: 18, marginBottom: 4 }}>{user?.name}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>{user?.email}</div>
          {user?.isAdmin && <span className="tag tag-gold">Admin</span>}

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[["Songs saved", savedSongs.length], ["Playlists", "1"], ["Days active", "12"]].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#b44dff" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="glass" style={{ padding: 28 }}>
          <h3 className="heading" style={{ fontSize: 22, marginBottom: 24 }}>Edit Profile</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Display Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Leave blank to keep current" />
            </div>

            <button className="btn-primary" type="submit" style={{ marginTop: 8 }}>
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ─── SUPPORT PAGE ─────────────────────────────────────────────────────────────
const SupportPage = ({ user }) => {
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", category: "", message: "" });
  const [submitted, setSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const categories = ["Bug Report", "Song Issue", "Account Problem", "Billing", "General"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const ticketId = `TKT-${Math.floor(Math.random() * 9000 + 1000)}`;
    setSubmitted(ticketId);
    setLoading(false);

    // AI auto-response
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a friendly support agent for Melodia, a music streaming platform. A user submitted this ${form.category} ticket: "${form.message}". Write a brief, warm, helpful auto-response (2-3 sentences) acknowledging their issue and giving them a first helpful step or timeline. Be genuine and not robotic.`
          }]
        })
      });
      const data = await res.json();
      setAiResponse(data.content?.[0]?.text || "");
    } catch (_) {
      setAiResponse("Thanks for reaching out! Our team has received your ticket and will review it within 24 hours. We'll send you an update at " + form.email + ".");
    }
    setAiLoading(false);
  };

  if (submitted) return (
    <div style={{ padding: "88px 24px 60px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>✉️</div>
      <h2 className="heading" style={{ fontSize: 40, marginBottom: 12 }}>Ticket submitted!</h2>
      <div className="tag tag-gold" style={{ fontSize: 14, padding: "8px 20px", display: "inline-block", marginBottom: 20 }}>{submitted}</div>
      <p style={{ color: "var(--text-muted)", marginBottom: 32, lineHeight: 1.7 }}>
        We've sent a confirmation to <strong style={{ color: "var(--text)" }}>{form.email}</strong>. Our team will respond within 24 hours.
      </p>

      {(aiLoading || aiResponse) && (
        <div className="glass" style={{ padding: 24, textAlign: "left", marginBottom: 28, borderColor: "rgba(180,77,255,0.2)" }}>
          <div style={{ fontSize: 11, color: "#b44dff", letterSpacing: 1, fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>✦ Melodia AI — Initial Response</div>
          {aiLoading ? (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#b44dff", animation: `pulse-glow 1s ${i * 0.2}s infinite` }} />)}
              <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 8 }}>Generating response…</span>
            </div>
          ) : (
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(232,232,240,0.9)" }}>{aiResponse}</p>
          )}
        </div>
      )}

      <button className="btn-ghost" onClick={() => { setSubmitted(null); setForm({ name: "", email: "", category: "", message: "" }); setAiResponse(""); }}>
        Submit another ticket
      </button>
    </div>
  );

  return (
    <div style={{ padding: "88px 24px 60px", maxWidth: 700, margin: "0 auto" }}>
      <div className="tag" style={{ marginBottom: 16, display: "inline-block" }}>🎫 Support</div>
      <h1 className="heading" style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 8 }}>How can we help?</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 36 }}>We typically respond within 24 hours.</p>

      <div className="glass" style={{ padding: 32 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group">
              <label>Your Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {categories.map(c => (
                <button type="button" key={c} onClick={() => setForm({ ...form, category: c })} style={{
                  padding: "8px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                  background: form.category === c ? "rgba(180,77,255,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${form.category === c ? "#b44dff" : "rgba(255,255,255,0.08)"}`,
                  color: form.category === c ? "#b44dff" : "var(--text-muted)",
                  transition: "all 0.2s",
                }}>{c}</button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Describe your issue in detail…"
              rows={5} required
              style={{ resize: "vertical" }}
            />
          </div>

          <div className="form-group">
            <label>Screenshot (optional)</label>
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 10,
              padding: "24px", textAlign: "center", cursor: "pointer",
              transition: "border-color 0.2s",
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📎</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Drop a file or click to browse</div>
            </div>
          </div>

          <button className="btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: 14 }}>
            {loading ? "Submitting…" : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
const AdminPage = () => {
  const [tab, setTab] = useState("tickets");
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [filterStatus, setFilterStatus] = useState("All");
  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [aiGenerating, setAiGenerating] = useState(null);

  const filteredTickets = filterStatus === "All" ? tickets : tickets.filter(t => t.status === filterStatus);

  const updateStatus = (id, status) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  const sendReply = (id) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, adminReply: replyText, status: "In Progress" } : t));
    setReplyId(null); setReplyText("");
  };

  const generateAiReply = async (ticket) => {
    setAiGenerating(ticket.id);
    setReplyId(ticket.id);
    setReplyText("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a support agent for Melodia music app. Write a helpful reply to this ${ticket.category} ticket from ${ticket.name}: "${ticket.message}". Be warm, professional, solution-oriented. 2-4 sentences.`
          }]
        })
      });
      const data = await res.json();
      setReplyText(data.content?.[0]?.text || "Thank you for contacting us. We're looking into this and will follow up shortly.");
    } catch (_) {
      setReplyText("Thank you for reaching out! We're reviewing your ticket and will get back to you within 24 hours.");
    }
    setAiGenerating(null);
  };

  const statusColor = (s) => s === "Open" ? "status-open" : s === "In Progress" ? "status-progress" : "status-resolved";

  const stats = [
    { label: "Total Users", value: users.length, icon: "👤", color: "#b44dff" },
    { label: "Open Tickets", value: tickets.filter(t => t.status === "Open").length, icon: "🎫", color: "#ff6b6b" },
    { label: "Songs in DB", value: MOCK_SONGS.length, icon: "🎵", color: "#f5c842" },
    { label: "Resolved", value: tickets.filter(t => t.status === "Resolved").length, icon: "✓", color: "#4ade80" },
  ];

  return (
    <div style={{ padding: "88px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="tag tag-gold" style={{ marginBottom: 10, display: "inline-block" }}>⚡ Admin Panel</div>
          <h1 className="heading" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>Control Center</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["tickets", "users", "analytics"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "9px 20px", borderRadius: 50, fontSize: 13, cursor: "pointer", textTransform: "capitalize",
              background: tab === t ? "rgba(180,77,255,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${tab === t ? "#b44dff" : "rgba(255,255,255,0.08)"}`,
              color: tab === t ? "#b44dff" : "var(--text-muted)",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} className="glass" style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div>
              <div className="heading" style={{ fontSize: 28, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tickets Tab */}
      {tab === "tickets" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {["All", "Open", "In Progress", "Resolved"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{
                padding: "7px 18px", borderRadius: 50, fontSize: 13, cursor: "pointer",
                background: filterStatus === s ? "rgba(180,77,255,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filterStatus === s ? "#b44dff" : "rgba(255,255,255,0.08)"}`,
                color: filterStatus === s ? "#b44dff" : "var(--text-muted)",
                transition: "all 0.2s",
              }}>{s}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="glass" style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 600, color: "#b44dff", fontFamily: "monospace", fontSize: 13 }}>{ticket.id}</span>
                      <span className={`tag ${statusColor(ticket.status)}`} style={{ fontSize: 11 }}>{ticket.status}</span>
                      <span className="tag" style={{ fontSize: 11 }}>{ticket.category}</span>
                    </div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>{ticket.name} — <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{ticket.email}</span></div>
                    <p style={{ fontSize: 14, color: "rgba(232,232,240,0.75)", lineHeight: 1.6 }}>{ticket.message}</p>
                    {ticket.adminReply && (
                      <div style={{ marginTop: 10, padding: 12, background: "rgba(180,77,255,0.07)", borderRadius: 8, borderLeft: "3px solid #b44dff" }}>
                        <div style={{ fontSize: 11, color: "#b44dff", marginBottom: 4 }}>ADMIN REPLY</div>
                        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{ticket.adminReply}</p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["Open", "In Progress", "Resolved"].map(s => (
                        <button key={s} onClick={() => updateStatus(ticket.id, s)} style={{
                          padding: "5px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer",
                          background: ticket.status === s ? "rgba(180,77,255,0.2)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${ticket.status === s ? "#b44dff" : "rgba(255,255,255,0.08)"}`,
                          color: ticket.status === s ? "#b44dff" : "var(--text-muted)",
                          transition: "all 0.2s",
                        }}>{s}</button>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => generateAiReply(ticket)} style={{
                        padding: "7px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                        background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.2)", color: "#f5c842",
                        transition: "all 0.2s",
                      }}>
                        {aiGenerating === ticket.id ? "Generating…" : "✦ AI Reply"}
                      </button>
                      <button onClick={() => setReplyId(replyId === ticket.id ? null : ticket.id)} style={{
                        padding: "7px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                        background: "rgba(180,77,255,0.1)", border: "1px solid rgba(180,77,255,0.2)", color: "#b44dff",
                        transition: "all 0.2s",
                      }}>Reply</button>
                    </div>
                  </div>
                </div>

                {replyId === ticket.id && (
                  <div style={{ marginTop: 16, animation: "fadeUp 0.3s ease" }}>
                    <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                      placeholder="Type your reply…" rows={3} style={{ marginBottom: 10, resize: "vertical" }} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }} onClick={() => sendReply(ticket.id)}>Send Reply</button>
                      <button className="btn-ghost" style={{ padding: "9px 20px", fontSize: 13 }} onClick={() => { setReplyId(null); setReplyText(""); }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {tab === "users" && (
        <div className="glass" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "grid", gridTemplateColumns: "1fr 1fr 80px 80px 120px", gap: 16, fontSize: 11, color: "var(--text-muted)", letterSpacing: 1, textTransform: "uppercase" }}>
            <span>User</span><span>Email</span><span>Playlists</span><span>Status</span><span>Actions</span>
          </div>
          {users.map((u, i) => (
            <div key={u.id} style={{
              padding: "14px 20px", borderBottom: i < users.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              display: "grid", gridTemplateColumns: "1fr 1fr 80px 80px 120px", gap: 16, alignItems: "center",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <img src={u.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</span>
              </div>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{u.email}</span>
              <span style={{ fontSize: 13, textAlign: "center" }}>{u.savedPlaylists}</span>
              <span className={`tag ${u.status === "Active" ? "" : "status-open"}`} style={{ fontSize: 11, textAlign: "center" }}>{u.status}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setUsers(prev => prev.map(usr => usr.id === u.id ? { ...usr, status: usr.status === "Banned" ? "Active" : "Banned" } : usr))} style={{
                  padding: "5px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-muted)",
                }}>
                  {u.status === "Banned" ? "Unban" : "Ban"}
                </button>
                <button onClick={() => setUsers(prev => prev.filter(usr => usr.id !== u.id))} style={{
                  padding: "5px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                  background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.2)", color: "#ff6b6b",
                }}>Del</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {tab === "analytics" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          <div className="glass" style={{ padding: 24 }}>
            <h3 className="heading" style={{ fontSize: 22, marginBottom: 20 }}>Top Songs</h3>
            {MOCK_SONGS.sort((a, b) => b.popularity - a.popularity).slice(0, 6).map((s, i) => (
              <div key={s.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", width: 20 }}>#{i + 1}</span>
                <img src={s.albumArt} alt="" style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.artist}</div>
                </div>
                <div style={{ width: 80 }}>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${s.popularity}%`, background: "linear-gradient(to right, #b44dff, #f5c842)", borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, textAlign: "right" }}>{s.popularity}%</div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass" style={{ padding: 24 }}>
            <h3 className="heading" style={{ fontSize: 22, marginBottom: 20 }}>Mood Distribution</h3>
            {[["Happy", 34, "#f5c842"], ["Melancholic", 28, "#b44dff"], ["Energetic", 22, "#4ade80"], ["Chill", 16, "#60a5fa"]].map(([mood, pct, color]) => (
              <div key={mood} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13 }}>{mood}</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{pct}%</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: 24 }}>
              <h4 style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Ticket Categories</h4>
              {[["Bug Reports", 40], ["Song Issues", 25], ["Account", 20], ["Billing", 15]].map(([cat, pct]) => (
                <div key={cat} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", flex: 1 }}>{cat}</span>
                  <div style={{ flex: 2, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "rgba(180,77,255,0.7)", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", width: 30, textAlign: "right" }}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 32px", textAlign: "center" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #b44dff, #f5c842)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>♪</div>
      <span className="heading" style={{ fontSize: 18 }}>Melod<span style={{ color: "#b44dff" }}>ia</span></span>
    </div>
    <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>Music that understands you.</p>
    <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
      {["home", "dashboard", "support"].map(p => (
        <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 13, textTransform: "capitalize", fontFamily: "var(--font-body)", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#b44dff"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
        >{p}</button>
      ))}
    </div>
    <p style={{ fontSize: 12, color: "rgba(232,232,240,0.25)", marginTop: 20 }}>© 2025 Melodia. Built with ♪ and AI.</p>
  </footer>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [savedSongs, setSavedSongs] = useState([]);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "auth": return <AuthPage setUser={setUser} setPage={setPage} />;
      case "dashboard": return <DashboardPage user={user} savedSongs={savedSongs} setSavedSongs={setSavedSongs} />;
      case "playlist": return <PlaylistPage savedSongs={savedSongs} setSavedSongs={setSavedSongs} />;
      case "profile": return user ? <ProfilePage user={user} savedSongs={savedSongs} /> : <AuthPage setUser={setUser} setPage={setPage} />;
      case "support": return <SupportPage user={user} />;
      case "admin": return user?.isAdmin ? <AdminPage /> : <HomePage setPage={setPage} />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="noise-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Nav page={page} setPage={setPage} user={user} setUser={setUser} />
        <main style={{ flex: 1, zIndex: 1, position: "relative" }}>
          {renderPage()}
        </main>
        <Footer setPage={setPage} />
      </div>
    </>
  );
}
export default App;