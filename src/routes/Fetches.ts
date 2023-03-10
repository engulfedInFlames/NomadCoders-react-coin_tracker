const BASE_URL = "https://api.coinpaprika.com/v1";
const HISTORY_BASE_URL = "https://ohlcv-api.nomadcoders.workers.dev?coinId";

export const fetchCoins = async () => {
  return await (await fetch(`${BASE_URL}/tickers`)).json();
};

export const fetchCoinTicker = async (coinId: string) => {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
};

export const fetchCoinInfo = async (coinId: string) => {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
};

export const fetchCoinHistory = async (coinId: string) => {
  return await (await fetch(`${HISTORY_BASE_URL}=${coinId}`)).json();
};
