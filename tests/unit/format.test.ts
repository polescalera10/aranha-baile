import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatTime,
  WEEKDAYS,
  WEEKDAYS_SHORT,
  DANCE_ROLE_LABELS,
  ENROLLMENT_STATUS_LABELS,
} from "@/lib/format";

describe("formatTime", () => {
  it("recorta los segundos que devuelve Postgres", () => {
    expect(formatTime("20:00:00")).toBe("20:00");
    expect(formatTime("09:30:00")).toBe("09:30");
  });

  it("deja intacto un valor que ya viene en HH:MM", () => {
    expect(formatTime("18:45")).toBe("18:45");
  });
});

describe("formatDate", () => {
  it("formatea una fecha ISO en es-ES", () => {
    // Se comprueba por partes: el separador de mes varía según versión de ICU.
    const out = formatDate("2026-07-17");
    expect(out).toContain("17");
    expect(out).toContain("2026");
    expect(out.toLowerCase()).toContain("jul");
  });

  it("no se desplaza un día por zona horaria (se ancla a medianoche local)", () => {
    // Sin el 'T00:00:00' del helper, un runner en UTC+X restaría un día.
    expect(formatDate("2026-01-01")).toContain("1");
    expect(formatDate("2026-01-01")).toContain("2026");
    expect(formatDate("2026-12-31")).toContain("31");
  });
});

describe("WEEKDAYS", () => {
  it("respeta la convención del proyecto 1=Lunes … 7=Domingo", () => {
    expect(WEEKDAYS[1]).toBe("Lunes");
    expect(WEEKDAYS[7]).toBe("Domingo");
    expect(WEEKDAYS_SHORT[1]).toBe("Lun");
    expect(WEEKDAYS_SHORT[7]).toBe("Dom");
  });

  it("cubre los siete días sin huecos", () => {
    for (let d = 1; d <= 7; d += 1) {
      expect(WEEKDAYS[d]).toBeTruthy();
      expect(WEEKDAYS_SHORT[d]).toBeTruthy();
    }
    expect(Object.keys(WEEKDAYS)).toHaveLength(7);
  });
});

describe("etiquetas de enums", () => {
  it("traduce los roles de baile y los estados de matrícula", () => {
    expect(DANCE_ROLE_LABELS.leader).toBe("Leader");
    expect(DANCE_ROLE_LABELS.both).toBe("Ambos");
    expect(ENROLLMENT_STATUS_LABELS.lista_espera).toBe("Lista de espera");
  });
});
