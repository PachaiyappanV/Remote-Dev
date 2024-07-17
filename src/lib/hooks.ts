import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

//-----------------------------------Getting job items----------------------------//

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};
const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }
  const data = await response.json();
  return data;
};

export const useJobItems = (searchText: string) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: Boolean(searchText),
      retry: false,
    }
  );

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
    totalNumberOfResults: data?.jobItems.length,
  } as const;
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

//-----------------------------------Getting job item----------------------------//

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: string): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }
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
      retry: false,
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
