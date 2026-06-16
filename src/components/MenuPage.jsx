import { useState } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const NAVY = "#1A2B4A";
const AMBER = "#F59E0B";
const AMBER_LIGHT = "#FFFBF0";
const AMBER_DIM = "rgba(245,158,11,0.15)";

const ALL_ITEMS = [
  { id: 1, emoji: "🍔", name: "Smash Burger",     category: "Burgers",  price: 220, bg: "#FFF7E6", available: true,  desc: "Double smash patty with cheddar & special sauce" },
  { id: 2, emoji: "🍗", name: "Crispy Chicken",   category: "Burgers",  price: 250, bg: "#FFF3E0", available: true,  desc: "Southern-style crispy chicken fillet burger" },
  { id: 3, emoji: "🍕", name: "Cheese Pizza",     category: "Pizza",    price: 350, bg: "#FCE4EC", available: true,  desc: "Classic mozzarella on thin hand-tossed base" },
  { id: 4, emoji: "🍕", name: "BBQ Chicken Pizza",category: "Pizza",    price: 380, bg: "#FBE9E7", available: true,  desc: "Smoky BBQ chicken with red onions & jalapeños" },
  { id: 5, emoji: "🍜", name: "Spicy Noodles",    category: "Noodles",  price: 180, bg: "#E8F5E9", available: true,  desc: "Wok-fried egg noodles with veggies & soy glaze" },
  { id: 6, emoji: "🍜", name: "Chicken Chow Mein",category: "Noodles",  price: 200, bg: "#E0F2F1", available: false, desc: "Classic chow mein with shredded chicken" },
  { id: 7, emoji: "🥗", name: "Caesar Salad",     category: "Healthy",  price: 150, bg: "#E3F2FD", available: true,  desc: "Romaine, parmesan, croutons & caesar dressing" },
  { id: 8, emoji: "🥤", name: "Mango Shake",      category: "Drinks",   price: 90,  bg: "#F3E5F5", available: true,  desc: "Fresh Alphonso mango blended with chilled milk" },
  { id: 9, emoji: "🥤", name: "Lemon Iced Tea",   category: "Drinks",   price: 70,  bg: "#E8EAF6", available: true,  desc: "Refreshing cold brew tea with fresh lemon" },
];

const CATEGORIES = ["All", "Burgers", "Pizza", "Noodles", "Healthy", "Drinks"];

// ── Helpers ───────────────────────────────────────────────────────────────────
const btn = (extra = {}) => ({
  border: "none", cursor: "pointer", borderRadius: 8,
  fontFamily: "inherit", transition: "opacity 0.15s", ...extra,
});

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ cartCount, onCartOpen }) {
  return (
    <nav style={{ background: NAVY, padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 200 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, background: AMBER, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🍳</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Quick<span style={{ color: AMBER }}>Serve</span></div>
          <div style={{ fontSize: 9, color: AMBER, letterSpacing: "0.8px" }}>CLOUD KITCHEN</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 22 }}>
        {["Home", "Menu", "Track Order"].map((l, i) => (
          <a key={l} href="#" style={{ fontSize: 12, color: i === 1 ? AMBER : "rgba(255,255,255,0.65)", textDecoration: "none", fontWeight: i === 1 ? 600 : 400 }}>{l}</a>
        ))}
      </div>

      <button onClick={onCartOpen} style={btn({ background: AMBER, color: NAVY, fontSize: 12, fontWeight: 700, padding: "7px 16px", display: "flex", alignItems: "center", gap: 6 })}>
        🛒 Cart
        {cartCount > 0 && (
          <span style={{ background: NAVY, color: AMBER, fontSize: 11, fontWeight: 700, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
        )}
      </button>
    </nav>
  );
}

// ── Menu Item Card ─────────────────────────────────────────────────────────────
function ItemCard({ item, qty, onAdd, onRemove }) {
  return (
    <div style={{
      border: `1.5px solid ${qty > 0 ? AMBER : "#e5e7eb"}`,
      borderRadius: 12, overflow: "hidden", background: "#fff",
      boxShadow: qty > 0 ? `0 0 0 3px ${AMBER_DIM}` : "none",
      transition: "all 0.15s", opacity: item.available ? 1 : 0.55,
    }}>
      <div style={{ height: 90, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, position: "relative" }}>
        {item.emoji}
        {!item.available && (
          <div style={{ position: "absolute", top: 8, right: 8, background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>Unavailable</div>
        )}
        {item.available && qty > 0 && (
          <div style={{ position: "absolute", top: 8, right: 8, background: AMBER, color: NAVY, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>In Cart ✓</div>
        )}
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", marginBottom: 2 }}>{item.name}</div>
        <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 8, lineHeight: 1.4 }}>{item.desc}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>৳ {item.price}</span>
          {item.available ? (
            qty === 0 ? (
              <button onClick={onAdd} style={btn({ background: AMBER, color: NAVY, fontSize: 18, fontWeight: 700, width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" })}>+</button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={onRemove} style={btn({ background: "#f3f4f6", color: "#374151", fontSize: 16, fontWeight: 700, width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" })}>−</button>
                <span style={{ fontSize: 13, fontWeight: 700, color: NAVY, minWidth: 14, textAlign: "center" }}>{qty}</span>
                <button onClick={onAdd} style={btn({ background: AMBER, color: NAVY, fontSize: 16, fontWeight: 700, width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" })}>+</button>
              </div>
            )
          ) : (
            <span style={{ fontSize: 10, color: "#9ca3af" }}>Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Cart Sidebar ───────────────────────────────────────────────────────────────
function CartSidebar({ cart, items, onClose, onAdd, onRemove, onPlaceOrder }) {
  const cartItems = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ ...items.find(i => i.id === Number(id)), qty }));
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 40;
  const total = subtotal + delivery;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 300 }} />

      {/* Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 320,
        background: "#fff", zIndex: 400, display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
      }}>
        {/* Header */}
        <div style={{ background: NAVY, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>🛒 Your Cart</div>
          <button onClick={onClose} style={btn({ background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 16, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6 })}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🛒</div>
              <div style={{ fontSize: 13 }}>Your cart is empty</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>Add items from the menu</div>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ width: 44, height: 44, background: item.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1f2937" }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>৳ {item.price} × {item.qty}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <button onClick={() => onRemove(item.id)} style={btn({ background: "#f3f4f6", color: "#374151", fontSize: 14, width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" })}>−</button>
                  <span style={{ fontSize: 12, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => onAdd(item.id)} style={btn({ background: AMBER, color: NAVY, fontSize: 14, width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" })}>+</button>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, minWidth: 48, textAlign: "right" }}>৳ {item.price * item.qty}</div>
              </div>
            ))
          )}
        </div>

        {/* Summary + Place Order */}
        {cartItems.length > 0 && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #e5e7eb" }}>
            {[["Subtotal", subtotal], ["Delivery fee", delivery]].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{label}</span>
                <span style={{ fontSize: 12, color: "#1f2937" }}>৳ {val}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #e5e7eb", marginBottom: 14 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: AMBER }}>৳ {total}</span>
            </div>
            <button onClick={onPlaceOrder} style={btn({ background: NAVY, color: "#fff", fontSize: 14, fontWeight: 700, width: "100%", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 })}>
              Place Order →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Order Confirmation Modal ───────────────────────────────────────────────────
function OrderModal({ order, onClose }) {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500 }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        background: "#fff", borderRadius: 16,
        padding: "32px 28px", zIndex: 600,
        width: 320, textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 6 }}>Order Placed!</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
          Your order has been received.<br />Kitchen will start preparing shortly.
        </div>

        {/* Order ID */}
        <div style={{ background: AMBER_LIGHT, border: `1.5px dashed ${AMBER}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: "#92400e", marginBottom: 2 }}>ORDER ID</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: NAVY, letterSpacing: 1 }}>#{order.id}</div>
        </div>

        {/* Status tracker */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, padding: "0 4px" }}>
          {[
            { icon: "✅", label: "Confirmed" },
            { icon: "👨‍🍳", label: "Cooking" },
            { icon: "🏍️", label: "On the way" },
            { icon: "📦", label: "Delivered" },
          ].map((s, i) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, position: "relative" }}>
              {i > 0 && <div style={{ position: "absolute", top: 12, left: "-50%", width: "100%", height: 2, background: i === 0 ? AMBER : "#e5e7eb", zIndex: 0 }} />}
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: i === 0 ? AMBER : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, zIndex: 1 }}>{s.icon}</div>
              <div style={{ fontSize: 9, color: i === 0 ? AMBER : "#9ca3af", fontWeight: i === 0 ? 700 : 400 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 20 }}>
          Estimated delivery: <strong style={{ color: NAVY }}>25–35 min</strong>
        </div>

        <button onClick={onClose} style={btn({ background: NAVY, color: "#fff", fontSize: 13, fontWeight: 700, width: "100%", padding: "11px" })}>
          Track My Order
        </button>
      </div>
    </>
  );
}

// ── Main MenuPage ─────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const addToCart = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart(c => ({ ...c, [id]: Math.max((c[id] || 0) - 1, 0) }));

  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);

  const filtered = ALL_ITEMS.filter(item => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handlePlaceOrder = () => {
    const orderId = Math.floor(1000 + Math.random() * 9000);
    setOrderPlaced({ id: orderId });
    setCart({});
    setCartOpen(false);
  };

  return (
    <div style={{ Width: "100%", margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh", position: "relative" }}>

      {/* Page header */}
      <div style={{ background: NAVY, padding: "24px 24px 20px" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Our Menu 🍽️</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>Fresh, made-to-order meals delivered to your door</div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search menu items..."
            style={{
              width: "100%", padding: "10px 12px 10px 36px",
              borderRadius: 8, border: "none", fontSize: 13,
              background: "rgba(255,255,255,0.1)", color: "#fff",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ background: "#fff", padding: "12px 24px", display: "flex", gap: 8, overflowX: "auto", borderBottom: "1px solid #e5e7eb" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={btn({
            padding: "6px 14px", fontSize: 12, fontWeight: activeCategory === cat ? 700 : 400, whiteSpace: "nowrap",
            background: activeCategory === cat ? NAVY : "#f3f4f6",
            color: activeCategory === cat ? "#fff" : "#6b7280",
          })}>{cat}</button>
        ))}
      </div>

      {/* Menu grid */}
      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 14 }}>
          {filtered.length} item{filtered.length !== 1 ? "s" : ""} {activeCategory !== "All" ? `in ${activeCategory}` : "available"}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🍽️</div>
            <div style={{ fontSize: 14 }}>No items found</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {filtered.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                qty={cart[item.id] || 0}
                onAdd={() => addToCart(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating cart bar */}
      {cartCount > 0 && !cartOpen && (
        <div style={{ position: "sticky", bottom: 0, padding: "12px 24px", background: "#fff", borderTop: "1px solid #e5e7eb" }}>
          <button onClick={() => setCartOpen(true)} style={btn({
            width: "100%", background: NAVY, color: "#fff",
            fontSize: 13, fontWeight: 700, padding: "13px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          })}>
            <span style={{ background: AMBER, color: NAVY, fontSize: 12, fontWeight: 800, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
            <span>View Cart</span>
            <span style={{ color: AMBER }}>৳ {Object.entries(cart).reduce((s, [id, qty]) => s + (ALL_ITEMS.find(i => i.id === Number(id))?.price || 0) * qty, 0)}</span>
          </button>
        </div>
      )}

      {/* Cart sidebar */}
      {cartOpen && (
        <CartSidebar
          cart={cart}
          items={ALL_ITEMS}
          onClose={() => setCartOpen(false)}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {/* Order success modal */}
      {orderPlaced && (
        <OrderModal order={orderPlaced} onClose={() => setOrderPlaced(null)} />
      )}
    </div>
  );
}
