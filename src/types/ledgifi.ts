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
  TRANSFER = "TRANSFER",
  TRADE = "TRADE",
  EXPENSE = "EXPENSE",
  INCOME = "INCOME"
}

export enum TxSubType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  INTEREST = "INTEREST",
  REWARD = "REWARD",
  AIRDROP = "AIRDROP",
  GIFT = "GIFT",
  STAKING = "STAKING",
  MINING = "MINING",
  FORK = "FORK",
  PAYMENT = "PAYMENT",
  REBATE = "REBATE",
  FEE = "FEE",
  LOST = "LOST",
  STOLEN = "STOLEN",
  DONATION = "DONATION",
  BUY = "BUY",
  SELL = "SELL",
  "N/A" = "N/A"
}
