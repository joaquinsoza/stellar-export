import { HomePageTitle } from '@/components/home/HomePageTitle'
import { CenterBody } from '@/components/layout/CenterBody'
import { Transactions } from '@/components/web3/Transactions'
import { ConnectButton } from '@/components/web3/ConnectButton'
import type { NextPage } from 'next'
import 'twin.macro'
import { Analytics } from "@vercel/analytics/react"

const HomePage: NextPage = () => {

  return (
    <>
      <Analytics />
      <CenterBody tw="mt-20 mb-10 px-5">
        <HomePageTitle />

        <ConnectButton />

        <div tw="mt-10 flex w-full flex-wrap items-start justify-center gap-4">
          <Transactions />
        </div>
      </CenterBody>
    </>
  )
}

export default HomePage
