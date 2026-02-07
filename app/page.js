const businesses = [
  {
    name: "Rewari Hyundai",
    category: "Automobile",
    address: "Delhi Road",
    phone: "9999991111",
    sponsored: true
  },
  {
    name: "BMG Mall",
    category: "Shopping",
    address: "Circular Road",
    phone: "9999992222",
    sponsored: true
  },
  {
    name: "Rao Tula Ram Hospital",
    category: "Healthcare",
    address: "Model Town",
    phone: "9999993333"
  },
  {
    name: "City Food Court",
    category: "Restaurant",
    address: "Main Bazaar",
    phone: "9999994444"
  }
]

export default function Home() {
  return (
    <div>

      {/* HEADER */}
      <div style={{
        padding:"30px 40px",
        borderBottom:"1px solid #1a1a1a",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
        <h1 style={{
          fontSize:32,
          fontWeight:700,
          letterSpacing:1
        }}>
          Rewari Directory
        </h1>

        <input
          placeholder="Search business..."
          style={{
            background:"#111",
            border:"1px solid #222",
            padding:"12px 16px",
            borderRadius:12,
            color:"white",
            width:260
          }}
        />
      </div>


      {/* HERO */}
      <div style={{
        padding:"60px 40px",
        background:"linear-gradient(135deg,#0f0f0f,#050505)"
      }}>
        <h2 style={{
          fontSize:42,
          fontWeight:800,
          marginBottom:10
        }}>
          Discover Rewari Businesses
        </h2>

        <p style={{opacity:.7,fontSize:18}}>
          Premium verified city listings & sponsored ads
        </p>
      </div>


      {/* GRID */}
      <div style={{
        padding:40,
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
        gap:28
      }}>

        {businesses.map((b,i)=>(
          <div key={i} style={{
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:20,
            padding:24,
            backdropFilter:"blur(10px)",
            transition:"0.3s",
          }}>

            {b.sponsored && (
              <div style={{
                background:"gold",
                color:"black",
                padding:"4px 10px",
                borderRadius:999,
                fontSize:12,
                display:"inline-block",
                marginBottom:10,
                fontWeight:600
              }}>
                SPONSORED
              </div>
            )}

            <h3 style={{fontSize:22,fontWeight:700}}>
              {b.name}
            </h3>

            <div style={{
              opacity:.6,
              margin:"8px 0"
            }}>
              {b.category}
            </div>

            <div style={{opacity:.7}}>
              📍 {b.address}
            </div>

            <div style={{opacity:.7}}>
              📞 {b.phone}
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}
