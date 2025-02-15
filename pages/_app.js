import "@/styles/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../redux/store";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </Provider>
    );
}