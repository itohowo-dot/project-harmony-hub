import { Link, useLocation, useNavigate } from "react-router-dom";
import { Hexagon, Shield, Zap, Github } from "lucide-react";

export function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const scrollToHowItWorks = () => {
    if (pathname === "/") {
      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <footer className="border-t border-border/50 bg-card/30 pb-20 md:pb-0">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Hexagon className="h-6 w-6 text-primary" fill="currentColor" strokeWidth={1.5} />
              <span className="font-heading text-lg font-bold text-gradient-amber">BitHive</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The premier sBTC crowdfunding platform. Fund the future with Bitcoin.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/explore" className="hover:text-foreground transition-colors">Explore Campaigns</Link></li>
              <li><Link to="/create" className="hover:text-foreground transition-colors">Create Campaign</Link></li>
              <li><button onClick={scrollToHowItWorks} className="hover:text-foreground transition-colors">How It Works</button></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Smart Contracts</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">API Reference</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Trust */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-foreground">Security</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Secured by Bitcoin</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>Powered by Stacks</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Github className="h-4 w-4 text-primary" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © 2026 BitHive. Built on Stacks. Secured by Bitcoin.
        </div>
      </div>
    </footer>
  );
}
