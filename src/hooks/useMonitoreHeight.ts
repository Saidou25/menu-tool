import { useEffect, useState } from "react";

type SampleMenuProps = {
  containerRef: React.RefObject<HTMLElement>;
  items: any[];
};

const useMonitorWidth = ({ items, containerRef }: SampleMenuProps) => {
  //   const [showDashboardMediaView, setShowDashboardMediaView] = useState(false);
  const [splitIndex, setSplitIndex] = useState<number | null>(null);
  useEffect(() => {
    console.log(containerRef)
    const checkHeight = () => {
      if (containerRef.current && items.length > 0) {
        // Prevents unnecessary checks
        const height = containerRef.current.clientHeight;
        if (height > 372) setSplitIndex(Math.ceil(items.length / 2));
      }
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [items, containerRef]);

  return { splitIndex };
};
export default useMonitorWidth;
