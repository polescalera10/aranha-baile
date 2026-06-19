"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Retardo en segundos (para escalonar hermanos). */
  delay?: number;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Entrada sutil al hacer scroll: fade + leve translateY.
 * Respeta prefers-reduced-motion (entonces aparece sin desplazamiento).
 */
export function Reveal({ children, delay = 0, as = "div", ...props }: RevealProps) {
  const reduce = useReducedMotion();
  // motion[as] es una unión de componentes; las props que pasamos son de div.
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -7% 0px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
