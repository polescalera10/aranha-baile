/**
 * Precios del curso regular — confirmado por Pol (julio 2026).
 *
 *   · 1 estilo: 35 €/mes
 *   · Cada estilo adicional: +20 €/mes
 *   · Tarifa plana (todos los estilos): 100 €/mes
 *
 * Fuente única: cualquier bloque de precios de la web lee de aquí.
 * NOTA: cuota mensual. La tarifa plana (100 €/mes) es el precio SIN promo de
 * fundador; la fundadora es 85 €/mes limitada a 10 plazas (ver landing.ts).
 */
export const precios = {
  base: 35, // 1 estilo
  estiloExtra: 20, // por cada estilo adicional
  flat: 100, // tarifa plana, todos los estilos
  periodo: "mes" as const,
} as const;

/** Precio de N estilos según el modelo (sin superar la tarifa plana). */
export function precioEstilos(n: number): number {
  if (n <= 0) return 0;
  return Math.min(precios.base + (n - 1) * precios.estiloExtra, precios.flat);
}

/**
 * Tres tarjetas de precio (el modelo real). Se muestran en la home (debajo del
 * founding, para que sobrevivan cuando se retire la promo) y en la landing de
 * clases. `prefijo` "+" marca el precio incremental por estilo extra.
 */
export const preciosTiers = [
  {
    estilos: "1 estilo",
    precio: precios.base,
    prefijo: "",
    nota: "Elige tu disciplina y ven cada semana a tu grupo por nivel.",
    destacado: false,
  },
  {
    estilos: "Cada estilo extra",
    precio: precios.estiloExtra,
    prefijo: "+",
    nota: "Suma los estilos que quieras. Combina, por ejemplo, salsa y bachata.",
    destacado: false,
  },
  {
    estilos: "Tarifa plana",
    precio: precios.flat,
    prefijo: "",
    nota: "Todos los estilos, sin límite. La mejor opción a partir de 4 estilos.",
    destacado: true,
  },
];
