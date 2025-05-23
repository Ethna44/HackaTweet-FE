import '../styles/globals.css';
import Head from 'next/head';
import user from '../reducers/user'
import hashtag from '../reducers/hashtag'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
 reducer: {user, hashtag},
});

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
