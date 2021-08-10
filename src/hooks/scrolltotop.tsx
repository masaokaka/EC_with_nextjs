import { RefObject, useEffect, useState } from "react";

export interface State {
  x: number;
  y: number;
}

const useScroll = (ref: RefObject<HTMLElement>) => {
  // 座標初期位置を記録。
  const [scroll, setScroll] = useState<State>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handler = () => {
      if (ref.current) {
        setScroll({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    };

    if (ref.current) {
      // スクロールイベントが発生するたびにスクロールの座標を記録
      ref.current.addEventListener("scroll", handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      // スクロールイベントのイベントリスナーをクリーンアップする。
      if (ref.current) {
        ref.current.removeEventListener("scroll", handler);
      }
    };
  }, [ref]);

  return scroll;
};

export default useScroll;
