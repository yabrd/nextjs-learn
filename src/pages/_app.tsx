import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Navbar from "@/component/fragments/Navbar";
import Head from "next/head";

const disableNavbar = ['auth', 'admin'];

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const { pathname } = useRouter();
    return (
        <SessionProvider session={session}>
            <Head>
            <link href='https://cdn.boxicons.com/fonts/basic/boxicons.min.css' rel='stylesheet' />
            </Head>
            {!disableNavbar.includes(pathname.split('/')[1]) && <Navbar />}
            <Component {...pageProps} />
        </SessionProvider>
    )
}