import AppProvider from 'hooks';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GlobalStyles } from 'styles';
import './_app.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AppProvider>
        <Head>
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
          <title>My Spotify</title>
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
};

export default MyApp;
