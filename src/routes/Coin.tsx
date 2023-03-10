import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTicker } from "./Fetches";

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

interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  open_source: boolean;
  started_at: Date;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: Date;
  last_data_at: Date;
}

interface IParams {
  coinId: string;
}
interface ILocation {
  state: {
    coinName: string;
    coinSymbol: string;
  };
}

const Title = styled.h1`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  padding: 48px 0;
  margin: 0 auto;
  margin-bottom: 32px;
`;

const Loader = styled.span`
  display: block;
  font-size: 48px;
  font-style: italic;
  text-align: center;
`;

const CoinLogo = styled.img`
  width: 36px;
  margin-right: 16px;
`;

const Board = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  align-items: center;
`;

const Overview = styled.div`
  width: 60%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.itemBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 8px;
  border: 1px solid #cfd6e0;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
`;

const ItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.itemBgColor};
  border-radius: 8px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  span {
    width: 100%;
    text-align: center;
    &:first-child {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
`;

const DescriptionWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ced6e0;
  border: 1px solid #747d8c;
  border-radius: 8px;
  p {
    width: 90%;
    line-height: 1.3;
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    font-weight: 500;
    padding: 20px 5px;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Tab = styled.div<{ isActive: Boolean }>`
  width: 100px;
  background-color: ${(props) => (props.isActive ? "#747d8c" : "#ced6e0")};
  color: ${(props) => (props.isActive ? "white" : props.theme.textColor)};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 12px 24px;
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 1px 3px rgba(0 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  transition: all 0.1s ease-in-out;
`;

const Coin = () => {
  const { coinId } = useParams<"coinId">() as IParams;
  const {
    state: { coinName, coinSymbol },
  } = useLocation() as ILocation;
  const { isLoading: tickerDataLoading, data: tickerData } =
    useQuery<ICoinTicker>(["tickerData", coinId], () =>
      fetchCoinTicker(coinId)
    );
  const { isLoading: infoDataLoading, data: infoData } = useQuery<ICoinInfo>(
    ["infoData", coinId],
    () => fetchCoinInfo(coinId)
  );
  const isLoading = tickerDataLoading && infoDataLoading;
  const priceMatch = useMatch(`/${coinId}/price`);
  const chartMatch = useMatch(`/${coinId}/chart`);
  return (
    <>
      <Title>
        <CoinLogo
          src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`}
        />
        {coinName} ({coinSymbol})
      </Title>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Board>
          <Overview>
            <ItemContainer>
              <Item>
                <span>RANK:</span>
                <span>{infoData?.rank}</span>
              </Item>
              <Item>
                <span>SYM:</span>
                <span>{infoData?.symbol}</span>
              </Item>
              <Item>
                <span>OPEN SOURCE:</span>
                <span>{String(infoData?.open_source).toUpperCase()}</span>
              </Item>
            </ItemContainer>
            <DescriptionWrapper>
              <p>{infoData?.description}</p>
            </DescriptionWrapper>
            <ItemContainer>
              <Item>
                <span>USD:</span>
                <span>{Number(tickerData?.quotes.USD.price).toFixed(8)}</span>
              </Item>
              <Item>
                <span>TOTAL SUPPLY:</span>
                <span>{tickerData?.total_supply}</span>
              </Item>
            </ItemContainer>
          </Overview>
          <Tabs>
            <Tab isActive={Boolean(chartMatch)}>
              <Link to="chart" state={{ coinName, coinSymbol }}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={Boolean(priceMatch)}>
              <Link to="price" state={{ coinName, coinSymbol }}>
                Price
              </Link>
            </Tab>
          </Tabs>
          <Outlet context={coinId} />
        </Board>
      )}
    </>
  );
};

export default Coin;
