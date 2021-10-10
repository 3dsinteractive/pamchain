export interface ERC20TokenModel {
  name?: string
  symbol?: string
  balance?: string
  weight?: string
  icon?: string
  usdRatio?: number
  usdPrice?: number
  address?: string
  bound?: boolean
  denorm?: string
  desiredDenorm?: string
  index?: number
  lastDenormUpdate?: string
  length?: number
  ready?: boolean
  price?: string
}

export interface TradeTransactionModel {
  createdAt?: string
  tokenInAddress?: string
  tokenInAmount?: string
  to_logo?: string
  from?: string

  tokenOutAddress?: string
  tokenOutAmount?: string
  from_logo?: string
  to?: string
  tradeType?: string
  value?: string
  isGain?: boolean
  time?: string
}

export interface PoolModel {
  name?: string
  symbol?: string
  price?: string
  weight?: string
  icon?: string
  description?: string
  value?: number
  totalValue?: number
  address?: string
 
}