import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github-button.svg'
import type { FC } from 'react'
import 'twin.macro'
import tw, { styled } from 'twin.macro'

const StyledIconLink = styled(Link)(() => [
  tw`opacity-90 transition-all hover:(-translate-y-0.5 opacity-100)`,
])

export const HomePageTitle: FC = () => {
  const title = 'Stellar export'
  const desc = 'Export your stellar transactions POC'
  const githubHref = 'https://github.com/joaquinsoza/stellar-export/'

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono">
        {/* Logo & Title */}
        <Link
          href={githubHref}
          target="_blank"
          className="group"
          tw="flex cursor-pointer items-center gap-4 rounded-3xl py-1.5 px-3.5 transition-all hover:bg-gray-900"
        >
          {/* <Image src={inkathonLogo} priority width={60} alt="ink!athon Logo" /> */}
          <h1 tw="font-black text-[2.5rem]">{title}</h1>
        </Link>

        {/* Tagline & Links */}
        <p tw="mt-2 text-gray-600 text-sm">
          Created with {' '}
          <a
            href="https://github.com/paltalabs/create-soroban-dapp"
            target="_blank"
            tw="font-semibold text-gray-500 hover:text-gray-100"
          >
            Create Soroban dapp
          </a>{' '}
           boilerplate.
        </p>
        <p tw="mt-4 mb-6 text-gray-400">{desc}</p>

        <div tw="flex space-x-2">
          <StyledIconLink href={githubHref} target="_blank">
            <Image src={githubIcon as string} priority height={32} alt="Github Repository" />
          </StyledIconLink>
        </div>

        <div tw="my-14 w-14 bg-gray-800 h-[2px]" />
      </div>
    </>
  )
}
