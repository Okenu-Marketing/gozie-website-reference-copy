"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Starts tilted 40°, becomes perfectly flat (0°) when centered on screen
  const rotate = useTransform(scrollYProgress, [0, 1], [55, 0], { clamp: true });
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1], { clamp: true });
  const translateY = useTransform(scrollYProgress, [0, 1], [140, 0], { clamp: true });

  return (
    <div
      className="h-[50rem] sm:h-[52rem] md:h-[52rem] lg:h-[56rem] flex items-center justify-center relative p-2 md:p-10 lg:p-20"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{ perspective: "700px" }}
      >
        {titleComponent && <div className="max-w-5xl mx-auto text-center">{titleComponent}</div>}
        <Card rotate={rotate} scale={scale} translateY={translateY}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  translateY,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translateY: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        transformOrigin: "top center",
        transformStyle: "preserve-3d",
        rotateX: rotate,
        scale,
        y: translateY,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto h-[30rem] sm:h-[34rem] md:h-[36rem] lg:h-[34rem] w-[15rem] sm:w-[18rem] md:w-[32rem] lg:w-full lg:max-w-5xl border-4 border-accent p-1.5 sm:p-2 md:p-4 lg:p-6 bg-accent/25 rounded-[24px] sm:rounded-[28px] lg:rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-background md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
