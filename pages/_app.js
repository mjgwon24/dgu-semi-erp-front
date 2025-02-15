import "@/styles/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../redux/store";  // ✅ store 경로 6-feature 기준 유지
import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <div className="flex h-screen">
                    <div className="w-[12%] bg-gray-100">
                        <SideBarLayout />  {/* ✅ Sidebar 유지 */}
                    </div>
                    <div className="flex-grow flex flex-col border-l-[1px] border-gray-300">
                        <div className="h-[10%]">
                            <HeaderLayout />  {/* ✅ Header 유지 */}
                        </div>
                        <div className="flex-grow">
                            <Component {...pageProps} />  {/* ✅ 6-feature 기반 유지 */}
                        </div>
                    </div>
                </div>
            </QueryClientProvider>
        </Provider>
    );
}