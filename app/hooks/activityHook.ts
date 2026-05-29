import { useState, useEffect } from "react";
import type { ActivitySession } from "../types";
import { mockActivity } from "../data/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const BACKEND = import.meta.env.VITE_SERVER_URL;
export function useActivity(
  startWeek: string,
  endWeek: string
): { activity: ActivitySession[]; loading: boolean } {
  const [activity, setActivity] = useState<ActivitySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK) {
      setActivity(mockActivity);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    fetch(`${BACKEND}/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data: ActivitySession[]) => {
        setActivity(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [startWeek, endWeek]);

  return { activity, loading };
}