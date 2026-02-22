import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Hexagon, Shield, Zap, Eye, Wallet, PenTool, Rocket, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CampaignCard } from "@/components/CampaignCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useCampaigns } from "@/hooks/useCampaigns";
import { PLATFORM_STATS, formatBtc } from "@/lib/mock-data";

function CountUp({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="font-mono-code">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function FloatingHexagons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -15, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8 }}
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        >
          <Hexagon className="h-12 w-12 md:h-16 md:w-16" strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
}

const STEPS = [
  { icon: Wallet, title: "Connect", desc: "Link your Stacks wallet securely" },
  { icon: PenTool, title: "Create", desc: "Launch your campaign in minutes" },
  { icon: Eye, title: "Fund", desc: "Back projects with sBTC" },
  { icon: Rocket, title: "Succeed", desc: "Milestones unlock funds transparently" },
];

const TRUST = [
  { icon: Shield, title: "Secured by Bitcoin", desc: "Every transaction backed by Bitcoin's security" },
  { icon: Zap, title: "Instant Settlements", desc: "sBTC enables fast, low-cost transactions" },
  { icon: Eye, title: "Transparent Fees", desc: "On-chain accountability, no hidden costs" },
];

const Index = () => {
  const { featuredCampaigns } = useCampaigns();

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 honeycomb-bg">
        <FloatingHexagons />
        <div className="container relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">
              Fund the Future with{" "}
              <span className="text-gradient-amber">Bitcoin</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Back innovative projects with sBTC. Transparent milestones, on-chain accountability,
              and the security of the world's strongest blockchain.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="glow-amber gap-2 font-heading">
                <Link to="/explore">
                  Explore Campaigns <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 font-heading border-primary/30 hover:border-primary/60">
                <Link to="/create">
                  Create Campaign <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="border-y border-border/50 bg-card/30 py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { label: "Total Raised", value: PLATFORM_STATS.totalRaised, suffix: " sBTC", prefix: "" },
              { label: "Campaigns Funded", value: PLATFORM_STATS.totalCampaigns, suffix: "", prefix: "" },
              { label: "Success Rate", value: PLATFORM_STATS.successRate, suffix: "%", prefix: "" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="border-border/50 bg-gradient-card text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary md:text-4xl">
                      <CountUp end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">Featured Campaigns</h2>
              <p className="mt-1 text-sm text-muted-foreground">Trending projects backed by the community</p>
            </div>
            <Button asChild variant="ghost" className="gap-1 text-primary">
              <Link to="/explore">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCampaigns.map((campaign, i) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/50 bg-card/20 py-16 md:py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Four simple steps to fund the future</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                {i < STEPS.length - 1 && (
                  <div className="absolute right-0 top-8 hidden w-full translate-x-1/2 md:block">
                    <div className="h-px w-full bg-gradient-to-r from-primary/40 to-transparent" />
                  </div>
                )}
                <h3 className="mt-4 font-heading text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TRUST.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="border-border/50 bg-gradient-card">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-card/30 py-16 md:py-20">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Ready to <span className="text-gradient-amber">Build the Future</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Join hundreds of innovators funding projects with the power of Bitcoin.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="glow-amber gap-2 font-heading">
              <Link to="/create">Start Your Campaign <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Index;
