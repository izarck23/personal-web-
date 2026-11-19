import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShowcaseCarousel({
  children,
  label,
  onSelect,
}: {
  children: ReactNode;
  label: string;
  onSelect?: (index: number) => void;
}) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const update = useCallback(() => {
    if (!api) return;
    const next = api.selectedScrollSnap();
    setSelected(next);
    setCount(api.scrollSnapList().length);
    setItems(api.slideNodes().length);
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
    onSelect?.(next);
  }, [api, onSelect]);
  useEffect(() => {
    if (!api) return;
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api, update]);
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="carousel-viewport" ref={ref}>
        <div className="carousel-track">{children}</div>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {label}: {items} items; position {selected + 1} of {count}
      </span>
      <div className="carousel-bottom">
        <Button
          variant="portfolioIcon"
          size="icon"
          disabled={!canPrev}
          aria-label={`Previous ${label}`}
          title={`Previous ${label}`}
          onClick={() => api?.scrollPrev()}
        >
          <ArrowLeft />
        </Button>
        <div className="carousel-dots" aria-hidden="true">
          {Array.from({ length: count }, (_, index) => (
            <span key={index} className={`carousel-dot ${index === selected ? "active" : ""}`} />
          ))}
        </div>
        <Button
          variant="portfolioIcon"
          size="icon"
          disabled={!canNext}
          aria-label={`Next ${label}`}
          title={`Next ${label}`}
          onClick={() => api?.scrollNext()}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
