import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Hexagon, Wallet, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { useTheme } from "@/components/ThemeProvider";
import { truncateAddress, formatBtc } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { WalletModal } from "@/components/WalletModal";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/explore", label: "Explore" },
  { path: "/create", label: "Create" },
  { path: "/dashboard", label: "Dashboard" },
];

export function Header() {
  const { pathname } = useLocation();
  const { wallet, connect, disconnect } = useWallet();
  const { theme, toggleTheme } = useTheme();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Hexagon className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" fill="currentColor" strokeWidth={1.5} />
          <span className="font-heading text-xl font-bold text-gradient-amber">BitHive</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              aria-current={pathname === path ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.div>
          </Button>

          {/* Wallet Button */}
          <Button
            onClick={wallet.connected ? disconnect : () => setWalletModalOpen(true)}
            variant={wallet.connected ? "secondary" : "default"}
            className={cn(
              "gap-2 font-mono-code text-xs",
              !wallet.connected && "glow-amber"
            )}
            size="sm"
          >
            <Wallet className="h-4 w-4" />
            {wallet.connected ? (
              <span>
                {truncateAddress(wallet.address)}
                <span className="ml-2 text-primary">{formatBtc(wallet.balance)}</span>
              </span>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </div>
      </div>

      <WalletModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
        onConnect={connect}
      />
    </header>
  );
}
