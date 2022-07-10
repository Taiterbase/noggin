import "../styles/globals.css";

import { RootLayout } from "layouts/root";
import { ReactNode } from "react";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page: ReactNode) => <RootLayout>{page}</RootLayout>);
    return getLayout(<Component {...pageProps} />);
}
