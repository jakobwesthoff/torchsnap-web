import {
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { CANDIDATES } from "./candidates";
import type { Candidate, DemoResult, Recognizer, Segment } from "./types";

const TOP_N = 3;

export function runScenarioMatch(
  input: string,
  recognizer: Recognizer,
): DemoResult[] {
  if (input.length === 0) return [];

  switch (recognizer) {
    case "fuzzy":
      return fuzzyMatch(input).map(matchToResult);
    case "url":
      return urlMatch(input);
    case "bang":
      return bangMatch(input);
  }
}

interface FuzzyMatch {
  candidate: Candidate;
  positions: number[];
  score: number;
}

function fuzzyMatch(query: string): FuzzyMatch[] {
  const matches: FuzzyMatch[] = [];
  for (const candidate of CANDIDATES) {
    const positions = subsequencePositions(query, candidate.title);
    if (positions === null) continue;
    matches.push({
      candidate,
      positions,
      score: scorePositions(positions, candidate.title) + candidate.score,
    });
  }
  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, TOP_N);
}

// Walks the text greedily consuming one query character at a time;
// returns the matched indices if the entire query was consumed in
// order, or null otherwise.
function subsequencePositions(query: string, text: string): number[] | null {
  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();
  const positions: number[] = [];
  let qi = 0;
  for (let i = 0; i < lowerText.length && qi < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[qi]) {
      positions.push(i);
      qi++;
    }
  }
  return qi === lowerQuery.length ? positions : null;
}

// Rewards matches that cluster (consecutive positions), that begin a
// word (preceded by a non-word character or text start), and that
// start near the beginning of the text.
function scorePositions(positions: number[], text: string): number {
  let score = 0;
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] === positions[i - 1] + 1) score += 10;
  }
  for (const p of positions) {
    if (p === 0 || /[\W_]/.test(text[p - 1])) score += 15;
  }
  if (positions.length > 0) score -= positions[0] * 0.5;
  return score;
}

function matchToResult({ candidate, positions }: FuzzyMatch): DemoResult {
  return {
    title: positionsToSegments(candidate.title, positions),
    subtitle: candidate.subtitle,
    icon: candidate.icon,
  };
}

function positionsToSegments(text: string, positions: number[]): Segment[] {
  const posSet = new Set(positions);
  const segments: Segment[] = [];
  let current = "";
  let inMatch = false;
  for (let i = 0; i < text.length; i++) {
    const isMatch = posSet.has(i);
    if (isMatch !== inMatch) {
      if (current.length > 0) {
        segments.push(inMatch ? { t: current, m: true } : { t: current });
      }
      current = "";
      inMatch = isMatch;
    }
    current += text[i];
  }
  if (current.length > 0) {
    segments.push(inMatch ? { t: current, m: true } : { t: current });
  }
  return segments;
}

const URL_TARGET = "westhoffswelt.de";

function urlMatch(input: string): DemoResult[] {
  if (input !== URL_TARGET) return [];
  return [
    {
      title: [
        {
          t: "Jakob Westhoff - Principal Distributed Systems Software Architect",
        },
      ],
      subtitle: `Open https://${URL_TARGET}`,
      icon: GlobeAltIcon,
    },
  ];
}

const BANG_PATTERN = /^(.+) !g$/;

function bangMatch(input: string): DemoResult[] {
  const m = BANG_PATTERN.exec(input);
  if (m === null) return [];
  const term = m[1];
  return [
    {
      title: [
        { t: "Open '" },
        { t: term },
        { t: "' in " },
        { t: "Google", m: true },
      ],
      subtitle: `https://www.google.com/search?q=${encodeURIComponent(term)}`,
      icon: MagnifyingGlassIcon,
    },
  ];
}
