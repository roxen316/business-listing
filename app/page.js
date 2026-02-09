"use client";

import { useState, useMemo } from "react";

// ===== Seed Data with Images =====
const seed = [
  {
    id: 1,
    name: "Om Dairy",
    category: "Dairy",
    address: "Circular Road Rewari",
    phone: "8685868584",
    whatsapp: "8685868584",
    offer: "Fresh Desi Ghee",
    mapUrl: "https://share.google/NLLPflXGrgCJ7cwsz",
    color: "#FFC0CB",
    featured: true,
    image: "https://picsum.photos/id/1015/800/600",
  },
  {
    id: 2,
    name: "Sonu Hero Honda",
    category: "Automobile",
    address: "305, Sector 5 Rewari",
    phone: "9416441521",
    whatsapp: "9416441521",
    offer: "Free Service Check",
    mapUrl: "https://maps.app.goo.gl/ERtqihb7MVAU2n7M6",
    color: "#0f766e",
    featured: true,
    image: "https://picsum.photos/id/870/800/600",
  },
  {
    id: 3,
    name: "Jajoria Cyber Cafe",
    category: "Cyber Cafe",
    address: "Bus Stand Rewari",
    phone: "01274224122",
    whatsapp: "01274224122",
    offer: "Print Scan Passport",
    mapUrl: "https://maps.app.goo.gl/QZPKUNuA2qxVSWi66",
    color: "#7c3aed",
    featured: true,
    image: "https://picsum.photos/id/201/800/600",
  },
  {
    id: 4,
    name: "Red Rose Cafe",
    category: "Party Cafe",
    address: "Circular Road Leo Chowk Rewari",
    phone: "7206452020",
    whatsapp: "7206452020",
    offer: "Party Hall Booking",
    mapUrl: "https://maps.app.goo.gl/1e7Pu8RrQkiSsvNY7",
    color: "#f97316",
    featured: true,
    image: "https://picsum.photos/id/431/800/600",
  },
  {
    id: 5,
    name: "The Cafe Club",
    category: "Party Cafe",
    address: "Konsiwas Road, Rewari",
    phone: "9896127474",
    whatsapp: "9896127474",
    offer: "Party Hall",
    mapUrl: "https://maps.app.goo.gl/1uwaZ56rNKwHrPju5",
    color: "#1f2937",
    featured: false,
    image: "https://picsum.photos/id/106/800/600",
  },
  {
    id: 6,
    name: "Big Boy Hotel",
    category: "Hotel",
    address: "Krishna Nagar - Konsiwas Road",
    phone: "7206452020",
    whatsapp: "7206452020",
    offer: "AC Rooms Available",
    mapUrl: "https://maps.app.goo.gl/4wfC64jrvEXY47mU6",
    color: "#7c3aed",
    featured: true,
    image: "https://picsum.photos/id/669/800/600",
  },
];

export default function Page() {
  const [list, setList] = useState(seed);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [form, setForm] = useState({
    name: "", category: "", address: "", phone: "", whatsapp: "",
    offer: "", mapUrl: "", color: "#1f2937", image: ""
  });
  const [editId, setEditId] = useState(null);

  const ADMIN_ID = "admin";
  const ADMIN_PASS = "admin123";

  const categories = ["All", ...new Set(list.map(b => b.category))];

  const filteredList = useMemo(() => {
    return list
      .filter(b => {
        const matchesSearch = 
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.category.toLowerCase().includes(search.toLowerCase()) ||
          b.address.toLowerCase().includes(search.toLowerCase());
        const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
        return matchesSearch && matchesCat;
      })
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [list, search, selectedCategory]);

  const doLogin = () => {
    if (loginId === ADMIN_ID && loginPass === ADMIN_PASS) {
      setIsAdmin(true);
      setShowLogin(false);
    } else alert("Wrong login");
  };

  const save = () => {
    if (!form.name) return alert("Name required");
    if (editId) {
      setList(list.map(x => x.id === editId ? { ...x, ...form } : x));
    } else {
      setList([{ ...form, id: Date.now(), featured: false }, ...list]);
    }
    setForm({ name: "", category: "", address: "", phone: "", whatsapp: "", offer: "", mapUrl: "", color: "#1f2937", image: "" });
    setEditId(null);
  };

  const editBusiness = (b) => {
    setForm(b);
    setEditId(b.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBusiness = (id) => setList(list.filter(x => x.id !== id));
  const toggleFeature = (id) => setList(list.map(x => x.id === id ? { ...x, featured: !x.featured } : x));
  const updateColor = (id, color) => setList(list.map(x => x.id === id ? { ...x, color } : x));

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #1e293b, #020617)", color: "#e5e7eb", fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "40px 20px 20px", background: "rgba(0,0,0,0.4)" }}>
        <div style={{ fontSize: "48px", fontWeight: "900", background: "linear-gradient(90deg, #ffd000, #ff8f00)", WebkitBackgroundClip: "text", color: "transparent" }}>
          Rewari Yellow Page
        </div>
        <p style={{ marginTop: "8px", color: "#fde047", fontSize: "18px" }}>Local Business Directory</p>

        <marquee style={{ margin: "15px 0", color: "#fde047", fontWeight: "700", fontSize: "18px" }}>
          Contact For Ads & Featured Listing — Call / WhatsApp: 9050296596
        </marquee>

        {/* Search */}
        <input
          type="text"
          placeholder="Search business, category or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "700px", padding: "16px 24px", fontSize: "18px", borderRadius: "999px", border: "none", background: "#1e2937", color: "white", marginTop: "10px" }}
        />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px" }}>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "15px 0", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "10px 24px",
                borderRadius: "999px",
                fontWeight: "600",
                background: selectedCategory === cat ? "#ffd000" : "#1e2937",
                color: selectedCategory === cat ? "#000" : "#ddd",
                border: "1px solid #334155",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Admin Form */}
        {isAdmin && (
          <div style={{ background: "#1e2937", padding: "30px", borderRadius: "20px", marginBottom: "40px", border: "2px solid #ffd000" }}>
            <h3 style={{ fontSize: "26px", marginBottom: "20px" }}>Add / Edit Business</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "15px" }}>
              {Object.keys(form).map(key => (
                <input
                  key={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ padding: "14px", borderRadius: "12px", background: "#0f172a", border: "1px solid #475569", color: "white" }}
                />
              ))}
            </div>
            <button onClick={save} style={{ marginTop: "20px", padding: "14px 40px", background: "#ffd000", color: "#000", fontWeight: "bold", borderRadius: "12px", fontSize: "18px" }}>
              {editId ? "Update Business" : "Add Business"}
            </button>
          </div>
        )}

        {/* Business Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
          {filteredList.map(b => (
            <div
              key={b.id}
              style={{
                background: "#1e2937",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
                border: "1px solid #334155",
                transition: "all 0.4s",
                position: "relative"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-12px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "220px" }}>
                <img src={b.image} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {b.featured && (
                  <div style={{ position: "absolute", top: "14px", left: "14px", background: "#ffd000", color: "#000", padding: "6px 16px", borderRadius: "999px", fontWeight: "800", fontSize: "13px", boxShadow: "0 4px 15px rgba(255,208,0,0.5)" }}>
                    ⭐ FEATURED
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "22px" }}>
                <h3 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 6px 0" }}>{b.name}</h3>
                <div style={{ color: "#ffd000", fontWeight: "600" }}>{b.category}</div>

                <div style={{ marginTop: "16px", lineHeight: "1.6", fontSize: "15px" }}>
                  📍 {b.address}<br />
                  📞 {b.phone}
                </div>

                {b.offer && (
                  <div style={{ marginTop: "18px", background: "#3a2f00", border: "1px solid #ffd000", padding: "12px", borderRadius: "14px", color: "#ffe082" }}>
                    🎁 {b.offer}
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                  <a href={b.mapUrl} target="_blank" style={{ flex: 1, background: "#3b82f6", color: "white", padding: "14px", borderRadius: "14px", textAlign: "center", fontWeight: "600", textDecoration: "none" }}>
                    📍 Open Map
                  </a>
                  <a href={`https://wa.me/91${b.whatsapp}`} target="_blank" style={{ flex: 1, background: "#25D366", color: "white", padding: "14px", borderRadius: "14px", textAlign: "center", fontWeight: "600", textDecoration: "none" }}>
                    💬 WhatsApp
                  </a>
                </div>

                {isAdmin && (
                  <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid #475569", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button onClick={() => editBusiness(b)} style={{ flex: 1, padding: "10px", background: "#334155", borderRadius: "10px" }}>Edit</button>
                    <button onClick={() => toggleFeature(b.id)} style={{ flex: 1, padding: "10px", background: "#334155", borderRadius: "10px" }}>
                      {b.featured ? "Unfeature" : "Feature"}
                    </button>
                    <input type="color" value={b.color} onChange={e => updateColor(b.id, e.target.value)} style={{ width: "50px", height: "42px", border: "none", borderRadius: "10px" }} />
                    <button onClick={() => deleteBusiness(b.id)} style={{ flex: 1, padding: "10px", background: "#7f1d1d", color: "#fecaca", borderRadius: "10px" }}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isAdmin && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <button onClick={() => setShowLogin(true)} style={{ padding: "14px 32px", background: "#334155", borderRadius: "999px", fontSize: "17px" }}>
            Admin Login
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1e2937", padding: "30px", borderRadius: "20px", width: "340px" }}>
            <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Admin Login</h3>
            <input placeholder="Admin ID" value={loginId} onChange={e => setLoginId(e.target.value)} style={{ width: "100%", padding: "14px", marginBottom: "12px", borderRadius: "12px", background: "#0f172a" }} />
            <input type="password" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} style={{ width: "100%", padding: "14px", marginBottom: "20px", borderRadius: "12px", background: "#0f172a" }} />
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={doLogin} style={{ flex: 1, padding: "14px", background: "#ffd000", color: "#000", fontWeight: "bold", borderRadius: "12px" }}>Login</button>
              <button onClick={() => setShowLogin(false)} style={{ flex: 1, padding: "14px", background: "#334155", borderRadius: "12px" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
