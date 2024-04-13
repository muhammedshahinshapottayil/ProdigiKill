import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/favicon.ico`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ProdigiKill",
    template: "Scaffold-ETH 2",
  },
  description: "ProdigiKill a self improvement platform",
  openGraph: {
    title: {
      default: "ProdigiKill",
      template: "Scaffold-ETH 2",
    },
    description: "ProdigiKill a self improvement platform",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
