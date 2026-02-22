import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Eye, TrendingUp, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MOCK_CAMPAIGNS, formatBtc, getProgressPercent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MY_CAMPAIGN_IDS = ["1", "3", "5"];
const MY_CONTRIBUTION_IDS = ["2", "7", "8"];

const Dashboard = () => {
  const [tab, setTab] = useState<"campaigns" | "contributions">("campaigns");
  const myCampaigns = MOCK_CAMPAIGNS.filter((c) => MY_CAMPAIGN_IDS.includes(c.id));
  const myContributions = MOCK_CAMPAIGNS.filter((c) => MY_CONTRIBUTION_IDS.includes(c.id));

  const totalRaised = myCampaigns.reduce((s, c) => s + c.raisedAmount, 0);

  return (
    <PageWrapper>
      <div className="container py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold md:text-3xl">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Manage your campaigns and contributions</p>
          </div>
          <div className="flex gap-3">
            <Button asChild className="gap-2 glow-amber font-heading">
              <Link to="/create"><PlusCircle className="h-4 w-4" /> Create Campaign</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "Campaigns Created", value: myCampaigns.length.toString() },
            { label: "Total Raised", value: formatBtc(totalRaised) },
            { label: "Success Rate", value: `${Math.round((myCampaigns.filter((c) => c.status === "successful").length / Math.max(myCampaigns.length, 1)) * 100)}%` },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-border/50 bg-gradient-card">
                <CardContent className="p-5 text-center">
                  <p className="text-2xl font-bold text-primary font-mono-code">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border border-border/50 bg-card/50 p-1">
          {(["campaigns", "contributions"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors capitalize",
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              My {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-3">
          {(tab === "campaigns" ? myCampaigns : myContributions).map((campaign) => {
            const progress = getProgressPercent(campaign.raisedAmount, campaign.goalAmount);
            return (
              <Card key={campaign.id} className="border-border/50 bg-gradient-card">
                <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
                  <img src={campaign.imageUrl} alt={campaign.title} className="h-16 w-24 rounded-md object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-sm font-semibold truncate">{campaign.title}</h3>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0 text-xs",
                          campaign.status === "active" && "border-success/30 text-success",
                          campaign.status === "successful" && "border-primary/30 text-primary",
                          campaign.status === "failed" && "border-destructive/30 text-destructive"
                        )}
                      >
                        {campaign.status === "active" && <Clock className="mr-1 h-3 w-3" />}
                        {campaign.status === "successful" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {campaign.status === "failed" && <XCircle className="mr-1 h-3 w-3" />}
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary to-honey-light" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="font-mono-code text-xs text-primary shrink-0">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button asChild variant="outline" size="sm" className="border-border/50">
                      <Link to={`/campaign/${campaign.id}`}><Eye className="h-3.5 w-3.5" /></Link>
                    </Button>
                    {tab === "campaigns" && (
                      <Button asChild variant="outline" size="sm" className="border-primary/30 text-primary">
                        <Link to={`/campaign/${campaign.id}/manage`}>Manage</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
