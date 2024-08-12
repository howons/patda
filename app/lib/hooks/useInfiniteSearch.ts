"use client";

import { useEffect, useState } from "react";
import type { Fetcher } from "swr";
import type { SWRInfiniteKeyLoader } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { useSearchStore } from "#lib/providers/SearchStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";
import type {
  InfinitePostsInfo,
  TroublemakerInfo,
} from "#lib/types/response.js";
import type { SearchState } from "#lib/types/state.js";

const DEBOUNCE_INTERVAL = 200;
const LIMIT = 10;

const getKey: (
  nickname: string,
  platform: Platform,
  isExclude?: boolean
) => SWRInfiniteKeyLoader<InfinitePostsInfo> =
  (nickname, platform, isExclude) => (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data) return null;

    const searchQuery = `nickname=${nickname}&platform=${platform}${isExclude ? "&exclude=1" : ""}`;

    if (pageIndex === 0 || !previousPageData)
      return `/api/v1/posts?${searchQuery}&limit=${LIMIT}`;

    return `/api/v1/posts?${searchQuery}&cursor=${previousPageData.nextCursor}&limit=${LIMIT}`;
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
  onChange?: () => void;
  isExclude?: boolean;
}

export default function useInfiniteSearch({
  onChange,
  isExclude,
}: UseInfiniteSearchProps) {
  const query = useSearchStore((state) => state.query);
  const platform = usePlatformStore((state) => state.platform);

  const [keyParams, setKeyParams] = useState<Parameters<typeof getKey>>([
    "",
    platform,
    isExclude,
  ]);
  const { data, isLoading, error, size, setSize } = useSWRInfinite<
    InfinitePostsInfo,
    Error
  >(getKey(...keyParams), fetcher);
  console.log(data, keyParams, isLoading, error?.cause);

  const state: SearchState = {
    status: getInfiniteStatus(isLoading, size, error, data),
    troublemakers: new Array<TroublemakerInfo>().concat(
      ...(data?.map((info) => info.data) ?? [])
    ),
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setKeyParams([query, platform, isExclude]);

      onChange?.();
    }, DEBOUNCE_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, platform, onChange, isExclude]);

  return {
    state,
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
