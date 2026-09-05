import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { Fireflies } from "./Fireflies";
import { Creatures } from "./Creatures";
import { AltarPortal, FogLayer } from "./AltarPortal";

export const EnchantedScene = () => {
  const [isNight, setIsNight] = useState(false);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse = useRef({ x: 0, y: 0 });
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  // Initialize theme
  useEffect(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved) {
      setIsNight(saved === "night");
    } else {
      const systemNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsNight(systemNight);
    }
  }, []);

  const toggleNight = () => {
    setIsNight(!isNight);
    localStorage.setItem("theme-mode", isNight ? "day" : "night");
  };

  // Cursor-based parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouse.current = {
          x: (touch.clientX / window.innerWidth) * 2 - 1,
          y: -(touch.clientY / window.innerHeight) * 2 + 1,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Gyroscope for mobile
  useEffect(() => {
    if (!("DeviceOrientationEvent" in window)) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (prefersReducedMotion) return;
      const gamma = e.gamma;
      const beta = e.beta;

      if (gamma !== null && beta !== null) {
        gsap.to(cameraRef.current!.position, {
          x: (gamma / 90) * 2,
          y: -(beta / 90) * 2,
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [prefersReducedMotion]);

  // useFrame for smooth camera lerp - placed as child inside Canvas
  const cameraPositionLerp = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  useFrame((state: any) => {
    const elapsed = state.clock?.elapsedTime || 0;
    const camera = cameraRef.current;

    if (camera) {
      // Smooth lerp towards target based on mouse position
      const targetX = mouse.current.y * 0.8;
      const targetY = -mouse.current.x * 0.8;

      // Smooth damping
      cameraPositionLerp.current.targetX += (targetX - cameraPositionLerp.current.currentX) * 0.1;
      cameraPositionLerp.current.targetY += (targetY - cameraPositionLerp.current.currentY) * 0.1;

      camera.position.x = cameraPositionLerp.current.targetX;
      camera.position.y = cameraPositionLerp.current.targetY;

      // Keep camera looking at center
      camera.lookAt(0, 0, 0);

      // Gentle rotation based on time
      camera.rotation.y = elapsed * 0.02;
    }
  });

  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 0, 14], fov: 60 }}
      shadows
      className="relative"
    >
      {/* ============= DAY/NIGHT SKY ============= */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.8}
        castShadow
        color={isNight ? "hsl(260, 50%, 20%)" : "hsl(45, 60%, 40%)"}
      />
      <directionalLight
        position={[0, -10, 0]}
        intensity={0.5}
        color={isNight ? "hsl(260, 30%, 30%)" : "hsl(45, 30%, 60%)"}
      />

      {/* ============= CRYSTAL FRAME FOREGROUND ============= */}
      <AltarPortal isNight={isNight} />

      {/* ============= FOG / ATMOSPHERE ============= */}
      <FogLayer isNight={isNight} />

      {/* ============= FIREFLIES PARTICLE SYSTEM ============= */}
      <Fireflies isNight={isNight} reducedMotion={prefersReducedMotion} />

      {/* ============= ENCHANTED CREATURES (Day/Night) ============= */}
      <Creatures isNight={isNight} reducedMotion={prefersReducedMotion} />

      {/* ============= ORBIT CONTROLS (Desktop only) ============= */}
      {(!prefersReducedMotion && !isTouchDevice()) && <OrbitControls enableZoom={false} />}

      {/* ============= DAY/NIGHT TOGGLE HINT ============= */}
      <div
        className="fixed bottom-6 left-6 text-sm text-muted-foreground"
        style={{ transition: "color 0.5s" }}
      >
        {isNight ? "Click moon to switch to dawn" : "Click sun to switch to dawn"}
      </div>
    </Canvas>
  );
};

// Helper to detect touch devices
const isTouchDevice = () => {
  return (("ontouchstart" in window) || navigator.maxTouchPoints > 0);
};