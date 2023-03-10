import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import MyRouter from "./routes/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={MyRouter} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
