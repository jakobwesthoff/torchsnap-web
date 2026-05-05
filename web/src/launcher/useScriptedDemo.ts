import { useEffect, useState } from "react";

import { SCENARIOS } from "./scenarios";

const WAIT_MS = 3000;
const POST_WIPE_PAUSE_MS = 250;
const TYPE_MIN_MS = 80;
const TYPE_MAX_MS = 140;

function randomTypeDelay() {
  return TYPE_MIN_MS + Math.random() * (TYPE_MAX_MS - TYPE_MIN_MS);
}

interface DemoState {
  input: string;
  scenarioIndex: number;
}

// Initial state matches the SSR'd first frame so React can hydrate
// without mismatch; the loop only starts after mount. Reduced-motion
// users keep that initial frame and never see the animation run.
export function useScriptedDemo() {
  const [state, setState] = useState<DemoState>({
    input: SCENARIOS[0].query,
    scenarioIndex: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function schedule(fn: () => void, ms: number) {
      timer = setTimeout(() => {
        timer = null;
        if (!cancelled) fn();
      }, ms);
    }

    function waitThenWipe(currentIndex: number) {
      schedule(() => wipeAndAdvance(currentIndex), WAIT_MS);
    }

    function wipeAndAdvance(currentIndex: number) {
      const nextIndex = (currentIndex + 1) % SCENARIOS.length;
      setState({ input: "", scenarioIndex: nextIndex });
      schedule(() => typeNext(nextIndex, 0), POST_WIPE_PAUSE_MS);
    }

    function typeNext(currentIndex: number, charsTyped: number) {
      const scenario = SCENARIOS[currentIndex];
      const next = charsTyped + 1;
      setState({
        input: scenario.query.slice(0, next),
        scenarioIndex: currentIndex,
      });
      if (next >= scenario.query.length) {
        waitThenWipe(currentIndex);
      } else {
        schedule(() => typeNext(currentIndex, next), randomTypeDelay());
      }
    }

    waitThenWipe(0);

    return () => {
      cancelled = true;
      if (timer !== null) clearTimeout(timer);
    };
  }, []);

  return {
    input: state.input,
    scenario: SCENARIOS[state.scenarioIndex],
  };
}
