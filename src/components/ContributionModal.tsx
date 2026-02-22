import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Campaign, formatBtc, formatUsd, BTC_USD_PRICE } from "@/lib/mock-data";
import { Loader2, CheckCircle2, XCircle, ExternalLink } from "lucide-react";

type TxState = "input" | "pending" | "success" | "error";

interface ContributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign;
}

export function ContributionModal({ open, onOpenChange, campaign }: ContributionModalProps) {
  const [amount, setAmount] = useState("0.1");
  const [txState, setTxState] = useState<TxState>("input");

  const numAmount = parseFloat(amount) || 0;
  const fee = numAmount * 0.025;
  const total = numAmount + fee;

  useEffect(() => {
    if (txState === "success") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#EAB308", "#F59E0B", "#FBBF24", "#FDE68A"],
      });
    }
  }, [txState]);

  // Handle contribution simulation
  const handleContribute = () => {
    setTxState("pending");
    setTimeout(() => {
      if (Math.random() > 0.15) {
        setTxState("success");
      } else {
        setTxState("error");
      }
    }, 3000);
  };

  const handleClose = () => {
    setTxState("input");
    setAmount("0.1");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-border/50 bg-card sm:max-w-md">
        {txState === "input" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading">Back This Project</DialogTitle>
              <DialogDescription>Contribute sBTC to "{campaign.title}"</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <label className="text-sm text-muted-foreground">Amount (sBTC)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 font-mono-code bg-secondary border-border/50"
                  step="0.01"
                  min="0.001"
                />
                <p className="mt-1 text-xs text-muted-foreground">≈ {formatUsd(numAmount)}</p>
              </div>
              <div className="space-y-2 rounded-lg border border-border/30 bg-secondary/30 p-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contribution</span>
                  <span className="font-mono-code">{formatBtc(numAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform fee (2.5%)</span>
                  <span className="font-mono-code">{formatBtc(fee)}</span>
                </div>
                <div className="border-t border-border/30 pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span className="font-mono-code text-primary">{formatBtc(total)}</span>
                </div>
              </div>
              <Button
                className="w-full glow-amber font-heading"
                size="lg"
                onClick={handleContribute}
                disabled={numAmount <= 0}
              >
                Confirm Contribution
              </Button>
            </div>
          </>
        )}

        {txState === "pending" && (
          <div className="py-8 text-center space-y-4">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <div>
              <h3 className="font-heading text-lg font-semibold">Transaction Pending</h3>
              <p className="mt-1 text-sm text-muted-foreground">Confirming on the Stacks blockchain...</p>
              <p className="mt-2 text-xs text-muted-foreground">Estimated time: 10-30 minutes</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
              <ExternalLink className="h-3.5 w-3.5" /> View on Explorer
            </Button>
          </div>
        )}

        {txState === "success" && (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <div>
              <h3 className="font-heading text-lg font-semibold">Contribution Successful! 🎉</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You've backed "{campaign.title}" with {formatBtc(numAmount)}
              </p>
            </div>
            <Button onClick={handleClose} className="font-heading">Done</Button>
          </div>
        )}

        {txState === "error" && (
          <div className="py-8 text-center space-y-4">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <div>
              <h3 className="font-heading text-lg font-semibold">Transaction Failed</h3>
              <p className="mt-1 text-sm text-muted-foreground">Something went wrong. Please try again.</p>
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={() => { setTxState("input"); }}>Try Again</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
