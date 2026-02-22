import { useMemo } from "react";
import { MOCK_CAMPAIGNS, type Campaign } from "@/lib/mock-data";

export function useCampaigns(filters?: {
  status?: string;
  category?: string;
  search?: string;
  sort?: string;
}) {
  const campaigns = useMemo(() => {
    let result = [...MOCK_CAMPAIGNS];

    if (filters?.status && filters.status !== "all") {
      if (filters.status === "ending-soon") {
        result = result.filter((c) => c.status === "active" && c.daysLeft <= 7);
      } else {
        result = result.filter((c) => c.status === filters.status);
      }
    }

    if (filters?.category && filters.category !== "All") {
      result = result.filter((c) => c.category === filters.category);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case "most-funded":
          result.sort((a, b) => b.raisedAmount - a.raisedAmount);
          break;
        case "ending-soon":
          result.sort((a, b) => a.daysLeft - b.daysLeft);
          break;
        case "most-backers":
          result.sort((a, b) => b.backerCount - a.backerCount);
          break;
        case "newest":
        default:
          break;
      }
    }

    return result;
  }, [filters?.status, filters?.category, filters?.search, filters?.sort]);

  const getCampaignById = (id: string): Campaign | undefined =>
    MOCK_CAMPAIGNS.find((c) => c.id === id);

  const featuredCampaigns = useMemo(
    () => MOCK_CAMPAIGNS.filter((c) => c.status === "active").slice(0, 4),
    []
  );

  return { campaigns, getCampaignById, featuredCampaigns };
}
