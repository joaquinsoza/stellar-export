import { BaseLayout } from '@/components/layout/BaseLayout'
import { HotToastConfig } from '@/components/layout/HotToastConfig'
import GlobalStyles from '@/styles/GlobalStyles'
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { Inconsolata } from 'next/font/google'
import Head from 'next/head'

import MySorobanReactProvider from "../components/web3/MySorobanReactProvider"

// Google Font(s) via `next/font`
const inconsolata = Inconsolata({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        defaultTitle="Stellar Export"
        titleTemplate=""
        description="Export your stellar transactions"
        openGraph={{
          type: 'website',
          locale: 'en',
          site_name: 'stellar-export',
          images: [
          ],
        }}
        twitter={{
          handle: '',
        }}
      />

      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* Set Font Variables */}
        <style>{`
          :root {
            --font-inconsolata: ${inconsolata.style.fontFamily}, 'Inconsolata';
          }
        `}</style>
      </Head>

      <MySorobanReactProvider>
        <CacheProvider value={cache}>
          <ChakraProvider>
            <DarkMode>
              <GlobalStyles />

              <BaseLayout>
                <Component {...pageProps} />
              </BaseLayout>

              <HotToastConfig />
            </DarkMode>
          </ChakraProvider>
        </CacheProvider>
      </MySorobanReactProvider>
    </>
  )
}

export default MyApp
