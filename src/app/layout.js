import './globals.css'

export const metadata = {
  title: 'usernamedlo',
  description: 'usernamedlo\'s portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
