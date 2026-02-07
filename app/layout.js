export const metadata = {
  title: "Rewari Premium Directory"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{
        margin:0,
        background:"#050505",
        color:"#eaeaea",
        fontFamily:"Inter, sans-serif"
      }}>
        {children}
      </body>
    </html>
  )
}
