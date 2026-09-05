import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface FireflyProps {
  isNight: boolean;
  reducedMotion: boolean;
}

export const Fireflies = ({ isNight, reducedMotion }: FireflyProps) => {
  const { size } = useThree();
  const fireflyRef = useRef<(THREE.Mesh)[]>([]);

  // Create firefly particles
  useEffect(() => {
    const count = reducedMotion ? 20 : 80;
    const geometry = new THREE.SphereGeometry(0.05, 6, 6);
    const material = new THREE.MeshBasicMaterial({
      color: isNight ? "#0ff" : "#ffd700",
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * size.width * 0.9,
        (Math.random() - 0.5) * size.height * 0.7,
        -10 + Math.random() * 10
      );
      // Brownian motion data
      mesh.userData = {
        originalPosition: mesh.position.clone(),
        speed: 0.01 + Math.random() * 0.02,
        direction: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          0
        ),
        pulsePhase: Math.random() * Math.PI * 2,
        baseOpacity: 0.8,
      };
      fireflyRef.current.push(mesh);
    }
  }, [size, isNight, reducedMotion]);

  // Animation loop
  useFrame((state: any) => {
    const { current: fireflies } = fireflyRef;
    const elapsed = state.clock?.elapsedTime || 0;

    fireflies.forEach((fly: any) => {
      const data = fly.userData;
      const time = elapsed;

      // Brownian motion with slight drift
      data.originalPosition.x += data.direction.x * data.speed * 10;
      data.originalPosition.y += data.direction.y * data.speed * 10;

      // Wrap around edges
      if (data.originalPosition.x > 5) data.originalPosition.x = -5;
      if (data.originalPosition.x < -5) data.originalPosition.x = 5;
      if (data.originalPosition.y > 4) data.originalPosition.y = -4;

      fly.position.copy(data.originalPosition);

      // Pulse effect - random bright pulses
      data.pulsePhase += 0.05;
      const pulse = 0.6 + 0.4 * Math.sin(data.pulsePhase);
      fly.material.opacity = data.baseOpacity * pulse;

      // Occasional bright burst on "touch"
      if (Math.random() < 0.005) {
        fly.material.opacity = 1;
        gsap.to(fly.material, {
          opacity: 0.5,
          duration: 1 + Math.random() * 2,
          delay: Math.random(),
        });
      }
    });
  });

  return null;
};