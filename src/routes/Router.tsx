import { createBrowserRouter } from "react-router-dom";
import { ComponentNotFound, PageNotFound } from "../components/NotFound";
import Coin from "./Coin";
import Coins from "./Coins";
import Root from "./Root";
import Chart from "./Chart";
import Price from "./Price";

const MyRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
        errorElement: <PageNotFound />,
      },
      {
        path: "/:coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
            errorElement: <ComponentNotFound />,
          },
          {
            path: "price",
            element: <Price />,
            errorElement: <ComponentNotFound />,
          },
        ],
        errorElement: <PageNotFound />,
      },
    ],
    errorElement: <PageNotFound />,
  },
]);

export default MyRouter;
