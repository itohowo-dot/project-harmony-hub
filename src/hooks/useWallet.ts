import { useState, useCallback } from "react";
import { MOCK_WALLET, type WalletState } from "@/lib/mock-data";
import { toast } from "sonner";

export function useWallet() {
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

  return { wallet, connect, disconnect, toggleWallet };
}
