import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

export const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalNumberOfResults = jobItems.length;
  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);

  return [jobItems, isLoading, totalNumberOfResults] as const;
};

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.slice(1);
      setActiveId(id);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
};

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: string): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
  return data;
};

export const useJobItem = (id: string | null) => {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: Boolean(id),
    }
  );
  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
};

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};
