'use client';

import "@/styles/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../redux/store";
import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    const router = useRouter();

    const noLayoutRoutes = ["/login", "/signup", "/findPassword"];
    const isNoLayout = noLayoutRoutes.includes(router.pathname);

    const getDefaultLayout = (page) => (
        <div className="flex min-h-screen bg-gradient-to-b from-[#4A96EC] via-[#4A96EC] to-[#237BE6]">
            <div>
                <SideBarLayout />
            </div>
            <div className="flex-grow flex flex-col bg-[#FAFAFA] rounded-2xl my-5 mr-4">
                <div>
                    <HeaderLayout />
                </div>
                <div className="flex-grow overflow-auto px-3">
                    {page}
                </div>
            </div>
        </div>
    );

    const getLayout =
        Component.getLayout ||
        ((page) => (isNoLayout ? page : getDefaultLayout(page)));

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {getLayout(<Component {...pageProps} />)}
            </QueryClientProvider>
        </Provider>
    );
}