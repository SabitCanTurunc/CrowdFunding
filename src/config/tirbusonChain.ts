import { defineChain } from 'viem'
 
export const tirbusonChain = defineChain({
  id: 31337,
  name: 'Tirbuson',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:3002/'],
      webSocket: ['http://127.0.0.1:3002/'],
    },
  }
 
})