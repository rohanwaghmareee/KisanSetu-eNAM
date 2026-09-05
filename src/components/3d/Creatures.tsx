import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface CreatureProps {
  isNight: boolean;
  reducedMotion: boolean;
}

export const Creatures = ({ isNight, reducedMotion }: CreatureProps) => {
  const { size } = useThree();
  const creatureRef = useRef<(THREE.Mesh)[]>([]);

  useEffect(() => {
    const count = reducedMotion ? 5 : 25;
    const creatureColorNight = "#0ff";
    const creatureColorDay = "#ff69b4";

    for (let i = 0; i < count; i++) {
      // Determine creature type based on theme index
      const typeIndex = Math.floor((i / count) * 2);
      const isNightCreature = typeIndex === 1;
      const creatureColor = isNightCreature ? creatureColorNight : creatureColorDay;

      // Butterfly or hummingbird shape
      const geometry = new THREE.SphereGeometry(0.1, 12, 12);
      const material = new THREE.MeshBasicMaterial({
        color: creatureColor,
        transparent: true,
        opacity: 0.9,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Position in circular orbit
      const orbitRadius = 5 + Math.random() * 3;
      const orbitAngle = (i / count) * Math.PI * 2 + (isNightCreature ? Math.random() * Math.PI : 0);
      const height = 1 + Math.random() * 2;

      mesh.position.set(
        Math.cos(orbitAngle) * orbitRadius,
        height + Math.random(),
        Math.sin(orbitAngle) * orbitRadius
      );

      // Orbit parameters
      mesh.userData = {
        orbitAngle,
        orbitRadius,
        speed: 0.008 + Math.random() * 0.003,
        isButterfly: !isNightCreature,
        isNightCreature,
        pulsePhase: Math.random() * Math.PI * 2,
      };

      creatureRef.current.push(mesh);
    }
  }, [size, isNight, reducedMotion]);

  useFrame((state: any) => {
    const { current: creatures } = creatureRef;
    const elapsed = state.clock?.elapsedTime || 0;

    creatures.forEach((creature: any) => {
      const data = creature.userData;
      data.orbitAngle += data.speed;

      // Circular orbit update
      const orbitRadius = data.orbitRadius;
      const height = 1 + Math.random() * 2;

      creature.position.x = Math.cos(data.orbitAngle) * orbitRadius;
      creature.position.y = height;
      creature.position.z = Math.sin(data.orbitAngle) * orbitRadius;

      // Pulse effect
      data.pulsePhase += 0.1;
      const pulse = 0.8 + 0.3 * Math.sin(data.pulsePhase);
      creature.scale.setScalar(pulse);

      // Day: gentle flutter animation
      if (!data.isNightCreature) {
        creature.rotation.y += 0.02;
        creature.rotation.x = Math.sin(elapsed * 2) * 0.1;
      }

      // Night: subtle glow pulse
      if (data.isNightCreature) {
        const glowIntensity = 0.7 + 0.3 * Math.sin(data.pulsePhase);
        creature.material.opacity = 0.7 * glowIntensity;
      }

      // Interaction: occasional sparkle
      if (Math.random() < 0.003) {
        gsap.to(creature.scale, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 0.4,
          yoyo: true,
          repeat: 0,
        });
      }
    });
  });

  return null;
};