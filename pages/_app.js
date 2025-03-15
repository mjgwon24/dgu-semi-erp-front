import "@/styles/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../redux/store";
import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    const getLayout = (Component.getLayout || ((page) => (
        <div className="flex min-h-screen">
            <div className="">
                <SideBarLayout />
            </div>
            <div className="flex-grow flex flex-col">
                <div className="">
                    <HeaderLayout />
                </div>
                <div className="flex-grow overflow-auto">
                    {page}
                </div>
            </div>
        </div>
    )));

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {getLayout(<Component {...pageProps} />)}
            </QueryClientProvider>
        </Provider>
    );
}
