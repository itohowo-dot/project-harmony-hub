import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, Users, TrendingUp, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useCampaigns } from "@/hooks/useCampaigns";
import { formatBtc, formatUsd, getProgressPercent, truncateAddress } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const CampaignManage = () => {
  const { id } = useParams();
  const { getCampaignById } = useCampaigns();
  const campaign = getCampaignById(id || "");

  if (!campaign) {
    return (
      <PageWrapper>
        <div className="container py-20 text-center">
          <p className="text-lg text-muted-foreground">Campaign not found.</p>
          <Button asChild variant="outline" className="mt-4"><Link to="/dashboard">Back to Dashboard</Link></Button>
        </div>
      </PageWrapper>
    );
  }

  const progress = getProgressPercent(campaign.raisedAmount, campaign.goalAmount);

  return (
    <PageWrapper>
      <div className="container py-8 md:py-12">
        <Button asChild variant="ghost" size="sm" className="mb-6 gap-1 text-muted-foreground">
          <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>
        </Button>

        {/* Status Header */}
        <Card className="mb-8 border-border/50 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="font-heading text-xl font-bold">{campaign.title}</h1>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">{campaign.status}</Badge>
                  <span className="text-xs text-muted-foreground">{campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : "Ended"}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary font-mono-code">{formatBtc(campaign.raisedAmount)}</p>
                <p className="text-xs text-muted-foreground">of {formatBtc(campaign.goalAmount)} ({Math.round(progress)}%)</p>
              </div>
            </div>
            <div
              className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${campaign.title} funding progress`}
            >
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-honey-light transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start bg-card border border-border/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="backers">Backers</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Backers", value: campaign.backerCount, icon: Users },
                { label: "Raised", value: formatBtc(campaign.raisedAmount), icon: TrendingUp },
                { label: "Milestones Complete", value: `${campaign.milestones.filter((m) => m.completed).length}/${campaign.milestones.length}`, icon: CheckCircle2 },
              ].map((stat) => (
                <Card key={stat.label} className="border-border/50 bg-gradient-card">
                  <CardContent className="flex items-center gap-3 p-5">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-lg font-bold font-mono-code">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="mt-4">
            <Card className="border-border/50 bg-gradient-card">
              <CardContent className="p-6 space-y-4">
                {campaign.milestones.length > 0 ? campaign.milestones.map((m) => (
                  <div key={m.id} className="flex items-start gap-3 rounded-lg border border-border/30 bg-secondary/20 p-4">
                    {m.completed ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-success shrink-0" /> : <Circle className="mt-0.5 h-5 w-5 text-muted-foreground shrink-0" />}
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold">{m.title}</h4>
                      <p className="text-sm text-muted-foreground">{m.description}</p>
                    </div>
                    <span className="font-mono-code text-sm text-primary shrink-0">{formatBtc(m.amount)}</span>
                    {!m.completed && campaign.status === "active" && (
                      <Button variant="outline" size="sm" className="shrink-0 border-success/30 text-success">Complete</Button>
                    )}
                  </div>
                )) : <p className="text-muted-foreground">No milestones configured.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backers" className="mt-4">
            <Card className="border-border/50 bg-gradient-card">
              <CardContent className="p-6 space-y-3">
                {campaign.backers.length > 0 ? campaign.backers.map((b) => (
                  <div key={b.address} className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/20 p-3">
                    <div>
                      <p className="text-sm font-medium">{b.name}</p>
                      <p className="font-mono-code text-xs text-muted-foreground">{truncateAddress(b.address)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono-code text-sm text-primary">{formatBtc(b.amount)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(b.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                )) : <p className="text-muted-foreground">No backers yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="mt-4">
            <Card className="border-border/50 bg-gradient-card">
              <CardContent className="p-6 space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" className="gap-2 border-border/50 justify-start">
                    <Plus className="h-4 w-4" /> Add Milestone
                  </Button>
                  {campaign.status === "successful" && (
                    <Button className="gap-2 glow-amber justify-start">
                      <TrendingUp className="h-4 w-4" /> Claim Funds
                    </Button>
                  )}
                  {campaign.status === "failed" && (
                    <Button variant="destructive" className="gap-2 justify-start">
                      Enable Refunds
                    </Button>
                  )}
                  <Button variant="outline" className="gap-2 border-border/50 justify-start">
                    <Settings className="h-4 w-4" /> Campaign Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
};

export default CampaignManage;
