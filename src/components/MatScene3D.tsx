import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Environment, ContactShadows, Text } from '@react-three/drei';
import { ShowcaseScene, MaterialType } from '@/data/showcase-scenes';
import * as THREE from 'three';

// 鋁合金地墊 3D 模型組件
function EntranceMat({ scene, material }: { scene: ShowcaseScene; material?: MaterialType }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // 地墊尺寸（公尺）
  const matWidth = 3; // 3公尺寬
  const matLength = 6; // 6公尺長
  const matDepth = parseFloat(scene.matSystem.depth) / 1000; // 轉換為公尺

  // 鋁框顏色
  const frameColor = scene.matSystem.frame.includes('不鏽鋼') ? '#E8E8E8' : '#C0C0C0';

  // 面料顏色
  const getSurfaceColor = () => {
    if (material) return material.color;
    if (scene.matSystem.surface.includes('灰色')) return '#808080';
    if (scene.matSystem.surface.includes('黑色')) return '#2D2D2D';
    if (scene.matSystem.surface.includes('多色')) return '#4A5568';
    if (scene.matSystem.surface.includes('止滑膠條')) return '#1A1A1A';
    return '#606060';
  };

  return (
    <group
      ref={groupRef}
      position={[0, matDepth / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.02 : 1}
    >
      {/* 鋁合金外框 */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[matWidth + 0.1, matDepth, matLength + 0.1]} />
        <meshStandardMaterial
          color={frameColor}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* 地墊面料 */}
      <mesh position={[0, matDepth * 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[matWidth - 0.05, matDepth * 0.6, matLength - 0.05]} />
        <meshStandardMaterial
          color={getSurfaceColor()}
          metalness={0.1}
          roughness={scene.matSystem.surface.includes('毛刷') ? 0.9 : 0.7}
        />
      </mesh>

      {/* 鋁條紋理（模擬多條鋁軌）*/}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -matWidth / 2 + (i * matWidth) / 20,
            matDepth * 0.5,
            0,
          ]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[0.05, matDepth * 0.1, matLength - 0.1]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* 標註文字 */}
      {hovered && (
        <Text
          position={[0, matDepth + 0.5, 0]}
          fontSize={0.3}
          color="#0066CC"
          anchorX="center"
          anchorY="middle"
        >
          {scene.name}
        </Text>
      )}
    </group>
  );
}

// 建築入口環境組件
function BuildingEntrance({ scene }: { scene: ShowcaseScene }) {
  return (
    <group>
      {/* 地板 */}
      <mesh position={[0, -0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color={scene.environment.floor.includes('大理石') ? '#F5F5F5' : '#D0D0D0'}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* 門框（簡化表示）*/}
      <group position={[0, 2.5, -3]}>
        {/* 左門柱 */}
        <mesh position={[-2, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 5, 0.3]} />
          <meshStandardMaterial color="#4A5568" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* 右門柱 */}
        <mesh position={[2, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 5, 0.3]} />
          <meshStandardMaterial color="#4A5568" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* 門楣 */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <boxGeometry args={[4.6, 0.4, 0.3]} />
          <meshStandardMaterial color="#4A5568" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>

      {/* 玻璃門（透明效果）*/}
      <mesh position={[0, 2, -2.85]} castShadow>
        <boxGeometry args={[4, 4, 0.1]} />
        <meshPhysicalMaterial
          color="#87CEEB"
          metalness={0.1}
          roughness={0.1}
          transmission={0.8}
          thickness={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// 人物模型（簡化表示）
function Person({ position, color }: { position: [number, number, number]; color: string }) {
  const personRef = useRef<THREE.Group>(null);
  const [direction] = useState(Math.random() > 0.5 ? 1 : -1);

  useFrame((state) => {
    if (personRef.current) {
      personRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.5) * direction;
    }
  });

  return (
    <group ref={personRef} position={position}>
      {/* 身體 */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.8, 4, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 頭部 */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FFD7B5" />
      </mesh>
    </group>
  );
}

// 主場景組件
interface MatScene3DProps {
  scene: ShowcaseScene;
  material?: MaterialType;
  showPeople?: boolean;
  showGrid?: boolean;
  showMeasurements?: boolean;
}

export default function MatScene3D({
  scene,
  material,
  showPeople = true,
  showGrid = false,
  showMeasurements = false,
}: MatScene3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows className="bg-gradient-to-b from-blue-50 to-white">
        {/* 相機設置 */}
        <PerspectiveCamera
          makeDefault
          position={scene.cameraPosition}
          fov={50}
        />

        {/* 軌道控制器 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2 - 0.1}
          target={[0, 0, 0]}
        />

        {/* 環境光 */}
        <ambientLight intensity={0.5} />

        {/* 主光源 */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* 補光 */}
        <pointLight position={[-5, 5, -5]} intensity={0.3} />
        <pointLight position={[5, 3, 5]} intensity={0.2} />

        {/* 環境貼圖 */}
        <Environment preset="city" />

        {/* 主要地墊模型 */}
        <EntranceMat scene={scene} material={material} />

        {/* 建築環境 */}
        <BuildingEntrance scene={scene} />

        {/* 接觸陰影 */}
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.4}
          scale={15}
          blur={2}
          far={4}
        />

        {/* 網格輔助線 */}
        {showGrid && (
          <Grid
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6B7280"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#374151"
            fadeDistance={25}
            fadeStrength={1}
            position={[0, -0.02, 0]}
          />
        )}

        {/* 人流動畫 */}
        {showPeople && (
          <>
            <Person position={[-1.5, 0, 4]} color="#3B82F6" />
            <Person position={[1.5, 0, 3]} color="#10B981" />
            <Person position={[0, 0, 5]} color="#F59E0B" />
          </>
        )}

        {/* 測量標註 */}
        {showMeasurements && (
          <group>
            {/* 寬度標註 */}
            <Text
              position={[-1.8, 0.1, -3.5]}
              fontSize={0.2}
              color="#0066CC"
              anchorX="center"
            >
              3.0m
            </Text>
            {/* 長度標註 */}
            <Text
              position={[3.5, 0.1, 0]}
              fontSize={0.2}
              color="#0066CC"
              anchorX="center"
              rotation={[0, -Math.PI / 2, 0]}
            >
              6.0m
            </Text>
            {/* 深度標註 */}
            <Text
              position={[3.8, 0.1, -3]}
              fontSize={0.15}
              color="#10B981"
              anchorX="center"
            >
              深度: {scene.matSystem.depth}
            </Text>
          </group>
        )}
      </Canvas>
    </div>
  );
}
