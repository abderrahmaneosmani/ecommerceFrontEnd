import "../styles/globals.css";
import Layout from "../components/layout/Layout";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { getUserId } from "../utils/getUserId";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
