import React, { useEffect, useState } from "react";
import clsx from "clsx";

type ScrollHintProps = {
  showMs?: number; // 全体の表示時間（ms）
  fadeMs?: number; // フェード時間（ms）
  storageKey?: string; // localStorageキー（テスト時に変えると再表示）
};

const ScrollHint: React.FC<ScrollHintProps> = ({
  showMs = 3000,
  fadeMs = 500,
  storageKey = "scrollHintShown",
}) => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // 表示開始
    setVisible(true);
    localStorage.setItem(storageKey, "true");

    // フェード開始タイマー（表示時間 - フェード時間）
    const fadeTimer = window.setTimeout(
      () => setFading(true),
      Math.max(0, showMs - fadeMs)
    );

    // 完全非表示タイマー
    const hideTimer = window.setTimeout(() => setVisible(false), showMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [showMs, fadeMs, storageKey]);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "md:hidden absolute top-2 left-1/2 -translate-x-1/2",
        "px-4 py-2 rounded-md flex items-center gap-2 mt-24",
        "bg-black bg-opacity-75 text-white text-sm",
        "transition-opacity duration-500", // フェード時間（Tailwind側）
        fading && "opacity-0"
      )}
    >
      <span className="whitespace-nowrap">横にスクロールできます</span>
      <span className="text-lg">➡️</span>
    </div>
  );
};

export default ScrollHint;
