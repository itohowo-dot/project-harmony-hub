import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { MOCK_WALLET, type WalletState } from "@/lib/mock-data";
import { toast } from "sonner";

interface WalletContextType {
  wallet: WalletState;
  connect: () => void;
  disconnect: () => void;
  toggleWallet: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({ ...MOCK_WALLET });

  const connect = useCallback(() => {
    setWallet((prev) => ({ ...prev, connected: true }));
    toast.success("Wallet connected", { description: "You're ready to fund and create campaigns" });
  }, []);

  const disconnect = useCallback(() => {
    setWallet((prev) => ({ ...prev, connected: false }));
    toast("Wallet disconnected");
  }, []);

  const toggleWallet = useCallback(() => {
    setWallet((prev) => {
      const next = !prev.connected;
      if (next) {
        toast.success("Wallet connected", { description: "You're ready to fund and create campaigns" });
      } else {
        toast("Wallet disconnected");
      }
      return { ...prev, connected: next };
    });
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, toggleWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
