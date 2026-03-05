import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Campaign, getProgressPercent, formatBtc } from "@/lib/mock-data";
import { Clock, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = getProgressPercent(campaign.raisedAmount, campaign.goalAmount);
  const barRef = useRef<HTMLDivElement>(null);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const hasAnimated = useRef(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(campaign.id);

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
    <Link to={`/campaign/${campaign.id}`} aria-label={campaign.title} className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
      <div>
      <Card className="group overflow-hidden border-border/50 bg-gradient-card transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(43_96%_56%/0.15)]">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(campaign.id);
            }}
            aria-label={saved ? "Remove from saved" : "Save campaign"}
            className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/60 backdrop-blur-sm border border-border/30 transition-colors hover:bg-card/80"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={saved ? "filled" : "empty"}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    saved ? "fill-primary text-primary" : "text-muted-foreground"
                  )}
                />
              </motion.div>
            </AnimatePresence>
          </button>

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
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${campaign.title} funding progress`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-honey-light"
                style={{
                  width: `${animatedWidth}%`,
                  transition: "width 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
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
      </div>
    </Link>
  );
}
