import { useLocation } from "react-router-dom";
import styled from "styled-components";

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
  height: 50vh;
  background-color: ${(props) => props.theme.itemBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 8px;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
`;

const Coin = () => {
  const {
    state: { coinName, coinSymbol },
  } = useLocation();
  return (
    <>
      <Title>{coinName}</Title>
      <Board></Board>
    </>
  );
};

export default Coin;
