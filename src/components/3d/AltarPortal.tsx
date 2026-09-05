import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface AltarPortalProps {
  isNight: boolean;
}

// Crystal Frame component
const CrystalFrame = ({ isNight }: { isNight: boolean }) => {
  const { size } = useThree();
  const frameRef = useRef<THREE.Group>();

  useEffect(() => {
    const group = new THREE.Group();
    group.name = "crystal-frame";

    // Main crystal structure with refractive material
    const crystalGeometry = new THREE.SphereGeometry(3, 32, 32);
    const crystalMaterial = new THREE.MeshStandardMaterial({
      color: isNight ? "#ff00ff" : "#ff69b4",
      transparent: true,
      opacity: 0.5,
      metalness: 0.3,
      roughness: 0.4,
      side: THREE.DoubleSide,
    });

    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.position.y = 1;
    crystal.receiveShadow = true;
    crystal.castShadow = true;
    group.add(crystal);

    // Crystal points/spikes
    const spikeGeometry = new THREE.ConeGeometry(0.2, 1.5, 8);
    const spikeMaterial = new THREE.MeshStandardMaterial({
      color: isNight ? "#0ff" : "#ff1493",
      transparent: true,
      opacity: 0.7,
      metalness: 0.5,
      roughness: 0.3,
    });

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
      spike.position.set(Math.sin(angle) * 2.5, 2, Math.cos(angle) * 2.5);
      spike.rotation.z = angle;
      spike.castShadow = true;
      group.add(spike);
    }

    // Inner glowing core
    const coreGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: isNight ? "#00ffff" : "#ff69b4",
      transparent: true,
      opacity: 0.3,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.y = 1;
    group.add(core);

    group.userData = { isNight };
    frameRef.current = group;
  }, [isNight, size]);

  return null;
};

// Fog layer
const FogLayer = ({ isNight }: { isNight: boolean }) => {
  const { size } = useThree();
  const fogColor = isNight
    ? new THREE.Color(0x0a0a20)
    : new THREE.Color(0xf0f0ff);

  useEffect(() => {
    const scene = useThree().scene;
    scene.fog = new THREE.Fog(fogColor, 10, 50);
  }, [isNight, size]);

  return null;
};

// Altar portal component
const AltarPortal = ({ isNight }: AltarPortalProps) => {
  const { size } = useThree();
  const portalRef = useRef<THREE.Group>();

  useEffect(() => {
    const group = new THREE.Group();
    group.name = "altar-portal";
    group.position.y = -0.5;

    // Floating marble pedestal
    const pedestalGeometry = new THREE.CylinderGeometry(1.5, 1.8, 0.3, 32);
    const pedestalMaterial = new THREE.MeshStandardMaterial({
      color: isNight ? "#2c1a47" : "#d4a574",
      metalness: 0.4,
      roughness: 0.6,
    });
    const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestal.rotation.x = -Math.PI / 2;
    pedestal.castShadow = true;
    group.add(pedestal);

    // Crystal ball on pedestal
    const crystalBallGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const crystalBallMat = new THREE.MeshStandardMaterial({
      color: isNight ? "#0ff" : "#ff69b4",
      emissive: new THREE.Color(isNight ? "#0066ff" : "#ff3399"),
      emissiveIntensity: isNight ? 1.5 : 0.8,
      transparent: true,
      opacity: 0.7,
    });
    const crystalBall = new THREE.Mesh(crystalBallGeo, crystalBallMat);
    crystalBall.position.y = 1.2;
    crystalBall.castShadow = true;
    group.add(crystalBall);

    // Glowing runes around the ball
    const runeGeometry = new THREE.TorusGeometry(0.6, 0.08, 16, 32);
    for (let i = 0; i < 4; i++) {
      const rune = new THREE.Mesh(runeGeometry, crystalBallMat);
      rune.position.y = 1.3;
      rune.rotation.z = (i / 4) * Math.PI;
      group.add(rune);
    }

    group.userData = { isNight };
    portalRef.current = group;
  }, [isNight, size]);

  return null;
};

export { AltarPortal, CrystalFrame, FogLayer };