import { toLower, toUpper } from 'lodash'
import { ERC20TokenModel, PoolModel } from '~/models/types'

export const PoolsAddress = {
  DEVIL3: '0x6ee86436ff740be0cca40017194e1ebb5481affa',
  ANGEL5: '0x430be1f946eb31e6839f62d72f7bca5ac2de250a',
  SCBX10: '0xe1ec4b06b5130583baad0de5ea46f68a697bc344'
} as const

export const ERC20TokenAddress: Record<string, string> = {
  DAI: '0xc0dd9dd1c257c307772f56a113b8596b5d9fa8f4',
  USDT: '0xf798ab74b66abb549a66d2fbdbc64249a5eb8479',
  WBTC: '0x30b02eb48a7800659159df464d36ffe40c79cc4d',
  AAVE: '0xf527a69c2ecad93e058f949ccd1fadcf4208bb9d',
  SUSHI: '0xe3048bcc1bdf677bf2565048e7d00e23bb5b6ab4',
  ETH: '0x8ce3e777982e9072c3450647b9e90f857f0a295f',
  TUSD: '0x8bbbf2ff31724b13d2ad1931a9f06d08b1f41872',
  USDC: '0x5abbc5d554dc8422c2f3e33a68244857a74f5e7b',
  sUSD: '0x9fa19fce6fb6d082f804d7370a95440f048a4084',
  BAT: '0x7847ab05437e92de34139e0d30b8c894888d0088',
  LINK: '0x88ddc9351a6abef9dd29390181165c4396193293',
  KNC: '0x59285bf68d524e8899011b1730b71776f9f3245c',
  MKR: '0x54e659c922ef57cdc19562676bc7d847759545ab',
  MANA: '0x01bc7e15aac43a2d081900fb94a0a20063d1c171',
  ZRX: '0xc60004884dca2801ce2f1c03ec263568dd46b541',
  SNX: '0x30843125c55513fbf6c40d81c5e5e61c00beaeb2',
  BUSD: '0x1c6371f8d7d23db6421801eef42a8b964cff489d',
  ENJ: '0x1dfd4fb7713c9970dcda8c24d8b4302706f0a705',
  REN: '0x85ed721a6eb2c57631f2a8a3bb47bd8821caa9f8',
  YFI: '0x65a9707981f50d1518d0d65fa58769ba321eb1a7',
  UNI: '0xb650dff349e94706aa05831dab49aa7ae16e1c64',
  CRV: '0xc7a981f09e8a6207b5fda31a55e8ef9ac8f9c469',
  BAL: '0x197640c2d424bbb0047782442e676d24411cac15',
  RAI: '0x11eb7954fe46c3c1cd813a57144af5ef09a2f181',
  COMP: '0xa63d9af55b7c09fdbfb6033927189362eb562adf',
  UST: '0xadf060e2b91ca2e3bd0adf2a281fd918d7703d6f',
  CREAM: '0x663f21b3c09668ed27bd4c3764ca656b09acfedb',
  MTA: '0x06ba6fb673a5665f48d7fca0acde2317b8447e59',
  FTX: '0x0a9e7bf0b3843cdf0af67450f832535682e3f2fc',
  $1INCH: '0xeeb1fc1014f5f312397be4489ec7e99b76aed89b'
} as const

export function getERC20TokenModelByAddress(addr: string): ERC20TokenModel {
  const key = toLower(addr)
  return { ...ERC20TokenModelsByAddress[key] }
}

export function getERC20AddressByName(name: string): string {
  return ERC20TokenAddress[name]
}

export function getPoolModelByName(name: string): ERC20TokenModel {
  const key = toLower(name)
  return { ...PoolsModelByAddress[key] }
}

const PoolsModelByAddress: Record<string, PoolModel> = {
  devil3: {
    name: 'DEVIL3',
    symbol: 'devil3',
    icon: '/coin_icon/DEVIL3.png',
    address: PoolsAddress.DEVIL3,
    description:
      'Focus on holding the new tokens that has high potential to growth.'
  },
  angel5: {
    name: 'ANGEL5',
    symbol: 'angel5',
    icon: '/coin_icon/ANGEL5.png',
    address: PoolsAddress.ANGEL5,
    description:
      'Focus on holding the large native platform tokens.'
  },
  scbx10: {
    name: 'SCBX10',
    symbol: 'scbx10',
    icon: '/coin_icon/SCBX10.png',
    address: PoolsAddress.SCBX10,
    description:
      'Focus on holding the tokens that use new innovation technology in defi and infrastructure.'
  }
}

const ERC20TokenModelsByAddress: Record<string, ERC20TokenModel> = {
  '0xc0dd9dd1c257c307772f56a113b8596b5d9fa8f4': {
    name: 'DAI',
    symbol: 'DAI',
    icon: '/coin_icon/DAI.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.DAI
  },
  '0xf798ab74b66abb549a66d2fbdbc64249a5eb8479': {
    name: 'USDT',
    symbol: 'USDT',
    icon: '/coin_icon/USDT.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.USDT
  },
  '0x30b02eb48a7800659159df464d36ffe40c79cc4d': {
    name: 'WBTC',
    symbol: 'WBTC',
    icon: '/coin_icon/WBTC.svg',
    usdRatio: 54781,
    address: ERC20TokenAddress.WBTC
  },
  '0xf527a69c2ecad93e058f949ccd1fadcf4208bb9d': {
    name: 'AAVE',
    symbol: 'AAVE',
    icon: '/coin_icon/AAVE.svg',
    usdRatio: 308.68,
    address: ERC20TokenAddress.AAVE
  },
  '0xe3048bcc1bdf677bf2565048e7d00e23bb5b6ab4': {
    name: 'SUSHI',
    symbol: 'SUSHI',
    icon: '/coin_icon/SUSHI.svg',
    usdRatio: 10.79,
    address: ERC20TokenAddress.SUSHI
  },
  '0x8ce3e777982e9072c3450647b9e90f857f0a295f': {
    name: 'ETH',
    symbol: 'ETH',
    icon: '/coin_icon/ETH.svg',
    usdRatio: 10.78,
    address: ERC20TokenAddress.ETH
  },
  '0x8bbbf2ff31724b13d2ad1931a9f06d08b1f41872': {
    name: 'TUSD',
    symbol: 'TUSD',
    icon: '/coin_icon/TUSD.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.TUSD
  },
  '0x5abbc5d554dc8422c2f3e33a68244857a74f5e7b': {
    name: 'USDC',
    symbol: 'USDC',
    icon: '/coin_icon/USDC.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.USDC
  },
  '0x9fa19fce6fb6d082f804d7370a95440f048a4084': {
    name: 'sUSD',
    symbol: 'sUSD',
    icon: '/coin_icon/sUSD.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.sUSD
  },
  '0x7847ab05437e92de34139e0d30b8c894888d0088': {
    name: 'BAT',
    symbol: 'BAT',
    icon: '/coin_icon/BAT.svg',
    usdRatio: 0.03,
    address: ERC20TokenAddress.BAT
  },
  '0x88ddc9351a6abef9dd29390181165c4396193293': {
    name: 'LINK',
    symbol: 'LINK',
    icon: '/coin_icon/LINK.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.LINK
  },
  '0x59285bf68d524e8899011b1730b71776f9f3245c': {
    name: 'KNC',
    symbol: 'KNC',
    icon: '/coin_icon/KNC.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.KNC
  },
  '0x54e659c922ef57cdc19562676bc7d847759545ab': {
    name: 'MKR',
    symbol: 'MKR',
    icon: '/coin_icon/KMR.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.MKR
  },
  '0x01bc7e15aac43a2d081900fb94a0a20063d1c171': {
    name: 'MANA',
    symbol: 'MANA',
    icon: '/coin_icon/MANA.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.MANA
  },
  '0xc60004884dca2801ce2f1c03ec263568dd46b541': {
    name: 'ZRX',
    symbol: 'ZRX',
    icon: '/coin_icon/ZRX.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.ZRX
  },
  '0x30843125c55513fbf6c40d81c5e5e61c00beaeb2': {
    name: 'SNX',
    symbol: 'SNX',
    icon: '/coin_icon/SNX.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.SNX
  },
  '0x1c6371f8d7d23db6421801eef42a8b964cff489d': {
    name: 'BUSD',
    symbol: 'BUSD',
    icon: '/coin_icon/BUSD.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.BUSD
  },
  '0x1dfd4fb7713c9970dcda8c24d8b4302706f0a705': {
    name: 'ENJ',
    symbol: 'ENJ',
    icon: '/coin_icon/ENJ.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.ENJ
  },
  '0x85ed721a6eb2c57631f2a8a3bb47bd8821caa9f8': {
    name: 'REN',
    symbol: 'REN',
    icon: '/coin_icon/REN.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.REN
  },
  '0x65a9707981f50d1518d0d65fa58769ba321eb1a7': {
    name: 'YFI',
    symbol: 'YFI',
    icon: '/coin_icon/YFI.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.YFI
  },
  '0xb650dff349e94706aa05831dab49aa7ae16e1c64': {
    name: 'UNI',
    symbol: 'UNI',
    icon: '/coin_icon/UNI.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.UNI
  },
  '0xc7a981f09e8a6207b5fda31a55e8ef9ac8f9c469': {
    name: 'CRV',
    symbol: 'CRV',
    icon: '/coin_icon/CRV.png',
    usdRatio: 1,
    address: ERC20TokenAddress.CRV
  },
  '0x197640c2d424bbb0047782442e676d24411cac15': {
    name: 'BAL',
    symbol: 'BAL',
    icon: '/coin_icon/BAL.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.BAL
  },
  '0x11eb7954fe46c3c1cd813a57144af5ef09a2f181': {
    name: 'RAI',
    symbol: 'RAI',
    icon: '/coin_icon/RAI.png',
    usdRatio: 1,
    address: ERC20TokenAddress.RAI
  },
  '0xa63d9af55b7c09fdbfb6033927189362eb562adf': {
    name: 'COMP',
    symbol: 'COMP',
    icon: '/coin_icon/COMP.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.COMP
  },
  '0xadf060e2b91ca2e3bd0adf2a281fd918d7703d6f': {
    name: 'UST',
    symbol: 'UST',
    icon: '/coin_icon/UST.png',
    usdRatio: 1,
    address: ERC20TokenAddress.UST
  },
  '0x663f21b3c09668ed27bd4c3764ca656b09acfedb': {
    name: 'CREAM',
    symbol: 'CREAM',
    icon: '/coin_icon/CREAM.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.CREAM
  },
  '0x06ba6fb673a5665f48d7fca0acde2317b8447e59': {
    name: 'MTA',
    symbol: 'MTA',
    icon: '/coin_icon/MTA.png',
    usdRatio: 1,
    address: ERC20TokenAddress.MTA
  },
  '0x0a9e7bf0b3843cdf0af67450f832535682e3f2fc': {
    name: 'FTX',
    symbol: 'FTX',
    icon: '/coin_icon/FTX.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.FTX
  },
  '0xeeb1fc1014f5f312397be4489ec7e99b76aed89b': {
    name: '1INCH',
    symbol: '1INCH',
    icon: '/coin_icon/1INCH.svg',
    usdRatio: 1,
    address: ERC20TokenAddress.$1INCH
  }
} as const
