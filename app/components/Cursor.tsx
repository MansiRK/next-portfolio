"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e: { clientX: number; clientY: number; }) => {
      gsap.to(cursor, {
        x: e.clientX - 5,
        y: e.clientY - 5,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
  if (window.matchMedia("(hover: none)").matches) return;
}, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
