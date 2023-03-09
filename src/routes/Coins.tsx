import { useEffect, useState } from "react";
import styled from "styled-components";
import { isPropertySignature } from "typescript";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  quotes: {
    USD: {
      price: number;
    };
  };
}

const Title = styled.h1`
  width: 80%;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  padding: 48px 0;
  margin: 0 auto;
`;

const Board = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 56px;
  gap: 12px;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
`;

const Coin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.itemBgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 26px;
  border-radius: 8px;
  padding: 0 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  img {
    width: 36px;
  }
  &:hover {
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Coins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const fetchCoins = async () => {
    const coins = await (
      await fetch("https://api.coinpaprika.com/v1/tickers")
    ).json();
    setAllCoins(coins.slice(0, 100));
    console.log(allCoins);
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <>
      <Title>Blazed Coin Tracker</Title>
      <Board>
        {allCoins.map((coin) => (
          <Coin>
            <img
              src={`https://cryptocurrencyliveprices.com/img/${coin["id"]}.png`}
            />
            <span>{coin["name"]}</span>
            <span>{coin["symbol"]}</span>
          </Coin>
        ))}
      </Board>
    </>
  );
};

export default Coins;
