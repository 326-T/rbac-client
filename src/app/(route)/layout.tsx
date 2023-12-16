import ClientOnly from '../components/ClientOnly'
import DashBoardLayout from '../template/DashBoardLayout'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='jp'>
      <body>
        <ClientOnly>
          <DashBoardLayout>{children}</DashBoardLayout>
        </ClientOnly>
      </body>
    </html>
  )
}
