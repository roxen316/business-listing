const data = [
  {
    name: "Rewari Hyundai",
    category: "Automobile",
    address: "Delhi Road",
    phone: "9999991111",
    ad: true
  },
  {
    name: "BMG Mall",
    category: "Shopping Mall",
    address: "Circular Road",
    phone: "9999992222",
    ad: true
  },
  {
    name: "Rao Tula Ram Hospital",
    category: "Hospital",
    address: "Model Town",
    phone: "9999993333"
  },
  {
    name: "Rewari Sweets House",
    category: "Restaurant",
    address: "Main Bazaar",
    phone: "9999994444"
  }
]

export default function Home() {
  return (
    <div style={{
      background:"#0a0a0a",
      color:"white",
      minHeight:"100vh",
      padding:"40px",
      fontFamily:"sans-serif"
    }}>
      <h1 style={{fontSize:"40px", marginBottom:"30px"}}>
        Rewari City Directory
      </h1>

      {data.map((b,i)=>(
        <div key={i} style={{
          border:"1px solid #333",
          padding:"20px",
          borderRadius:"16px",
          marginBottom:"20px",
          background:"#111"
        }}>
          {b.ad && <div style={{color:"gold"}}>Sponsored</div>}
          <h2>{b.name}</h2>
          <p>{b.category}</p>
          <p>{b.address}</p>
          <p>{b.phone}</p>
        </div>
      ))}
    </div>
  )
}
