import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/redux/store";
import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <div className="flex h-screen">
                    <div className="w-[12%] bg-gray-100">
                        <SideBarLayout />
                    </div>
                    <div className="flex-grow flex flex-col border-l-[1px] border-gray-300">
                        <div className="h-[10%]">
                            <HeaderLayout />
                        </div>
                        <div className="flex-grow">
                            <Component {...pageProps} />
                        </div>
                    </div>
                </div>
            </QueryClientProvider>
        </Provider>
    );
}
