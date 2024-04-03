import React from 'react'
import {SorobanReactProvider} from '@soroban-react/core';
import {mainnet} from '@soroban-react/chains';
import {freighter} from '@soroban-react/freighter';
import type {ChainMetadata, Connector} from "@soroban-react/types";
import { xbull } from '@soroban-react/xbull';
      
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const chains: ChainMetadata[] = [mainnet];
const connectors: Connector[] = [freighter(), xbull()]


export default function MySorobanReactProvider({children}:{children: React.ReactNode}) {

    return (
      <SorobanReactProvider
        chains={chains}
        appName={"Stellar Export"}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        activeChain={mainnet}
        connectors={connectors}>
          {children}
      </SorobanReactProvider>
    )
  }