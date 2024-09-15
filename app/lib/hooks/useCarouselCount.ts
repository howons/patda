"use client";

import { useEffect, useState } from "react";

import type { CarouselApi } from "#components/ui/carousel.jsx";

export default function useCarouselCount() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return {
    setApi,
    current,
    count,
  };
}
