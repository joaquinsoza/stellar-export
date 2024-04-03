export interface TransactionType {
  txType: TxType;
  txSubType?: TxSubType;
  timestamp: string;
  received?: string;
  receivedCurrency?: string;
  sent?: string;
  sentCurrency?: string;
  fee?: string;
  feeCurrency?: string;
  memo?: string;
  account?: string;
}

export enum TxType {
  TRANSFER,
  TRADE,
  EXPENSE,
  INCOME
}

export enum TxSubType {
  DEPOSIT,
  WITHDRAWAL,
  INTEREST,
  REWARD,
  AIRDROP,
  GIFT,
  STAKING,
  MINING,
  FORK,
  PAYMENT,
  REBATE,
  FEE,
  LOST,
  STOLEN,
  DONATION,
  BUY,
  SELL,
  "N/A",
}