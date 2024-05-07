"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminWrapper from "./AdminWrapper";
import { AdminHeader, Header } from "./headers";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { WagmiConfig, useAccount } from "wagmi";
import { Footer } from "~~/components/Footer";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  const { address } = useAccount();
  const path = usePathname();
  const isAdmin = path.split("/")[1] === "admin";
  const isRoot = path.split("/")[1] === "";

  const { data: ownerAddress } = useScaffoldContractRead({
    contractName: "ProdigiKill",
    functionName: "owner",
  });

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {isAdmin && ownerAddress && address && ownerAddress === address ? <AdminHeader /> : <Header />}
        <main className="relative flex flex-col flex-1">
          <AdminWrapper isRoot={isRoot} address={address} isAdmin={isAdmin} ownerAddress={ownerAddress}>
            {children}
          </AdminWrapper>
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  // const { resolvedTheme } = useTheme();
  // const isDarkMode = resolvedTheme === "dark";
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const subgraphUri = "https://api.studio.thegraph.com/query/64449/prodigikill/version/latest";
  const apolloClient = new ApolloClient({
    uri: subgraphUri,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={wagmiConfig}>
        <ProgressBar />
        <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          // theme={darkTheme()}
        >
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
};
