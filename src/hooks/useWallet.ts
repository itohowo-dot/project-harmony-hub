import { useState, useCallback } from "react";
import { MOCK_WALLET, type WalletState } from "@/lib/mock-data";

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({ ...MOCK_WALLET });

  const connect = useCallback(() => {
    setWallet((prev) => ({ ...prev, connected: true }));
  }, []);

  const disconnect = useCallback(() => {
    setWallet((prev) => ({ ...prev, connected: false }));
  }, []);

  const toggleWallet = useCallback(() => {
    setWallet((prev) => ({ ...prev, connected: !prev.connected }));
  }, []);

  return { wallet, connect, disconnect, toggleWallet };
}
