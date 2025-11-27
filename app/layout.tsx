import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./redux/provider";
import Header from "./components/Header";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "REST Countries",
  description:
    "Frontend Mentor REST Countries API with color theme switcher challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} antialiased`}>
        <ReduxProvider>
          <Header />
          <div className="px-7">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
