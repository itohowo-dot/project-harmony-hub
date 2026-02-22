import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CampaignCard } from "@/components/CampaignCard";
import { CampaignCardSkeleton } from "@/components/CampaignCardSkeleton";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useCampaigns } from "@/hooks/useCampaigns";
import { CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "successful", label: "Successful" },
  { value: "ending-soon", label: "Ending Soon" },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [tab, setTab] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  const { campaigns } = useCampaigns({ status: tab, category, search });

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [tab, category, search]);

  return (
    <PageWrapper>
      <section className="py-10 md:py-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold md:text-4xl">Explore Campaigns</h1>
            <p className="mt-1 text-muted-foreground">Discover projects shaping the Bitcoin ecosystem</p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-48 bg-card border-border/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-1 overflow-x-auto rounded-lg border border-border/50 bg-card/50 p-1">
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={cn(
                  "whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  tab === t.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <CampaignCardSkeleton key={i} />
              ))}
            </div>
          ) : campaigns.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {campaigns.slice(0, visibleCount).map((campaign, i) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <CampaignCard campaign={campaign} />
                  </motion.div>
                ))}
              </div>
              {visibleCount < campaigns.length && (
                <div className="mt-10 text-center">
                  <Button variant="outline" className="border-primary/30" onClick={() => setVisibleCount((v) => v + 8)}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No campaigns found matching your filters.</p>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Explore;
