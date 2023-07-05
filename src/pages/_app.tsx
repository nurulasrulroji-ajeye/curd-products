import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Toaster
        containerStyle={{ position: 'absolute', top: 20, zIndex: 999999999 }}
      />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
