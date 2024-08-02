import Footer from "@/components/footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="w-full min-h-screen flex flex-col [&>div]:flex-1 bg-rose-100">
        <Main />
        <Footer/>
        <NextScript />
      </body>
    </Html>
  );
}
