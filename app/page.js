// app/page.js
// Rewari Yellow Page — Simple Final Build v2 (Google Map Link + Admin Add Option)

"use client";

import { useState } from "react";

// ===== Demo Seed Data (Editable by Admin) =====
const seed = [
  { id:1, name:"Om Dairy", category:"Dairy", address:"Circular Road Rewari", phone:"8685868584", whatsapp:"8685868584", offer:"Fresh Desi Ghee ", mapUrl:"https://share.google/NLLPflXGrgCJ7cwsz", color:"#FFC0CB", featured:true },
  { id:2, name:"Sonu Hero Honda", category:"Automobile", address:"305, Sector 5 Rewari", phone:"9416441521", whatsapp:"9416441521", offer:"Free Service Check", mapUrl:"https://maps.app.goo.gl/ERtqihb7MVAU2n7M6", color:"#0f766e", featured:true },
  { id:3, name:"Jajoria Cyber Cafe", category:"Cyber Cafe", address:"Bus Stand Rewari", phone:"01274224122", whatsapp:"01274224122", offer:"Print Scan Passport", mapUrl:"https://maps.app.goo.gl/QZPKUNuA2qxVSWi66", color:"#7c3aed", featured:true },
  { id:4, name:"Red Rose Cafe", category:"Party Cafe", address:"Circular Road Leo Chowk Rewari", phone:"7206452020", whatsapp:"7206452020", offer:"Party Hall ", mapUrl:"https://maps.app.goo.gl/1e7Pu8RrQkiSsvNY7", color:"##FFC0CB", featured:true },
  { id:5, name:"The Cafe Club", category:"Party Cafe", address:"Konsiwas Road, Rewari", phone:"9896127474", whatsapp:"9896127474", offer:"Party Hall ", mapUrl:"https://maps.app.goo.gl/1uwaZ56rNKwHrPju5", color:"#1f2937", featured:true },
  { id:6, name:"Big Boy Hotel", category:"Hotel/Rest Room", address:"Krishna Nagar - Konsiwas Road Link Road, Rewari", phone:"7206452020", whatsapp:"7206452020", offer:"Rooms ", mapUrl:"https://maps.app.goo.gl/4wfC64jrvEXY47mU6", color:"##7c3aed", featured:true },
];

// ===== Card =====
function Card({ b, admin, onEdit, onDelete, onToggle, onColor }) {
  const wa = `https://wa.me/91${b.whatsapp}`;

  return (
    <div style={{
      background:`linear-gradient(180deg,${b.color},#020617)`,
      borderRadius:18,
      padding:18,
      boxShadow:"0 15px 35px rgba(0,0,0,.5)",
      border:"1px solid #334155",
      color:"#e5e7eb"
    }}>

      {b.featured && (
        <div style={{background:"#ffd000",color:"#000",padding:"3px 8px",borderRadius:999,fontSize:12,fontWeight:800}}>
          FEATURED
        </div>
      )}

      <h3 style={{fontSize:20,fontWeight:800,marginTop:6}}>{b.name}</h3>
      <div>{b.category}</div>
      <div>📍 {b.address}</div>
      <div>📞 {b.phone}</div>

      {b.offer && (
        <div style={{marginTop:8,background:"#3a2f00",border:"1px solid #ffd000",padding:6,borderRadius:10,color:"#ffe082"}}>
          🎁 {b.offer}
        </div>
      )}

      <div style={{display:"flex",gap:8,marginTop:10}}>
        {b.mapUrl && <a href={b.mapUrl} target="_blank"><button>Open Map</button></a>}
        <a href={wa} target="_blank"><button>WhatsApp</button></a>
      </div>

      {admin && (
        <div style={{marginTop:10,display:"flex",gap:6,flexWrap:"wrap"}}>
          <button onClick={()=>onEdit(b)}>Edit</button>
          <button onClick={()=>onToggle(b)}>Feature</button>
          <input type="color" value={b.color} onChange={e=>onColor(b.id,e.target.value)} />
          <button onClick={()=>onDelete(b.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

// ===== Page =====
export default function Page(){
  const [list,setList] = useState(seed);
  const [isAdmin,setIsAdmin] = useState(false);
  const [showLogin,setShowLogin] = useState(false);
  const [loginId,setLoginId] = useState("");
  const [loginPass,setLoginPass] = useState("");

  const emptyForm = {name:"",category:"",address:"",phone:"",whatsapp:"",offer:"",mapUrl:"",color:"#1f2937"};
  const [form,setForm] = useState(emptyForm);
  const [editId,setEditId] = useState(null);

  const ADMIN_ID = "admin";
  const ADMIN_PASS = "admin123";

  function doLogin(){
    if(loginId===ADMIN_ID && loginPass===ADMIN_PASS){
      setIsAdmin(true);
      setShowLogin(false);
    } else alert("Wrong login");
  }

  function save(){
    if(!form.name) return alert("Name required");

    if(editId){
      setList(list.map(x=>x.id===editId?{...x,...form}:x));
    } else {
      setList([{...form,id:Date.now(),featured:false}, ...list]);
    }

    setForm(emptyForm);
    setEditId(null);
  }

  function edit(b){ setForm(b); setEditId(b.id); window.scrollTo({top:0,behavior:"smooth"}); }
  function del(id){ setList(list.filter(x=>x.id!==id)); }
  function toggle(b){ setList(list.map(x=>x.id===b.id?{...x,featured:!x.featured}:x)); }
  function setColor(id,c){ setList(list.map(x=>x.id===id?{...x,color:c}:x)); }

  const sorted = [...list].sort((a,b)=>(b.featured?1:0)-(a.featured?1:0));

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a,#1e293b,#020617)",color:"#e5e7eb"}}>

      {/* Header */}
      <div style={{textAlign:"center",padding:30}}>
        <div style={{fontSize:42,fontWeight:900,background:"linear-gradient(90deg,#ffd000,#ff8f00)",WebkitBackgroundClip:"text",color:"transparent"}}>
          Rewari Yellow Page
        </div>

        <marquee style={{marginTop:10,color:"#fde047",fontWeight:700}}>
          Contact For Ads & Featured Listing — Call / WhatsApp: 9050296596
        </marquee>

        <button onClick={()=>window.scrollTo({top:320,behavior:"smooth"})}>
          ➕ List Your Business
        </button>
      </div>

      {/* Admin Form */}
      {isAdmin && (
        <div style={{maxWidth:1100,margin:"0 auto 20px",padding:20,border:"1px solid #334155",borderRadius:16}}>
          <h3>Admin Add / Edit Business</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {Object.keys(emptyForm).map(k=>(
              <input key={k} placeholder={k} value={form[k]||""}
                onChange={e=>setForm({...form,[k]:e.target.value})}/>
            ))}
          </div>
          <button onClick={save}>{editId?"Update":"Add Business"}</button>
        </div>
      )}

      {/* Grid */}
      <div style={{padding:"0 40px 60px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {sorted.map(b=> (
          <Card key={b.id} b={b} admin={isAdmin} onEdit={edit} onDelete={del} onToggle={toggle} onColor={setColor} />
        ))}
      </div>

      {!isAdmin && (
        <div style={{textAlign:"center",paddingBottom:40}}>
          <button onClick={()=>setShowLogin(true)}>Admin Login</button>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"#020617",padding:20,borderRadius:14,width:300}}>
            <h3>Admin Login</h3>
            <input placeholder="ID" value={loginId} onChange={e=>setLoginId(e.target.value)} />
            <input placeholder="Password" type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} />
            <button onClick={doLogin}>Login</button>
            <button onClick={()=>setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}
