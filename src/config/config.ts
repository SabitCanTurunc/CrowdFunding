import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { tirbusonChain } from './tirbusonChain'

export const config = createConfig({
  chains: [ sepolia,tirbusonChain],
  transports: {
    [sepolia.id]: http(),
    [tirbusonChain.id]: http(),

  },
})