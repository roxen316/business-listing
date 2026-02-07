"use client";

import { useState } from "react";

const featured = [
  {
    id: 1,
    name: "Om Dairy",
    category: "Dairy & Milk Products",
    address: "Main Market, Rewari",
    phone: "9050001111",
    offer: "Fresh Paneer Daily + Bulk Discount",
    lat: 28.199,
    lng: 76.618,
    sponsored: true,
    photos: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc"
    ]
  },
  {
    id: 2,
    name: "Sonu Hero Honda",
    category: "Two Wheeler Dealer",
    address: "Delhi Road, Rewari",
    phone: "9050002222",
    offer: "Free Bike Checkup Camp",
    lat: 28.201,
    lng: 76.62,
    sponsored: true,
    photos: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39"
    ]
  },
  {
    id: 3,
    name: "Jajoria Cyber Cafe",
    category: "Cyber Cafe",
    address: "Bus Stand Road",
    phone: "9050003333",
    offer: "All Online Forms + Printout",
    lat: 28.197,
    lng: 76.616,
    sponsored: true,
    photos: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    ]
  }
];

const others = [
  { id: 4, name: "BMG Mall", category: "Shopping Mall", address: "Circular Road", phone: "9050004444", lat: 28.192, lng: 76.623 },
  { id: 5, name: "Rewari Hyundai", category: "Car Dealer", address: "Delhi Road", phone: "9050005555", lat: 28.205, lng: 76.619 },
  { id: 6, name: "City Medicos", category: "Medical Store", address: "Model Town", phone: "9050006666", lat: 28.204, lng: 76.615 },
  { id: 7, name: "Sharma Sweets", category: "Sweet Shop", address: "Main Bazaar", phone: "9050007777", lat: 28.198, lng: 76.617 },
  { id: 8, name: "Gupta Hardware", category: "Hardware", address: "Railway Road", phone: "9050008888", lat: 28.196, lng: 76.614 },
  { id: 9, name: "Modern Tailors", category: "Tailor", address: "Qutubpur", phone: "9050009999", lat: 28.203, lng: 76.621 },
  { id: 10, name: "Rao Restaurant", category: "Restaurant", address: "Near Bus Stand", phone: "9050010000", lat: 28.2, lng: 76.618 }
];

function AdBox({ text }) {
  return (
    <a href="https://wa.me/919050296596" target="_blank">
      <div style={{
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        textAlign: "center",
        cursor: "pointer"
      }}>
        <div style={{ color: "#ffd000", fontWeight: 800, fontSize: 14 }}>ADVERTISEMENT</div>
        <div style={{ marginTop: 8, fontWeight: 700 }}>{text}</div>
        <div style={{ opacity: .6, fontSize: 12, marginTop: 6 }}>Tap to Book Ad</div>
      </div>
    </a>
  );
}

function Card({ b, onOpen }) {
  return (
    <div
      onClick={() => onOpen(b)}
      style={{
        background: "linear-gradient(180deg,#1a1a1a,#101010)",
        border: "1px solid #2a2a2a",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,.4)",
        cursor: "pointer",
        height: "100%"
      }}
    >
      {b.sponsored && (
        <div style={{
          background: "#ffd000",
          color: "black",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 800,
          marginBottom: 8,
          display: "inline-block"
        }}>TOP FEATURED</div>
      )}

      <h3 style={{ margin: 0 }}>{b.name}</h3>
      <div style={{ opacity: .6 }}>{b.category}</div>
      <div style={{ marginTop: 6, fontSize: 14 }}>{b.address}</div>
      <div style={{ marginTop: 4, fontSize: 14 }}>📞 {b.phone}</div>

      <div style={{ marginTop: 10, color: "#ffd000", fontWeight: 700 }}>
        View Details →
      </div>
    </div>
  );
}

function DetailModal({ b, onClose }) {
  if (!b) return null;
  const map = `https://www.google.com/maps?q=${b.lat},${b.lng}`;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", padding: 40, zIndex: 50 }}>
      <div style={{ maxWidth: 820, margin: "0 auto", background: "#111", borderRadius: 20, padding: 24 }}>
        <h2>{b.name}</h2>
        <div>{b.category}</div>
        <div>📍 {b.address}</div>
        <div>📞 {b.phone}</div>

        {b.offer && (
          <div style={{
            marginTop: 12,
            background: "#2a2200",
            border: "1px solid #5a4a00",
            padding: 12,
            borderRadius: 12,
            color: "#ffd000",
            fontWeight: 700
          }}>
            🎁 {b.offer}
          </div>
        )}

        {b.photos && (
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {b.photos.map((p, i) => (
              <img key={i} src={p} style={{ width: 200, borderRadius: 12 }} />
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <a href={map} target="_blank">
            <button style={{ padding: 12, borderRadius: 12, background: "#ffd000", border: 0, fontWeight: 800 }}>
              Open in Google Map
            </button>
          </a>
          <button onClick={onClose} style={{ padding: 12, borderRadius: 12 }}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(null);
  const all = [...featured, ...others];

  return (
    <div style={{ background: "#0b0b0c", minHeight: "100vh", color: "#f5f5f5" }}>

      <div style={{ background: "#ffd000", color: "black", fontWeight: 800, padding: 8, textAlign: "center" }}>
        📢 Contact For Ads — Call / WhatsApp: 9050296596
      </div>

      <div style={{ textAlign: "center", padding: "26px 20px" }}>
        <div style={{
          fontSize: 40,
          fontWeight: 900,
          background: "linear-gradient(90deg,#ffd000,#ffae00)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          Rewari Yellow Page
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 220px", gap: 20, padding: "0 20px 40px" }}>

        <div>
          <AdBox text="Your Shop Ad Here" />
          <AdBox text="Promote Business" />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20
        }}>
          {all.map(b => <Card key={b.id} b={b} onOpen={setOpen} />)}
        </div>

        <div>
          <AdBox text="Top Placement Ad" />
          <AdBox text="Festival Offer Ad" />
        </div>

      </div>

      <DetailModal b={open} onClose={() => setOpen(null)} />
    </div>
  );
}
