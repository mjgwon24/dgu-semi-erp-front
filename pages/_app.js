import "@/styles/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../redux/store";
import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <div className="flex min-h-screen bg-gradient-to-b from-[#4A96EC] via-[#4A96EC] to-[#237BE6]">
                    <div className="">
                        <SideBarLayout />
                    </div>
                    <div className="flex-grow flex flex-col bg-[#FAFAFA] rounded-2xl my-5 mr-4">
                        <div className="">
                            <HeaderLayout />
                        </div>
                        <div className="flex-grow overflow-auto px-3">
                            <Component {...pageProps} />
                        </div>
                    </div>
                </div>
            </QueryClientProvider>
        </Provider>
    );
}
