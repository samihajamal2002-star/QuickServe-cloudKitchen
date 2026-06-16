import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// ── Constants ─────────────────────────────────────────────────────────────────
const NAVY  = "#1A2B4A";
const AMBER = "#F59E0B";
const AMBER_LIGHT = "#FFFBF0";
const AMBER_DIM   = "rgba(245,158,11,0.15)";

const ROLES = [
  { key: "customer", icon: "👤", label: "Customer", desc: "Order & track meals in real-time" },
  { key: "admin",    icon: "🛠️", label: "Admin",    desc: "Manage kitchen & analytics" },
  { key: "chef",     icon: "👨‍🍳", label: "Chef",     desc: "Handle kitchen orders via KDS" },
  { key: "rider",    icon: "🏍️", label: "Rider",    desc: "Pick up & deliver orders fast" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const btn = (extra = {}) => ({
  border: "none", cursor: "pointer", borderRadius: 8,
  fontFamily: "inherit", transition: "opacity 0.15s", ...extra,
});

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "#e5e7eb" };
  let score = 0;
  if (password.length >= 8)              score++;
  if (/[A-Z]/.test(password))           score++;
  if (/[0-9]/.test(password))           score++;
  if (/[^A-Za-z0-9]/.test(password))   score++;
  const map = [
    { label: "",         color: "#e5e7eb" },
    { label: "Weak",     color: "#ef4444" },
    { label: "Fair",     color: "#f97316" },
    { label: "Medium",   color: AMBER },
    { label: "Strong",   color: "#22c55e" },
  ];
  return { score, ...map[score] };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StepBar({ step }) {
  const steps = ["Role", "Details", "Done"];
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((s, i) => (
          <>
            <div key={s} style={{
              width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
              background: i < step ? AMBER : i === step ? NAVY : "#f3f4f6",
              color:      i < step ? NAVY  : i === step ? "#fff" : "#9ca3af",
              border: i === step ? `2px solid ${AMBER}` : "none",
            }}>
              {i < step ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div key={`line-${i}`} style={{ flex: 1, height: 2, background: i < step ? AMBER : "#e5e7eb" }} />
            )}
          </>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ fontSize: 9, color: i === step ? AMBER : "#9ca3af", fontWeight: i === step ? 700 : 400, width: 26, textAlign: "center" }}>{s}</div>
        ))}
      </div>
    </div>
  );
}

function FormGroup({ label, icon, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "var(--color-text-secondary, #6b7280)", marginBottom: 4, letterSpacing: "0.3px" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>{icon}</span>
        {children}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 10px 9px 32px",
  border: "1px solid #d1d5db", borderRadius: 7,
  fontSize: 12, outline: "none",
  fontFamily: "inherit", boxSizing: "border-box",
  background: "var(--color-background-primary, #fff)",
  color: "var(--color-text-primary, #1f2937)",
};

// ── Main RegisterPage ─────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [step, setStep]         = useState(1);   // 1 = role select, 2 = form, 3 = done
  const [role, setRole]         = useState("customer");
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", password: "", confirm: "", terms: false,
  });

  const set = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: val }));
    setError("");
  };

  const strength = getPasswordStrength(form.password);

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) return "Please enter your full name.";
    if (!/\S+@\S+\.\S+/.test(form.email))                return "Please enter a valid email.";
    if (form.phone && !/^\+?[0-9\s\-]{7,15}$/.test(form.phone)) return "Invalid phone number.";
    if (form.password.length < 8)                         return "Password must be at least 8 characters.";
    if (form.password !== form.confirm)                   return "Passwords do not match.";
    if (!form.terms)                                      return "Please accept the Terms of Service.";
    return null;
  };

  // ── Submit → POST /api/auth/register ──────────────────────────────────────
  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/auth/register", {
        name:     `${form.firstName.trim()} ${form.lastName.trim()}`,
        email:    form.email.trim(),
        phone:    form.phone.trim(),
        password: form.password,
        role,
      });

      // Save JWT token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(data.user));

      setStep(3);  // success screen
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success Screen ────────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ textAlign: "center", maxWidth: 340 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Account Created!</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }}>
              Welcome to QuickServe, <strong>{form.firstName}</strong>!<br />
              Your <strong style={{ color: AMBER }}>{role}</strong> account is ready.
            </p>
            <div style={{ background: AMBER_LIGHT, border: `1.5px dashed ${AMBER}`, borderRadius: 12, padding: "14px 20px", marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#92400e", marginBottom: 3 }}>REGISTERED AS</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>
                {ROLES.find(r => r.key === role)?.icon} {ROLES.find(r => r.key === role)?.label}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{form.email}</div>
            </div>
            <button style={btn({ background: NAVY, color: "#fff", fontSize: 14, fontWeight: 700, width: "100%", padding: 13 })}>
              Go to Dashboard →
            </button>
            <div style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
              Or <a href="#" style={{ color: AMBER, fontWeight: 600, textDecoration: "none" }}>browse the menu</a> first
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Layout ───────────────────────────────────────────────────────────
  return (
    <div style={{ width: "100%",minHeight: "100vh", margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: "hidden" }}>


      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", minHeight: 560 }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ background: NAVY, padding: "32px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>

          {/* bg circles */}
          {[{ size: 180, right: -50, bottom: -50 }, { size: 120, left: -30, top: -30 }].map((c, i) => (
            <div key={i} style={{ position: "absolute", width: c.size, height: c.size, borderRadius: "50%", background: AMBER, opacity: 0.06, right: c.right, bottom: c.bottom, left: c.left, top: c.top, pointerEvents: "none" }} />
          ))}

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: AMBER_DIM, color: AMBER, fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 20, marginBottom: 16 }}>
              🚀 Join QuickServe
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: 10 }}>
              Start your<br /><span style={{ color: AMBER }}>food journey</span><br />today
            </h2>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 20 }}>
              Create your free account and get fresh meals at your doorstep in 30 minutes.
            </p>

            {/* Role cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {ROLES.map((r) => (
                <div key={r.key} style={{
                  background: r.key === role ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${r.key === role ? AMBER : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 10, padding: "11px 9px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{r.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: r.key === role ? AMBER : "#fff", marginBottom: 2 }}>{r.label}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust signals */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative", zIndex: 1, marginTop: 20 }}>
            {[
              { icon: "🔒", text: "Your data is encrypted & secure" },
              { icon: "⚡", text: "Account ready in under 2 minutes" },
              { icon: "🎁", text: "Free delivery on your first order" },
            ].map((t) => (
              <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: AMBER_DIM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{t.icon}</div>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ padding: "28px 24px", background: "var(--color-background-primary, #fff)", overflowY: "auto" }}>
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text-primary, #1f2937)", marginBottom: 3 }}>Create your account</h3>
            <p style={{ fontSize: 11, color: "var(--color-text-secondary, #6b7280)" }}>Fill in your details to get started</p>
          </div>

          <StepBar step={step} />

          {/* Role selector */}
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-secondary, #6b7280)", marginBottom: 7, letterSpacing: "0.3px" }}>SELECT YOUR ROLE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 18 }}>
            {ROLES.map((r) => (
              <div key={r.key} onClick={() => setRole(r.key)} style={{
                border: `1px solid ${role === r.key ? AMBER : "var(--color-border-tertiary, #e5e7eb)"}`,
                borderRadius: 8, padding: "7px 4px", textAlign: "center", cursor: "pointer",
                background: role === r.key ? AMBER_LIGHT : "var(--color-background-primary, #fff)",
              }}>
                <span style={{ fontSize: 17, display: "block", marginBottom: 2 }}>{r.icon}</span>
                <span style={{ fontSize: 10, color: role === r.key ? "#B45309" : "var(--color-text-secondary, #6b7280)", fontWeight: role === r.key ? 700 : 400 }}>{r.label}</span>
              </div>
            ))}
          </div>

          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <FormGroup label="FIRST NAME" icon="👤">
              <input style={inputStyle} type="text" placeholder="Sabiha" value={form.firstName} onChange={set("firstName")} />
            </FormGroup>
            <FormGroup label="LAST NAME" icon="👤">
              <input style={inputStyle} type="text" placeholder="Jannat" value={form.lastName} onChange={set("lastName")} />
            </FormGroup>
          </div>

          {/* Email */}
          <FormGroup label="EMAIL ADDRESS" icon="✉️">
            <input style={inputStyle} type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
          </FormGroup>

          {/* Phone */}
          <FormGroup label="PHONE NUMBER" icon="📞">
            <input style={inputStyle} type="tel" placeholder="+880 17XX-XXXXXX" value={form.phone} onChange={set("phone")} />
          </FormGroup>

          {/* Password */}
          <FormGroup label="PASSWORD" icon="🔒">
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🔒</span>
              <input
                style={{ ...inputStyle, paddingRight: 36 }}
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={set("password")}
              />
              <span onClick={() => setShowPass(p => !p)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 14 }}>
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>
            {/* Strength bar */}
            {form.password && (
              <div style={{ marginTop: 6 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength.score ? strength.color : "#e5e7eb", transition: "background 0.3s" }} />
                  ))}
                </div>
                <div style={{ fontSize: 9, color: strength.color, marginTop: 3, fontWeight: 600 }}>{strength.label} password</div>
              </div>
            )}
          </FormGroup>

          {/* Confirm password */}
          <FormGroup label="CONFIRM PASSWORD" icon="🔒">
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🔒</span>
              <input
                style={{
                  ...inputStyle, paddingRight: 36,
                  borderColor: form.confirm && form.confirm !== form.password ? "#ef4444" : "d1d5db",
                }}
                type={showConf ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={set("confirm")}
              />
              <span onClick={() => setShowConf(p => !p)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 14 }}>
                {showConf ? "🙈" : "👁️"}
              </span>
            </div>
            {form.confirm && form.confirm !== form.password && (
              <div style={{ fontSize: 9, color: "#ef4444", marginTop: 3 }}>❌ Passwords do not match</div>
            )}
            {form.confirm && form.confirm === form.password && (
              <div style={{ fontSize: 9, color: "#22c55e", marginTop: 3 }}>✅ Passwords match</div>
            )}
          </FormGroup>

          {/* Terms */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
            <input type="checkbox" id="terms" checked={form.terms} onChange={set("terms")} style={{ marginTop: 2, accentColor: AMBER }} />
            <label htmlFor="terms" style={{ fontSize: 10, color: "var(--color-text-secondary, #6b7280)", lineHeight: 1.5, cursor: "pointer" }}>
              I agree to the <a href="#" style={{ color: AMBER, textDecoration: "none" }}>Terms of Service</a> and <a href="#" style={{ color: AMBER, textDecoration: "none" }}>Privacy Policy</a> of QuickServe
            </label>
          </div>

          {/* Error message */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 7, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#dc2626" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading} style={btn({
            background: loading ? "#9ca3af" : NAVY, color: "#fff",
            fontSize: 13, fontWeight: 700, width: "100%", padding: 12,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            cursor: loading ? "not-allowed" : "pointer",
          })}>
            {loading ? "Creating account..." : "Create Account 🚀"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0" }}>
            <hr style={{ flex: 1, border: "none", borderTop: "1px solid #e5e7eb" }} />
            <span style={{ fontSize: 10, color: "#9ca3af" }}>or sign up with</span>
            <hr style={{ flex: 1, border: "none", borderTop: "1px solid #e5e7eb" }} />
          </div>

          <button style={btn({ width: "100%", background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 12, color: "#374151", padding: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 14 })}>
            🌐 Continue with Google
          </button>

          <div style={{ textAlign: "center", fontSize: 11, color: "var(--color-text-secondary, #6b7280)" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: AMBER, fontWeight: 600, textDecoration: "none" }}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
