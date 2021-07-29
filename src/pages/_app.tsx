import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/organisms";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../store/app/store";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Head>
            <title>ラクラクカリー</title>
            <meta
              name="description"
              content="ラクラク社が販売するカレーをネットから簡単に注文できるWEBサイトです。"
            />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
