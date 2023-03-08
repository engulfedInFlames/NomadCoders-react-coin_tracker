import { createBrowserRouter } from "react-router-dom";
import { PageNotFound } from "../components/NotFound";
import Coin from "./Coin";
import Coins from "./Coins";
import Root from "./Root";

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
        errorElement: <PageNotFound />,
      },
    ],
    errorElement: <PageNotFound />,
  },
]);

export default MyRouter;
