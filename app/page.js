// =============================
// app/page.js — Rewari Yellow Page — FINAL ALL-IN-ONE BUILD
// Premium Directory + Admin Panel + Edit Everything
// Admin Login + 2-Step OTP (Free Flow)
// Data persists via localStorage (Vercel without DB limitation)
// =============================

"use client";

import { useEffect, useState } from "react";

// 🔐 CHANGE THESE AFTER DEPLOY
const ADMIN_ID = "admin";
const ADMIN_PASS = "Change@123";

// ===== DEFAULT DATA =====
const DEFAULT_DATA = {
  siteName: "Rewari Yellow Page",
  headline: "Contact For Ads — WhatsApp 9050296596",
  businesses: [
    { id: 1, name: "Om Dairy", category: "Dairy", address: "Main Market", phone: "9050001111", offer: "Fresh Paneer", sponsored: true, lat: 28.199, lng: 76.618, photos: [] },
    { id: 2, name: "Sonu Hero Honda", category: "Bike Dealer", address: "Delhi Road", phone: "9050002222", offer: "Free Checkup", sponsored: true, lat: 28.201, lng: 76.62, photos: [] },
    { id: 3, name: "Jajoria Cyber Cafe", category: "Cyber Cafe", address: "Bus Stand", phone: "9050003333", offer: "All Forms", sponsored: true, lat: 28.197, lng: 76.616, photos: [] }
  ]
};

// ===== STORAGE HELPERS =====
function loadData() {
  if (typeof window === "undefined") return DEFAULT_DATA;
  const d = localStorage.getItem("ryp_data");
  return d ? JSON.parse(d) : DEFAULT_DATA;
}

function saveData(d) {
  localStorage.setItem("ryp_data", JSON.stringify(d));
}

// ===== ADMIN LOGIN =====
function AdminLogin({ onSuccess }) {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [genOtp, setGenOtp] = useState("");

  function step1() {
    if (id === ADMIN_ID && pass === ADMIN_PASS) {
      const o = Math.floor(100000 + Math.random()*900000).toString();
      setGenOtp(o);
      setStep(2);
      alert("OTP: " + o + "\nUse Send WhatsApp button");
    } else alert("Wrong credentials");
  }

  function sendWA(){
    window.open(`https://wa.me/?text=Admin%20OTP:%20${genOtp}`);
  }

  function step2(){ if (otp === genOtp) onSuccess(); else alert("Wrong OTP"); }

  return (
    <div style={panel}>
      <h3>Admin Secure Login</h3>
      {step===1 && (
        <>
          <input style={inp} placeholder="Admin ID" value={id} onChange={e=>setId(e.target.value)}/>
          <input style={inp} type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)}/>
          <button style={btn} onClick={step1}>Login</button>
        </>
      )}
      {step===2 && (
        <>
          <button style={btn} onClick={sendWA}>Send OTP WhatsApp</button>
          <input style={inp} placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)}/>
          <button style={btn} onClick={step2}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

// ===== ADMIN PANEL =====
function AdminPanel({ data, setData, logout }) {
  const [b, setB] = useState({ name:"", category:"", address:"", phone:"", offer:"" });

  function add(){
    const n = { ...b, id: Date.now(), sponsored:false, photos:[] };
    const d = { ...data, businesses:[...data.businesses, n] };
    setData(d); saveData(d);
  }

  function del(id){
    const d={...data,businesses:data.businesses.filter(x=>x.id!==id)};
    setData(d); saveData(d);
  }

  function toggle(id){
    const d={...data,businesses:data.businesses.map(x=>x.id===id?{...x,sponsored:!x.sponsored}:x)};
    setData(d); saveData(d);
  }

  function updateSite(k,v){ const d={...data,[k]:v}; setData(d); saveData(d); }

  return (
    <div style={panel}>
      <h3>Admin Dashboard</h3>
      <button style={btn} onClick={logout}>Logout</button>

      <h4>Site Settings</h4>
      <input style={inp} value={data.siteName} onChange={e=>updateSite("siteName",e.target.value)}/>
      <input style={inp} value={data.headline} onChange={e=>updateSite("headline",e.target.value)}/>

      <h4>Add Business</h4>
      {Object.keys(b).map(k=> (
        <input key={k} style={inp} placeholder={k} value={b[k]} onChange={e=>setB({...b,[k]:e.target.value})}/>
      ))}
      <button style={btn} onClick={add}>Add Business</button>

      <h4>Manage</h4>
      {data.businesses.map(x=> (
        <div key={x.id} style={row}>
          <div>{x.name}</div>
          <div style={{display:"flex",gap:6}}>
            <button style={btnSmall} onClick={()=>toggle(x.id)}>★</button>
            <button style={delBtn} onClick={()=>del(x.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Card({ b }){
  const map=`https://www.google.com/maps?q=${b.lat},${b.lng}`;
  return (
    <div style={card}>
      {b.sponsored && <div style={badge}>TOP</div>}
      <h3>{b.name}</h3>
      <div>{b.category}</div>
      <div>{b.address}</div>
      <div>{b.phone}</div>
      {b.offer && <div style={offer}>🎁 {b.offer}</div>}
      <a href={map} target="_blank"><button style={btnSmall}>Map</button></a>
    </div>
  );
}

// ===== MAIN =====
export default function Home(){
  const [data,setData]=useState(DEFAULT_DATA);
  const [admin,setAdmin]=useState(false);

  useEffect(()=>{ const d=loadData(); setData(d); },[]);

  return (
    <div style={{background:"#0b0b0c",minHeight:"100vh",color:"white",padding:20}}>

      <div style={{background:"#ffd000",color:"black",padding:8,textAlign:"center",fontWeight:800}}>
        {data.headline}
      </div>

      <h1 style={{textAlign:"center",color:"#ffd000"}}>{data.siteName}</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {data.businesses.map(b=><Card key={b.id} b={b}/>) }
      </div>

      {/* bottom admin */}
      {!admin && (
        <div style={{textAlign:"center",marginTop:40}}>
          <button style={btn} onClick={()=>setAdmin("login")}>Admin Login</button>
        </div>
      )}

      {admin==="login" && <AdminLogin onSuccess={()=>setAdmin(true)} />}
      {admin===true && <AdminPanel data={data} setData={setData} logout={()=>setAdmin(false)} />}

    </div>
  );
}

// ===== styles =====
const panel={background:"#111",padding:20,borderRadius:16,marginTop:20,maxWidth:500};
const inp={width:"100%",padding:10,margin:"6px 0",borderRadius:8,border:"1px solid #333",background:"#0f0f0f",color:"white"};
const btn={padding:10,borderRadius:10,background:"#ffd000",border:0,fontWeight:800,cursor:"pointer",marginTop:8};
const btnSmall={padding:"6px 10px",borderRadius:8,background:"#ffd000",border:0,fontWeight:700,cursor:"pointer"};
const delBtn={background:"#400",color:"white",border:0,padding:"6px 10px",borderRadius:8};
const row={display:"flex",justifyContent:"space-between",marginTop:8,background:"#181818",padding:8,borderRadius:8};
const card={background:"#151515",padding:16,borderRadius:16,border:"1px solid #2a2a2a"};
const offer={background:"#2a2200",padding:8,borderRadius:8,color:"#ffd000",marginTop:6};
const badge={background:"#ffd000",color:"black",display:"inline-block",padding:"2px 8px",borderRadius:999,fontSize:12,fontWeight:800};
