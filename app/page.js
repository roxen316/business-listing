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
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [form, setForm] = useState({
    name: "", category: "", address: "", phone: "", whatsapp: "",
    offer: "", mapUrl: "", color: "#1f2937", image: ""
  });
  const [editId, setEditId] = useState(null);

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

  const save = () => {
    if (!form.name) return alert("Name required!");
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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", background: "radial-gradient(circle at top right, #1e293b, #0f172a)", color: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: "40px" }}>

      {/* Glassmorphism Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", padding: "30px 20px", textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 6vw, 52px)", fontWeight: "900", background: "linear-gradient(to right, #fbbf24, #f59e0b, #ea580c)", WebkitBackgroundClip: "text", color: "transparent", letterSpacing: "-1px" }}>
          Rewari Yellow Pages
        </h1>
        <p style={{ marginTop: "6px", color: "#cbd5e1", fontSize: "clamp(14px, 3vw, 18px)", fontWeight: "500" }}>
          Your Local Business Directory
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: "600px", margin: "20px auto 0", position: "relative" }}>
          <span style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", fontSize: "20px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search businesses, categories, or areas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "16px 20px 16px 50px", fontSize: "16px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", outline: "none", boxSizing: "border-box", transition: "all 0.3s" }}
            onFocus={(e) => e.target.style.border = "1px solid #fbbf24"}
            onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
          />
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>

        {/* Marquee Ad */}
        <div style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "12px", margin: "20px 0", padding: "12px", overflow: "hidden" }}>
          <marquee style={{ color: "#fbbf24", fontWeight: "600", fontSize: "15px" }}>
            📢 Want to feature your business here? Call / WhatsApp: 9050296596 for Advertising!
          </marquee>
        </div>

        {/* Smooth Scroll Category Filters */}
        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "15px", margin: "10px 0 25px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                flexShrink: 0,
                padding: "10px 20px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                background: selectedCategory === cat ? "#fbbf24" : "rgba(255,255,255,0.05)",
                color: selectedCategory === cat ? "#0f172a" : "#e2e8f0",
                border: selectedCategory === cat ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Admin Form (Publicly Visible for now) */}
        <div style={{ background: "rgba(30, 41, 59, 0.5)", border: "1px solid #334155", padding: "clamp(20px, 4vw, 30px)", borderRadius: "20px", marginBottom: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
          <h3 style={{ fontSize: "22px", margin: "0 0 20px 0", color: "#f8fafc" }}>
            {editId ? "✏️ Update Business Details" : "➕ Add New Business"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {Object.keys(form).map(key => {
              if (key === 'color' || key === 'featured' || key === 'id') return null; // Skip non-text fields
              return (
                <input
                  key={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1) + (key === 'image' ? ' URL (optional)' : '')}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "rgba(15, 23, 42, 0.6)", border: "1px solid #475569", color: "white", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
                  onBlur={(e) => e.target.style.border = "1px solid #475569"}
                />
              )
            })}
          </div>
          <button onClick={save} style={{ marginTop: "20px", width: "100%", maxWidth: "300px", padding: "16px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", fontWeight: "bold", borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "16px", boxShadow: "0 4px 15px rgba(37, 99, 235, 0.4)", transition: "transform 0.2s" }} onMouseOver={(e) => e.target.style.transform="scale(1.02)"} onMouseOut={(e) => e.target.style.transform="scale(1)"}>
            {editId ? "Save Changes" : "Publish Business"}
          </button>
        </div>

        {/* Business Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {filteredList.map(b => (
            <div
              key={b.id}
              style={{
                background: "#1e293b",
                borderRadius: "20px",
                overflow: "hidden",
                border: b.featured ? "2px solid #fbbf24" : "1px solid #334155",
                transition: "all 0.3s ease",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: b.featured ? "0 10px 30px rgba(251, 191, 36, 0.15)" : "0 4px 20px rgba(0,0,0,0.3)"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = b.featured ? "0 10px 30px rgba(251, 191, 36, 0.15)" : "0 4px 20px rgba(0,0,0,0.3)"; }}
            >
              {/* Card Image Wrapper */}
              <div style={{ position: "relative", height: "180px", background: "#334155" }}>
                <img src={b.image || "https://placehold.co/800x600/1e293b/FFF?text=No+Image"} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, #1e293b, transparent)" }}></div>
                
                {b.featured && (
                  <div style={{ position: "absolute", top: "12px", right: "12px", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", color: "#000", padding: "4px 12px", borderRadius: "8px", fontWeight: "800", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 4px 10px rgba(245, 158, 11, 0.4)" }}>
                    Featured
                  </div>
                )}
                
                <div style={{ position: "absolute", bottom: "12px", left: "16px", background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", color: "#60a5fa", fontWeight: "600" }}>
                  {b.category}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 10px 0", color: "#f8fafc", lineHeight: "1.3" }}>
                  {b.name}
                </h3>

                <div style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px", flexGrow: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                    <span>📍</span> <span>{b.address}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>📞</span> <span>{b.phone}</span>
                  </div>
                </div>

                {b.offer && (
                  <div style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px dashed rgba(34, 197, 94, 0.4)", padding: "10px", borderRadius: "10px", color: "#4ade80", fontSize: "13px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
                    🎉 {b.offer}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                  <a href={b.mapUrl} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", background: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.3)", padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background="rgba(59, 130, 246, 0.2)"} onMouseOut={(e) => e.currentTarget.style.background="rgba(59, 130, 246, 0.1)"}>
                    📍 Map
                  </a>
                  <a href={`https://wa.me/91${b.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", background: "#22c55e", color: "white", padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", textDecoration: "none", boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)", transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform="scale(1.03)"} onMouseOut={(e) => e.currentTarget.style.transform="scale(1)"}>
                    💬 Chat
                  </a>
                </div>

                {/* Admin Controls */}
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "8px" }}>
                  <button onClick={() => editBusiness(b)} style={{ flex: 1, padding: "8px", background: "#334155", color: "white", borderRadius: "6px", border: "none", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => toggleFeature(b.id)} style={{ flex: 1, padding: "8px", background: b.featured ? "#b45309" : "#334155", color: "white", borderRadius: "6px", border: "none", fontSize: "12px", cursor: "pointer" }}>
                    {b.featured ? "⭐ Unstar" : "⭐ Star"}
                  </button>
                  <button onClick={() => deleteBusiness(b.id)} style={{ padding: "8px 12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderRadius: "6px", border: "1px solid rgba(239, 68, 68, 0.3)", fontSize: "12px", cursor: "pointer" }}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredList.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
            <span style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}>📭</span>
            <p style={{ fontSize: "18px" }}>No businesses found for this search.</p>
          </div>
        )}

      </div>
    </div>
  );
}
