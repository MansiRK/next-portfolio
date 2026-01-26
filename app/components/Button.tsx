"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Button({
  text = "Hover Me",
  href = "#",
}) {
  const buttonRef = useRef(null);
  const flairRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current as HTMLElement | null;
    const flair = flairRef.current as HTMLElement | null;

    if (!button || !flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    const getXY = (e: { clientX: number; clientY: number; }) => {
      const { left, top, width, height } =
        button.getBoundingClientRect();

      return {
        x: gsap.utils.clamp(
          0,
          100,
          gsap.utils.mapRange(0, width, 0, 100, e.clientX - left)
        ),
        y: gsap.utils.clamp(
          0,
          100,
          gsap.utils.mapRange(0, height, 0, 100, e.clientY - top)
        ),
      };
    };

    const enter = (e: any) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);

      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const leave = (e: any) => {
      const { x, y } = getXY(e);

      gsap.killTweensOf(flair);

      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const move = (e: any) => {
      const { x, y } = getXY(e);

      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    button.addEventListener("mouseenter", enter);
    button.addEventListener("mouseleave", leave);
    button.addEventListener("mousemove", move);

    return () => {
      button.removeEventListener("mouseenter", enter);
      button.removeEventListener("mouseleave", leave);
      button.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <Link
      ref={buttonRef}
      href={href}
      className="button button--stroke xl:mt-10 lg:mt-10 md:mt-8 mt-10 inline-block"
    >
      <span ref={flairRef} className="button__flair" />
      <span className="button__label">{text}</span>
    </Link>
  );
}
