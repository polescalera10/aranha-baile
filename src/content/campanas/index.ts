import { social } from "./social";
import { expresion } from "./expresion";
import { pareja } from "./pareja";
import { empezar } from "./empezar";
import { nivel } from "./nivel";
import type { CampanaDolorContent } from "./types";

export type { CampanaDolorContent } from "./types";

/** Mapa completo ICP → dolor → contenido. 5 ICPs × 6 dolores = 30 landings. */
export const campanas: Record<string, Record<string, CampanaDolorContent>> = {
  social,
  expresion,
  pareja,
  empezar,
  nivel,
};

export function getCampana(icp: string, dolor: string): CampanaDolorContent | undefined {
  return campanas[icp]?.[dolor];
}

/** Params para generateStaticParams: las 30 combinaciones ICP/dolor. */
export function listCampanaParams(): Array<{ icp: string; dolor: string }> {
  return Object.entries(campanas).flatMap(([icp, dolores]) =>
    Object.keys(dolores).map((dolor) => ({ icp, dolor })),
  );
}
