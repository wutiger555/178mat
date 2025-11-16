import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Environment, ContactShadows } from '@react-three/drei';
import { ShowcaseScene, MaterialType } from '@/data/showcase-scenes';
import * as THREE from 'three';

// 鋁合金地墊 3D 模型組件
function EntranceMat({ scene, material }: { scene: ShowcaseScene; material?: MaterialType }) {
  const groupRef = useRef<THREE.Group>(null);

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
    <group ref={groupRef} position={[0, matDepth / 2, 0]}>
      {/* 鋁合金外框 */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[matWidth + 0.1, matDepth, matLength + 0.1]} />
        <meshPhysicalMaterial
          color={frameColor}
          metalness={0.9}
          roughness={0.2}
          reflectivity={0.8}
          clearcoat={0.3}
        />
      </mesh>

      {/* 地墊面料 */}
      <mesh position={[0, matDepth * 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[matWidth - 0.05, matDepth * 0.6, matLength - 0.05]} />
        <meshPhysicalMaterial
          color={getSurfaceColor()}
          metalness={0.1}
          roughness={scene.matSystem.surface.includes('毛刷') ? 0.9 : 0.7}
          clearcoat={scene.matSystem.surface.includes('膠條') ? 0.5 : 0}
        />
      </mesh>

      {/* 鋁條紋理（模擬多條鋁軌）*/}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -matWidth / 2 + (i * matWidth) / 20 + 0.075,
            matDepth * 0.5,
            0,
          ]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[0.05, matDepth * 0.1, matLength - 0.1]} />
          <meshPhysicalMaterial
            color={frameColor}
            metalness={0.95}
            roughness={0.15}
            reflectivity={0.9}
          />
        </mesh>
      ))}
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
          transmission={0.9}
          thickness={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// 主場景組件
interface MatScene3DProps {
  scene: ShowcaseScene;
  material?: MaterialType;
  showGrid?: boolean;
  showMeasurements?: boolean;
}

export default function MatScene3D({
  scene,
  material,
  showGrid = false,
  showMeasurements = false,
}: MatScene3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} className="bg-gradient-to-b from-blue-50 to-white">
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
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
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

        {/* 尺寸標註（簡化版，避免 Text 組件問題）*/}
        {showMeasurements && (
          <group>
            {/* 寬度標註線 */}
            <mesh position={[0, 0.05, -3.2]}>
              <boxGeometry args={[3, 0.02, 0.02]} />
              <meshBasicMaterial color="#0066CC" />
            </mesh>
            {/* 長度標註線 */}
            <mesh position={[3.2, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[6, 0.02, 0.02]} />
              <meshBasicMaterial color="#0066CC" />
            </mesh>
          </group>
        )}
      </Canvas>
    </div>
  );
}
