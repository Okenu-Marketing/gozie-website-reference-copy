import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value: number) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300",
            glow && "opacity-100",
            disabled && "!hidden"
          )}
          style={{
            background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), ${
              variant === "white"
                ? "hsla(0,0%,100%,0.06)"
                : "hsla(var(--accent), 0.08)"
            }, transparent 40%)`,
          }}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowing-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient": variant === "white"
                ? `repeating-conic-gradient(
                    from calc(var(--start) * 1deg),
                    hsla(0,0%,100%,0.12) 0%,
                    hsla(0,0%,100%,0.12) 5%,
                    hsla(0,0%,100%,0.06) 10%,
                    hsla(0,0%,100%,0.06) 15%,
                    hsla(0,0%,100%,0.12) 20%
                  )`
                : `repeating-conic-gradient(
                    from calc(var(--start) * 1deg),
                    hsl(47,82%,53%) 0%,
                    hsl(35,90%,50%) 5%,
                    hsl(25,85%,45%) 10%,
                    hsl(47,82%,53%) 15%,
                    hsl(55,90%,60%) 20%
                  )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--active)] transition-opacity duration-300",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              border: "var(--glowing-border-width) solid transparent",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              backgroundImage: "var(--gradient)",
              backgroundAttachment: "fixed",
              backgroundSize: "calc(100% + 2 * var(--spread) * 1px) calc(100% + 2 * var(--spread) * 1px)",
            }}
          />
        </div>
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--active)] transition-opacity duration-300",
            blur > 0 && "blur-[var(--blur)]",
            disabled && "!hidden"
          )}
          style={{
            background: "var(--gradient)",
            backgroundAttachment: "fixed",
            backgroundSize: "calc(100% + 2 * var(--spread) * 1px) calc(100% + 2 * var(--spread) * 1px)",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            border: "var(--glowing-border-width) solid transparent",
          }}
        />
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
