import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./Fetchs";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
}

const Loader = styled.span`
  font-style: italic;
  font-size: 32px;
  text-align: center;
`;

const Title = styled.h1`
  width: 80%;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  padding: 48px 0;
  margin: 0 auto;
`;

const Board = styled.div`
  width: 80%;
  display: grid;
  grid-auto-flow: row;
  gap: 12px;
  justify-content: center;
  margin: 0 auto;
`;

const Coin = styled.div`
  cursor: pointer;
  width: 440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.itemBgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  border-radius: 8px;
  padding: 12px 8px;
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
  const { isLoading, data: allCoins } = useQuery<ICoin[]>(
    ["allCoins"],
    fetchCoins,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        console.log("Success to get data!");
      },
      select: (data) => data.slice(0, 50),
    }
  );

  return (
    <>
      <Title>Blazed Coin Tracker</Title>
      <Board>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          allCoins?.map((coin) => (
            <Link
              key={coin.id}
              to={`/${coin.id}`}
              state={{
                coinName: coin.name,
                coinSymbol: coin.symbol,
              }}
            >
              <Coin>
                <img
                  src={`https://cryptocurrencyliveprices.com/img/${coin["id"]}.png`}
                />
                <span>{coin["name"]}</span>
                <span>{coin["symbol"]}</span>
              </Coin>
            </Link>
          ))
        )}
      </Board>
    </>
  );
};

export default Coins;
