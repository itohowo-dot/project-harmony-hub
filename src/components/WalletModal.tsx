import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, ExternalLink } from "lucide-react";

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

const WALLETS = [
  {
    name: "Leather Wallet",
    description: "Most popular Stacks wallet",
    icon: "🔶",
  },
  {
    name: "Xverse Wallet",
    description: "Mobile-first Bitcoin wallet",
    icon: "🟣",
  },
];

export function WalletModal({ open, onOpenChange, onConnect }: WalletModalProps) {
  const handleSelect = () => {
    onConnect();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border/50 bg-card">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Connect Your Wallet</DialogTitle>
          <DialogDescription>Choose a wallet to connect to BitHive</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-2">
          {WALLETS.map((wallet) => (
            <button
              key={wallet.name}
              onClick={handleSelect}
              className="flex w-full items-center gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4 text-left transition-colors hover:border-primary/30 hover:bg-secondary/50"
            >
              <span className="text-2xl">{wallet.icon}</span>
              <div className="flex-1">
                <p className="font-heading font-semibold text-foreground">{wallet.name}</p>
                <p className="text-sm text-muted-foreground">{wallet.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="mt-2 text-center">
          <a
            href="https://www.hiro.so/wallet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Don't have a wallet? Get Started <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
