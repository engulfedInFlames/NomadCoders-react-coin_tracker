import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "./Fetches";
import ApexChart from "react-apexcharts";

interface IHistoricalData {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

interface IDataset {
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
}

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Container = styled.div`
  width: 80%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.itemBgColor};
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 8px;
  border: 1px solid #cfd6e0;
  box-shadow: 0 1px 3px rgba(0 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
`;

const getChartData = (dataset: IDataset[]) => {
  const chartData = new Array();
  if (dataset) {
    dataset.forEach((data) => {
      const date = new Date(data.time_close * 1000);
      chartData.push({
        x: date.getTime(),
        y: [
          parseFloat(data.open),
          parseFloat(data.high),
          parseFloat(data.low),
          parseFloat(data.close),
        ],
      });
    });
  } else {
    for (let i = 0; i < 21; i++) {
      chartData.push({
        x: i + 1,
        y: [0, 0, 0, 0],
      });
    }
  }

  return chartData;
};

function Chart() {
  const coinId = useOutletContext<string>();
  const { isLoading: historyLoading, data: historicalData } = useQuery<
    IHistoricalData[]
  >(["historicalData", coinId], () => fetchCoinHistory(coinId));
  const chartData = getChartData(historicalData!);
  return (
    <Container>
      {historyLoading ? (
        <Loader>Chart Loading...</Loader>
      ) : (
        <ApexChart
          width={500}
          height={300}
          type="candlestick"
          series={[
            {
              name: "price",
              data: chartData,
            },
          ]}
          options={{
            chart: {
              height: 350,

              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              type: "datetime",
              labels: {
                show: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            grid: {
              show: false,
            },
          }}
        />
      )}
    </Container>
  );
}

export default Chart;
