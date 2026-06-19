"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

function diffParts(deadlineMs: number) {
  let diff = Math.max(0, deadlineMs - Date.now());
  const d = Math.floor(diff / 864e5);
  diff -= d * 864e5;
  const h = Math.floor(diff / 36e5);
  diff -= h * 36e5;
  const m = Math.floor(diff / 6e4);
  diff -= m * 6e4;
  const s = Math.floor(diff / 1e3);
  return { d, h, m, s };
}

const BOX =
  "flex-1 max-w-[96px] rounded-sm border border-gold/30 bg-gold/10 px-1.5 py-[13px] text-center";
const NUM = "font-display text-[clamp(30px,4vw,38px)] leading-none text-gold";
const UNIT = "mt-1.5 font-body text-[10px] tracking-[0.12em] text-[#b9a98a]";

/**
 * Cuenta atrás hasta la fecha límite de la tarifa fundadora.
 * Hidrata a 00 y arranca en cliente para evitar mismatch SSR.
 */
export function Countdown({ deadline }: { deadline: string }) {
  const deadlineMs = new Date(deadline).getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setT(diffParts(deadlineMs));
    const id = setInterval(() => setT(diffParts(deadlineMs)), 1000);
    return () => clearInterval(id);
  }, [deadlineMs]);

  const items: Array<[string, number]> = [
    ["DÍAS", t.d],
    ["HORAS", t.h],
    ["MIN", t.m],
    ["SEG", t.s],
  ];

  return (
    <div className="mt-3 flex justify-center gap-2" aria-live="off">
      {items.map(([unit, val]) => (
        <div key={unit} className={BOX}>
          <div className={NUM}>{pad(val)}</div>
          <div className={UNIT}>{unit}</div>
        </div>
      ))}
    </div>
  );
}
