import { SessionProvider } from "next-auth/react";
import "../styles/globals.css"; // Adjust to your file paths

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
