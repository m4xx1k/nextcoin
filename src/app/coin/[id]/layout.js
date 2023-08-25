export async function generateMetadata(
  { params:{id} }
) {

	const headers = new Headers()
    headers.append('x-access-token', 'coinranking6a945e4fba09a8b24a410d03787b54f2ee68876e3f8197ea')
    const req = new Request(`https://api.coinranking.com/v2/coin/${id}`, {
        method: "GET",
        headers,
    });
    const product = await fetch(req).then((res) => res.json())
 
  return {
    title: product.data.coin.name,
    openGraph: {
      images: [product.data.coin.iconUrl],
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <>
      {children}
    </>
  )
}
