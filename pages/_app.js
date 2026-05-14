import '@/css/tailwind.css'
import '@/css/prism.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import ConsentWindowDecision from '../components/consentwindow'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

// Silence a noisy upstream warning from next/image 13.5 + React 18.3 about the
// `fetchPriority` prop. next/image emits the camelCase prop internally, but
// React 18.3 doesn't recognize it. Fixed in Next 14+ (vercel/next.js#65161).
// We patch console.error on both server (SSR) and client to suppress only this
// specific message. React formats warnings with `%s` placeholders, so the prop
// name lands in args[1] rather than args[0]. Remove this block when we upgrade
// Next.js.
if (isDevelopment) {
  const originalConsoleError = console.error
  console.error = (...args) => {
    const first = args[0]
    const isUnknownPropWarning =
      typeof first === 'string' &&
      first.includes('does not recognize the') &&
      first.includes('prop on a DOM element')
    if (isUnknownPropWarning && args.some((a) => a === 'fetchPriority')) {
      return
    }
    originalConsoleError(...args)
  }
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <Script
        id="google-adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7490174059724719"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Script
        id="buymeacoffee"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-name="BMC-Widget"
        data-cfasync="false"
        data-id="amrutprabhu"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#FFDD00"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
        strategy="afterInteractive"
      />

      {isDevelopment && isSocket && <ClientReload />}
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
      <ConsentWindowDecision />
    </ThemeProvider>
  )
}
