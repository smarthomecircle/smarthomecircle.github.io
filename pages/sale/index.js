// Redirect /sale to AliExpress deals (no separate "All Sales" hub)
export async function getServerSideProps() {
  return { redirect: { destination: '/sale/aliexpress', permanent: false } }
}

export default function SaleRedirect() {
  return null
}
