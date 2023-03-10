import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTicker } from "./Fetches";

interface ICoinTicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: Date;
      percent_from_price_ath: number;
    };
  };
}

const Container = styled.div`
  width: 80%;
  height: 60vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  background-color: ${(props) => props.theme.itemBgColor};
  padding: 0 32px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 8px;
  border: 1px solid #cfd6e0;
  box-shadow: 0 1px 3px rgba(0 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
`;
const Loader = styled.span`
  display: block;
  font-size: 48px;
  font-style: italic;
  text-align: center;
`;
const Keys = styled.div`
  margin-left: 32px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
`;
const Key = styled.div`
  margin-bottom: 16px;
`;
const Values = styled.div``;
const Value = styled.div`
  margin-bottom: 16px;
`;

function Price() {
  const coinId = useOutletContext<string>();
  const { isLoading, data: tickerData } = useQuery<ICoinTicker>(
    ["tickerData", coinId],
    () => fetchCoinTicker(coinId)
  );
  const { max_supply, total_supply, quotes } = tickerData as ICoinTicker;
  console.log(quotes.USD.ath_date);
  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Keys>
            <Key>Max Supply :</Key>
            <Key>ATH Price : </Key>
            <Key>ATH Price : </Key>
            <Key>
              Market Cap Change <br />
              For 24H :{" "}
            </Key>
            <Key>Change For 15M : </Key>
            <Key>Change For 30M : </Key>
            <Key>Change For 01H : </Key>
            <Key>Change For 06H : </Key>
            <Key>Change For 12H : </Key>
            <Key>Change For 24H : </Key>
          </Keys>
          <Values>
            <Value>{max_supply === 0 ? "--" : 0}</Value>
            <Value>{quotes.USD.ath_price}</Value>
            <Value>{`${quotes.USD.ath_date}`}</Value>
            <Value>{quotes.USD.market_cap_change_24h}%</Value>
            <Value>{quotes.USD.percent_change_15m}%</Value>
            <Value>{quotes.USD.percent_change_30m}%</Value>
            <Value>{quotes.USD.percent_change_1h}%</Value>
            <Value>{quotes.USD.percent_change_6h}%</Value>
            <Value>{quotes.USD.percent_change_12h}%</Value>
            <Value>{quotes.USD.percent_change_24h}%</Value>
          </Values>
        </>
      )}
    </Container>
  );
}

export default Price;
