import { useState } from "react";
import axios from "axios";

// ── Constants ─────────────────────────────────────────────────────────────────
const NAVY       = "#1A2B4A";
const AMBER      = "#F59E0B";
const AMBER_LIGHT = "#FFFBF0";
const AMBER_DIM  = "rgba(245,158,11,0.15)";

const ROLES = [
  { key: "customer", icon: "👤", label: "Customer" },
  { key: "admin",    icon: "🛠️", label: "Admin"    },
  { key: "chef",     icon: "👨‍🍳", label: "Chef"     },
  { key: "rider",    icon: "🏍️", label: "Rider"    },
];

const DASHBOARD_ROUTES = {
  customer: "/menu",
  admin:    "/admin/dashboard",
  chef:     "/kitchen/display",
  rider:    "/rider/dashboard",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const btn = (extra = {}) => ({
  border: "none", cursor: "pointer", borderRadius: 8,
  fontFamily: "inherit", transition: "opacity 0.15s", ...extra,
});

const inputStyle = {
  width: "100%", padding: "9px 10px 9px 34px",
  border: "1px solid #d1d5db", borderRadius: 7,
  fontSize: 12, outline: "none", fontFamily: "inherit",
  boxSizing: "border-box",
  background: "var(--color-background-primary, #fff)",
  color: "var(--color-text-primary, #1f2937)",
};

// ── Main LoginPage ────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [role,     setRole]     = useState("customer");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState(false);

  // ── Submit → POST /api/auth/login ─────────────────────────────────────────
  const handleLogin = async () => {
    if (!email.trim() || !password)  { setError("Please enter your email and password."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address.");   return; }

    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/auth/login", {
        email: email.trim(),
        password,
        role,
      });

      // Save JWT
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(data.user));

      setSuccess(true);

      // Redirect to role-specific dashboard
      setTimeout(() => {
        window.location.href = DASHBOARD_ROUTES[role] || "/";
      }, 1200);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success flash ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 6 }}>Login Successful!</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Redirecting to your dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main layout ───────────────────────────────────────────────────────────
  return (
    <div style={{ Width:"100%", margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif",overflow: "hidden" }}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", minHeight: 520 }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ background: NAVY, padding: "36px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          {/* bg circles */}
          {[{ s: 200, r: -40, t: -40 }, { s: 120, l: -30, b: -30 }].map((c, i) => (
            <div key={i} style={{ position: "absolute", width: c.s, height: c.s, borderRadius: "50%", background: AMBER, opacity: 0.07, right: c.r, top: c.t, left: c.l, bottom: c.b, pointerEvents: "none" }} />
          ))}

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: AMBER_DIM, color: AMBER, fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 20, marginBottom: 18 }}>
              🔐 Secure Login
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 10 }}>
              Welcome back to<br /><span style={{ color: AMBER }}>QuickServe</span>
            </h2>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 26 }}>
              Your cloud kitchen dashboard awaits. Login to manage orders, track deliveries, and more.
            </p>

            {/* Features */}
            {[
              { icon: "📊", text: "Live order dashboard & KDS" },
              { icon: "📍", text: "Real-time delivery tracking" },
              { icon: "📈", text: "Sales analytics & reports" },
            ].map((f) => (
              <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: AMBER_DIM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{f.icon}</div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Recent activity card */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>Recent activity</div>
            <div style={{ background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: AMBER, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: NAVY, flexShrink: 0 }}>SJ</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Order #1042 — Smash Burger</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>2 mins ago • Samiha placed an order</div>
              </div>
              <div style={{ background: AMBER_DIM, color: AMBER, fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap" }}>👨‍🍳 Cooking</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ padding: "32px 26px", background: "var(--color-background-primary, #fff)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: 22 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text-primary, #1f2937)", marginBottom: 4 }}>Sign in to your account</h3>
            <p style={{ fontSize: 11, color: "var(--color-text-secondary, #6b7280)" }}>Choose your role and enter your credentials</p>
          </div>

          {/* Role selector */}
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-secondary, #6b7280)", marginBottom: 7, letterSpacing: "0.3px" }}>SELECT YOUR ROLE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 20 }}>
            {ROLES.map((r) => (
              <div key={r.key} onClick={() => { setRole(r.key); setError(""); }} style={{
                border: `1px solid ${role === r.key ? AMBER : "var(--color-border-tertiary, #e5e7eb)"}`,
                borderRadius: 8, padding: "8px 4px", textAlign: "center", cursor: "pointer",
                background: role === r.key ? AMBER_LIGHT : "var(--color-background-primary, #fff)",
                transition: "all 0.15s",
              }}>
                <span style={{ fontSize: 18, display: "block", marginBottom: 3 }}>{r.icon}</span>
                <span style={{ fontSize: 10, color: role === r.key ? "#B45309" : "var(--color-text-secondary, #6b7280)", fontWeight: role === r.key ? 700 : 400 }}>{r.label}</span>
              </div>
            ))}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 13 }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "var(--color-text-secondary, #6b7280)", marginBottom: 4, letterSpacing: "0.3px" }}>EMAIL ADDRESS</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>✉️</span>
              <input
                style={inputStyle}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 6 }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "var(--color-text-secondary, #6b7280)", marginBottom: 4, letterSpacing: "0.3px" }}>PASSWORD</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🔒</span>
              <input
                style={{ ...inputStyle, paddingRight: 36 }}
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <span onClick={() => setShowPass((p) => !p)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 14 }}>
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Forgot */}
          <div style={{ textAlign: "right", marginBottom: 16 }}>
            <a href="#" style={{ fontSize: 11, color: AMBER, textDecoration: "none", fontWeight: 500 }}>Forgot password?</a>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 7, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#dc2626" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleLogin} disabled={loading} style={btn({
            background: loading ? "#9ca3af" : NAVY, color: "#fff",
            fontSize: 13, fontWeight: 700, width: "100%", padding: 12,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 14,
          })}>
            {loading ? "Signing in..." : "Sign in 🔐"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <hr style={{ flex: 1, border: "none", borderTop: "1px solid #e5e7eb" }} />
            <span style={{ fontSize: 10, color: "#9ca3af" }}>or continue with</span>
            <hr style={{ flex: 1, border: "none", borderTop: "1px solid #e5e7eb" }} />
          </div>

          {/* Google */}
          <button style={btn({ width: "100%", background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 12, color: "#374151", padding: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 16 })}>
            🌐 Sign in with Google
          </button>

          {/* Register link */}
          <div style={{ textAlign: "center", fontSize: 11, color: "var(--color-text-secondary, #6b7280)" }}>
            Don't have an account?{" "}
            <a href="/register" style={{ color: AMBER, fontWeight: 600, textDecoration: "none" }}>Create one</a>
          </div>
        </div>
      </div>
    </div>
  );
}
