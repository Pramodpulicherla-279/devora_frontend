import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars, Sparkles, Text, Billboard, Line } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Interactive tech node: a 3D shape with hover label ─── */
function TechNode({ position, color, label, icon, shape = 'icosa', delay = 0 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.35 + delay;
    meshRef.current.rotation.y = t * 0.45 + delay;
    const s = hovered ? 1.4 : 1;
    targetScale.set(s, s, s);
    meshRef.current.scale.lerp(targetScale, 0.12);
  });

  const geometry = {
    icosa:  <icosahedronGeometry args={[0.5, 0]} />,
    octa:   <octahedronGeometry args={[0.55, 0]} />,
    dodeca: <dodecahedronGeometry args={[0.5, 0]} />,
    tetra:  <tetrahedronGeometry args={[0.65, 0]} />,
    box:    <boxGeometry args={[0.75, 0.75, 0.75]} />,
    sphere: <sphereGeometry args={[0.5, 24, 24]} />,
  }[shape] || <icosahedronGeometry args={[0.5, 0]} />;

  return (
    <group position={position}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
          {geometry}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.3 : 0.6}
            roughness={0.2}
            metalness={0.8}
            flatShading
          />
        </mesh>

        {/* Glow halo when hovered */}
        {hovered && (
          <mesh>
            <sphereGeometry args={[0.95, 24, 24]} />
            <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
          </mesh>
        )}

        {/* Floating label — always faces camera, scales up on hover */}
        <Billboard position={[0, hovered ? 1.15 : 0.95, 0]} follow>
          <Text
            fontSize={hovered ? 0.32 : 0.24}
            color="#0f172a"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.022}
            outlineColor="#ffffff"
            outlineOpacity={0.95}
          >
            {`${icon}  ${label}`}
          </Text>
        </Billboard>
      </Float>
    </group>
  );
}

/* ─── Connecting beam between two points (subtle) ─── */
function ConnectionLine({ start, end, color }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  return (
    <Line
      points={points}
      color={color}
      lineWidth={1.2}
      transparent
      opacity={0.18}
      dashed={false}
    />
  );
}

/* ─── Central holographic core ─── */
function Core({ color, accent }) {
  const innerRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.4;
      innerRef.current.rotation.y = t * 0.25;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.18;
      wireRef.current.rotation.y = t * 0.22;
      const s = 1 + Math.sin(t * 1.5) * 0.06;
      wireRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.0}
          roughness={0.15}
          metalness={0.9}
          flatShading
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ─── Full scattered scene ─── */
function Scene({ color, accent, nodes }) {
  const SHAPES = ['icosa', 'octa', 'dodeca', 'tetra', 'box', 'sphere'];

  // Scatter nodes in 3D space (not just a flat ring)
  const placements = useMemo(() => {
    const count = nodes.length;
    return nodes.map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.PI / 6;
      const radius = 4.2 + (i % 2 === 0 ? 0.6 : -0.4);
      const yLift = ((i % 3) - 1) * 1.5;
      return {
        position: [Math.cos(angle) * radius, yLift, Math.sin(angle) * radius],
        shape: SHAPES[i % SHAPES.length],
      };
    });
  }, [nodes.length]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[6, 8, 6]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-6, -4, -3]} intensity={0.8} color={accent} />
      <pointLight position={[0, 0, 0]} intensity={1.2} color={color} distance={5} />

      <Stars radius={60} depth={25} count={2500} factor={3} fade speed={0.4} />
      <Sparkles count={100} scale={12} size={3.5} speed={0.35} opacity={0.55} color={accent} />

      <Core color={color} accent={accent} />

      {/* Subtle connection lines from each node to center */}
      {placements.map((p, i) => (
        <ConnectionLine key={`l-${i}`} start={[0, 0, 0]} end={p.position} color={accent} />
      ))}

      {placements.map((p, i) => (
        <TechNode
          key={i}
          position={p.position}
          shape={p.shape}
          color={nodes[i].color || (i % 2 === 0 ? color : accent)}
          label={nodes[i].label}
          icon={nodes[i].icon}
          delay={i * 0.5}
        />
      ))}
    </>
  );
}

export default function TrackScene3D({ color = '#6366f1', accent = '#a78bfa', nodes = [] }) {
  return (
    <div className="ts3d-canvas-wrap">
      <Canvas
        camera={{ position: [0, 1.2, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Scene color={color} accent={accent} nodes={nodes} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.6}
          enableDamping
          dampingFactor={0.06}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
