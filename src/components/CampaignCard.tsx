import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Campaign, getProgressPercent, formatBtc } from "@/lib/mock-data";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = getProgressPercent(campaign.raisedAmount, campaign.goalAmount);
  const barRef = useRef<HTMLDivElement>(null);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          requestAnimationFrame(() => setAnimatedWidth(progress));
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [progress]);

  return (
    <Link to={`/campaign/${campaign.id}`}>
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 8px 30px hsl(43 96% 56% / 0.2)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
      <Card className="group overflow-hidden border-border/50 bg-gradient-card transition-colors duration-300 hover:border-primary/30">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <Badge
            className={cn(
              "absolute right-3 top-3 text-xs",
              campaign.status === "active" && "bg-success/20 text-success border-success/30",
              campaign.status === "successful" && "bg-primary/20 text-primary border-primary/30",
              campaign.status === "failed" && "bg-destructive/20 text-destructive border-destructive/30",
              campaign.status === "ended" && "bg-muted text-muted-foreground"
            )}
            variant="outline"
          >
            {campaign.status === "active" ? "Active" : campaign.status === "successful" ? "Funded" : campaign.status === "failed" ? "Failed" : "Ended"}
          </Badge>
        </div>

        <CardContent className="space-y-3 p-4">
          {/* Category */}
          <span className="text-xs font-medium text-primary">{campaign.category}</span>

          {/* Title */}
          <h3 className="font-heading text-base font-semibold leading-tight text-foreground line-clamp-2">
            {campaign.title}
          </h3>

          {/* Progress Bar */}
          <div className="space-y-1.5" ref={barRef}>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-honey-light"
                style={{
                  width: `${animatedWidth}%`,
                  transition: "width 800ms ease-out",
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono-code font-medium text-primary">{formatBtc(campaign.raisedAmount)}</span>
              <span className="text-muted-foreground">of {formatBtc(campaign.goalAmount)}</span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{campaign.backerCount} backers</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : "Ended"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </Link>
  );
}
