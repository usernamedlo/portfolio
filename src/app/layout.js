import './globals.css'

export const metadata = {
  title: 'usernamedlo',
  description: 'usernamedlo\'s portfolio',
  image: 'https://usernamedlo.com/planet.png',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
