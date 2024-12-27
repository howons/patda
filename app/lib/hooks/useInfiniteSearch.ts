"use client";

import { useEffect, useState } from "react";
import type { Fetcher } from "swr";
import type { SWRInfiniteKeyLoader } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import type {
  InfinitePostsInfo,
  TroublemakerInfo,
} from "#lib/types/response.js";
import type { SearchState } from "#lib/types/state.js";

const DEBOUNCE_INTERVAL = 200;
const LIMIT = 10;

const getKey: (
  url: string,
  queryKeyValues?: { [key: string]: string | null }
) => SWRInfiniteKeyLoader<InfinitePostsInfo> =
  (url, queryKeyValues) => (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data) return null;

    const searchQuery = Object.entries(queryKeyValues ?? {}).reduce(
      (acc, [key, value]) => (value ? `${acc}${key}=${value}&` : acc),
      ""
    );

    if (pageIndex === 0 || !previousPageData)
      return `${url}?${searchQuery}limit=${LIMIT}`;

    return `${url}?${searchQuery}cursor=${previousPageData.nextCursor}&limit=${LIMIT}`;
  };

const fetcher: Fetcher<InfinitePostsInfo, string> = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const cause = {
      info: await res.json(),
      status: res.status,
    };
    const error = new Error("An error occurred while fetching the data.", {
      cause,
    });

    throw error;
  }

  return res.json();
};

interface UseInfiniteSearchProps {
  url: string;
  queryKeyValues?: { [key: string]: string | null };
  onChange?: () => void;
}

export default function useInfiniteSearch({
  url,
  queryKeyValues,
  onChange,
}: UseInfiniteSearchProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(queryKeyValues);
  const { data, isLoading, error, size, setSize } = useSWRInfinite<
    InfinitePostsInfo,
    Error
  >(getKey(url, debouncedQuery), fetcher);

  const state: SearchState = {
    status: getInfiniteStatus(isLoading, size, error, data),
    troublemakers: new Array<TroublemakerInfo>().concat(
      ...(data?.map((info) => info.data) ?? [])
    ),
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setDebouncedQuery(queryKeyValues);

      onChange?.();
    }, DEBOUNCE_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onChange, queryKeyValues]);

  return {
    state,
    size,
    setSize,
  };
}

function getInfiniteStatus(
  isLoading: boolean,
  size: number,
  error: any,
  infiniteData?: InfinitePostsInfo[]
): SearchState["status"] {
  if (error) return "ERROR";

  const isLoadingMore =
    size > 0 && infiniteData && typeof infiniteData[size - 1] === "undefined";
  const isEmpty = infiniteData?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (infiniteData && infiniteData[infiniteData.length - 1].data.length < LIMIT);

  if (isLoading) return "LOADING";
  if (isLoadingMore) return "LOADING_MORE";
  if (isReachingEnd) return "END";
  return "READY";
}
