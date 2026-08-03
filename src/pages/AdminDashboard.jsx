import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
 
const NAVY  = "#1A2B4A";
const AMBER = "#F59E0B";
const AMBER_DIM = "rgba(245,158,11,0.15)";


const STATUS_CONFIG = {
  Pending:   { color: "#F59E0B", bg: "#FFFBF0", dot: "#F59E0B", label: "⏳ Pending"   },
  Cooking:   { color: "#F97316", bg: "#FFF7ED", dot: "#F97316", label: "👨‍🍳 Cooking"  },
  Ready:     { color: "#22C55E", bg: "#F0FDF4", dot: "#22C55E", label: "✅ Ready"     },
  Delivered: { color: "#6B7280", bg: "#F9FAFB", dot: "#6B7280", label: "📦 Delivered" },
};

const CATEGORIES = ["Burgers", "Pizza", "Noodles", "Healthy", "Drinks"];

const btn = (extra = {}) => ({
  border: "none", cursor: "pointer", borderRadius: 8,
  fontFamily: "inherit", transition: "all 0.15s", ...extra,
});

// ─── dummy seed data (replace with real API later) ───────────────────────────
const SEED_ORDERS = [
  { _id: "o1", orderId: "#1042", customer: "Sabiha Jannat", items: ["Smash Burger x2", "Mango Shake x1"], total: 530, status: "Cooking",   time: "2 min ago"  },
  { _id: "o2", orderId: "#1043", customer: "Raihan Ahmed",  items: ["Cheese Pizza x1"],                   total: 350, status: "Pending",   time: "5 min ago"  },
  { _id: "o3", orderId: "#1044", customer: "Nusrat Jahan",  items: ["Spicy Noodles x2", "Lemon Tea x1"],  total: 430, status: "Ready",     time: "8 min ago"  },
  { _id: "o4", orderId: "#1040", customer: "Mehedi Hasan",  items: ["BBQ Pizza x1", "Caesar Salad x1"],   total: 530, status: "Delivered", time: "22 min ago" },
];

const SEED_MENU = [
  { _id: "m1", emoji: "🍔", name: "Smash Burger",      category: "Burgers", price: 220, available: true  },
  { _id: "m2", emoji: "🍗", name: "Crispy Chicken",    category: "Burgers", price: 250, available: true  },
  { _id: "m3", emoji: "🍕", name: "Cheese Pizza",      category: "Pizza",   price: 350, available: true  },
  { _id: "m4", emoji: "🍕", name: "BBQ Chicken Pizza", category: "Pizza",   price: 380, available: true  },
  { _id: "m5", emoji: "🍜", name: "Spicy Noodles",     category: "Noodles", price: 180, available: true  },
  { _id: "m6", emoji: "🍜", name: "Chicken Chow Mein", category: "Noodles", price: 200, available: false },
  { _id: "m7", emoji: "🥗", name: "Caesar Salad",      category: "Healthy", price: 150, available: true  },
  { _id: "m8", emoji: "🥤", name: "Mango Shake",       category: "Drinks",  price: 90,  available: true  },
  { _id: "m9", emoji: "🥤", name: "Lemon Iced Tea",    category: "Drinks",  price: 70,  available: true  },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ activeTab, setActiveTab }) {
  const tabs = ["Dashboard", "Orders", "Menu"];
  return (
    <nav style={{ background: NAVY, padding: "0 24px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, background: AMBER, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🍳</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Quick<span style={{ color: AMBER }}>Serve</span></div>
          <div style={{ fontSize: 9, color: AMBER, letterSpacing: "0.8px" }}>ADMIN PANEL</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={btn({
            padding: "6px 16px", fontSize: 12, fontWeight: 600,
            background: activeTab === t ? AMBER : "rgba(255,255,255,0.08)",
            color: activeTab === t ? NAVY : "rgba(255,255,255,0.7)",
          })}>{t}</button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, background: AMBER, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: NAVY }}>A</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Admin</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Kitchen Manager</div>
        </div>
      </div>
    </nav>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: NAVY }}>{value}</div>
          {sub && <div style={{ fontSize: 11, color: color || "#22c55e", marginTop: 4 }}>{sub}</div>}
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: AMBER_DIM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
      </div>
    </div>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────
function DashboardTab({ orders }) {
  const counts = Object.fromEntries(
    Object.keys(STATUS_CONFIG).map(s => [s, orders.filter(o => o.status === s).length])
  );
  const todayRevenue = Array.isArray(orders) && orders.filter(o => o.status === "Delivered").reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <StatCard icon="📋" label="Total Orders Today" value={orders.length} sub="↑ 12% from yesterday" />
        <StatCard icon="⏳" label="Pending"   value={counts.Pending}   sub={`${counts.Pending} waiting`}   color="#F59E0B" />
        <StatCard icon="👨‍🍳" label="Cooking"   value={counts.Cooking}   sub={`${counts.Cooking} in kitchen`} color="#F97316" />
        <StatCard icon="💰" label="Revenue Today" value={`৳ ${todayRevenue}`} sub="Delivered orders" color="#22c55e" />
      </div>

      {/* Live Orders */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: NAVY, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>🔴 Live Orders</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Auto-refreshes every 30s</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Order ID", "Customer", "Items", "Total", "Status", "Time"].map(h => (
                <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 600, color: "#6b7280", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const cfg = STATUS_CONFIG[order.status];
              return (
                <tr key={order._id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: NAVY }}>{order.orderId}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#374151" }}>{order.customer}</td>
                  <td style={{ padding: "12px 16px", fontSize: 11, color: "#6b7280" }}>{order.items.join(", ")}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: NAVY }}>৳ {order.total}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: cfg.bg, color: cfg.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{cfg.label}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 11, color: "#9ca3af" }}>{order.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab({ orders, onStatusChange }) {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", ...Object.keys(STATUS_CONFIG)];
  const filtered = filter === "All" ? orders : orders.filter(o => o.status === filter);

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={btn({
            padding: "6px 14px", fontSize: 12, fontWeight: filter === s ? 700 : 400,
            background: filter === s ? NAVY : "#f3f4f6",
            color: filter === s ? "#fff" : "#6b7280",
          })}>{s}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(order => {
          const cfg = STATUS_CONFIG[order.status];
          return (
            <div key={order._id} style={{ background: "#fff", border: `1.5px solid ${cfg.color}22`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{order.orderId}</span>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>•</span>
                  <span style={{ fontSize: 12, color: "#374151" }}>{order.customer}</span>
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{order.items.join(" · ")} — <strong style={{ color: NAVY }}>৳ {order.total}</strong></div>
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginRight: 12 }}>{order.time}</div>
              {/* Status update dropdown */}
              <select
                value={order.status}
                onChange={e => onStatusChange(order._id, e.target.value)}
                style={{ padding: "6px 10px", borderRadius: 7, border: `1.5px solid ${cfg.color}`, fontSize: 12, fontWeight: 600, color: cfg.color, background: cfg.bg, cursor: "pointer", outline: "none", fontFamily: "inherit" }}
              >
                {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Menu Item Form Modal ─────────────────────────────────────────────────────
function MenuModal({ item, onSave, onClose }) {
  const [form, setForm] = useState(
    item || { emoji: "🍔", name: "", category: "Burgers", price: "", available: true }
  );
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const isEdit = !!item?._id;

  const inputSt = { width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 7, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500 }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 14, padding: "28px 26px", zIndex: 600, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 20 }}>{isEdit ? "✏️ Edit Item" : "➕ Add New Item"}</div>

        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 10, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 4 }}>EMOJI</label>
            <input style={{ ...inputSt, textAlign: "center", fontSize: 22 }} value={form.emoji} onChange={set("emoji")} maxLength={2} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 4 }}>ITEM NAME</label>
            <input style={inputSt} placeholder="e.g. Smash Burger" value={form.name} onChange={set("name")} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 4 }}>CATEGORY</label>
            <select style={inputSt} value={form.category} onChange={set("category")}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 4 }}>PRICE (৳)</label>
            <input style={inputSt} type="number" placeholder="220" value={form.price} onChange={set("price")} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <input type="checkbox" id="avail" checked={form.available} onChange={set("available")} style={{ accentColor: AMBER, width: 15, height: 15 }} />
          <label htmlFor="avail" style={{ fontSize: 12, color: "#374151", cursor: "pointer" }}>Available on menu</label>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={btn({ flex: 1, padding: 10, background: "#f3f4f6", color: "#374151", fontSize: 13, fontWeight: 600 })}>Cancel</button>
          <button onClick={() => onSave(form)} style={btn({ flex: 1, padding: 10, background: NAVY, color: "#fff", fontSize: 13, fontWeight: 700 })}>
            {isEdit ? "Save Changes" : "Add Item"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Menu Tab ─────────────────────────────────────────────────────────────────
function MenuTab({ menuItems, onAdd, onEdit, onDelete, onToggle }) {
  const [modal, setModal] = useState(null); // null | "add" | item object
  const [catFilter, setCatFilter] = useState("All");

  const filtered = catFilter === "All" ? menuItems : menuItems.filter(m => m.category === catFilter);

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", ...CATEGORIES].map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={btn({
              padding: "5px 12px", fontSize: 11, fontWeight: catFilter === c ? 700 : 400,
              background: catFilter === c ? NAVY : "#f3f4f6",
              color: catFilter === c ? "#fff" : "#6b7280",
            })}>{c}</button>
          ))}
        </div>
        <button onClick={() => setModal("add")} style={btn({ background: AMBER, color: NAVY, fontSize: 13, fontWeight: 700, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 })}>
          + Add Item
        </button>
      </div>

      {/* Menu table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Item", "Category", "Price", "Available", "Actions"].map(h => (
                <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 600, color: "#6b7280", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item._id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{item.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1f2937" }}>{item.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: "#f3f4f6", color: "#374151", fontSize: 11, padding: "2px 8px", borderRadius: 6 }}>{item.category}</span>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: NAVY }}>৳ {item.price}</td>
                <td style={{ padding: "12px 16px" }}>
                  {/* Toggle switch */}
                  <div onClick={() => onToggle(item._id)} style={{ width: 40, height: 22, borderRadius: 11, background: item.available ? "#22c55e" : "#d1d5db", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: item.available ? 21 : 3, transition: "left 0.2s" }} />
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setModal(item)} style={btn({ background: AMBER_DIM, color: "#92400e", fontSize: 11, fontWeight: 600, padding: "5px 10px" })}>✏️ Edit</button>
                    <button onClick={() => onDelete(item._id)} style={btn({ background: "#fef2f2", color: "#dc2626", fontSize: 11, fontWeight: 600, padding: "5px 10px" })}>🗑 Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <MenuModal
          item={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={(formData) => {
            if (modal === "add") onAdd(formData);
            else onEdit(modal._id, formData);
            setModal(null);
          }}
        />
      )}
    </div>
  );
}

// ─── Main AdminDashboard ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [orders,    setOrders]    = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  // ── Fetch orders from backend ──────────────────────────────────────────────
  useEffect(() => {
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return; // অথবা লগইন পেজে পাঠান

    const { data } = await axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    // নিশ্চিত করুন ডেটা অ্যারে হিসেবে সেট হচ্ছে
    setOrders(Array.isArray(data) ? data : []); 
  } catch (err) {
    console.error("Orders fetch error:", err);
    setOrders([]); // এরর হলেও অন্তত খালি অ্যারে সেট করুন যাতে এরর না দেয়
  }
};
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  // ১. সংযোগ তৈরি করা
  const socket = io("http://localhost:5000"); // সার্ভারের সাথে কানেক্ট হচ্ছে

  // ২. নতুন অর্ডারের জন্য অপেক্ষা করা
  socket.on("new_order", (order) => {
    // সার্ভার থেকে নতুন অর্ডার আসলে এটি অটোমেটিক লিস্টে যোগ করবে
    setOrders(prev => [{ ...order, _id: Date.now().toString(), time: "just now", items: [] }, ...prev]);
  });

  // ৩. স্ট্যাটাস আপডেটের জন্য অপেক্ষা করা
  socket.on("order_status_update", ({ orderId, status }) => {
    // অর্ডারের স্ট্যাটাস চেঞ্জ হলে লিস্টের ওই অর্ডারটিকে আপডেট করবে
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
  });

  // ৪. সংযোগ বিচ্ছিন্ন করা (ক্লিনআপ)
  return () => socket.disconnect(); 
}, []);

  // ── Fetch menu from backend ────────────────────────────────────────────────
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get("/api/menu");
        if (data.length) setMenuItems(data);
      } catch {
        // keep seed data
      }
    };
    fetchMenu();
  }, []);

  // ── Order status update → PATCH /api/orders/:id/status ───────────────────
  const handleStatusChange = async (id, newStatus) => {
    setOrders(o => o.map(x => x._id === id ? { ...x, status: newStatus } : x));
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`/api/orders/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // ── Menu CRUD ──────────────────────────────────────────────────────────────
  const handleAddItem = async (formData) => {
    const tempItem = { ...formData, _id: `temp_${Date.now()}`, price: Number(formData.price) };
    setMenuItems(m => [...m, tempItem]);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post("/api/menu", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(m => m.map(x => x._id === tempItem._id ? data : x));
    } catch (err) {
      console.error("Add item failed:", err);
    }
  };

  const handleEditItem = async (id, formData) => {
    setMenuItems(m => m.map(x => x._id === id ? { ...x, ...formData, price: Number(formData.price) } : x));
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/menu/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Edit item failed:", err);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    setMenuItems(m => m.filter(x => x._id !== id));
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleToggleAvailability = async (id) => {
    setMenuItems(m => m.map(x => x._id === id ? { ...x, available: !x.available } : x));
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`/api/menu/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#f9fafb", paddingBottom: "20px" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Dashboard" && <DashboardTab orders={orders} />}
      {activeTab === "Orders"    && <OrdersTab orders={orders} onStatusChange={handleStatusChange} />}
      {activeTab === "Menu"      && (
        <MenuTab
          menuItems={menuItems}
          onAdd={handleAddItem}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onToggle={handleToggleAvailability}
        />
      )}
    </div>
  );
}
