import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { ShowcaseScene, MaterialType } from '@/data/showcase-scenes';
import * as THREE from 'three';

// 單條鋁合金條組件（含凹槽結構）
function AluminumRail({
  position,
  surfaceType,
  surfaceColor
}: {
  position: [number, number, number];
  surfaceType: 'ribbed' | 'fiber';
  surfaceColor: string;
}) {
  // 尺寸參數（單位：公尺）
  const railLength = 6.0;  // 6公尺長
  const railWidth = 0.05;   // 50mm寬
  const railHeight = 0.018; // 18mm高
  const grooveDepth = 0.011; // 凹槽深11mm
  const wallThickness = 0.002; // 側壁厚2mm

  // 鋁框顏色
  const aluminumColor = '#C0C0C0';

  return (
    <group position={position}>
      {/* 底板 */}
      <mesh receiveShadow castShadow position={[0, (railHeight - grooveDepth) / 2, 0]}>
        <boxGeometry args={[railWidth, railHeight - grooveDepth, railLength]} />
        <meshPhysicalMaterial
          color={aluminumColor}
          metalness={0.9}
          roughness={0.2}
          reflectivity={0.8}
        />
      </mesh>

      {/* 左側壁 */}
      <mesh receiveShadow castShadow position={[-railWidth/2 + wallThickness/2, railHeight/2 - grooveDepth/2, 0]}>
        <boxGeometry args={[wallThickness, grooveDepth, railLength]} />
        <meshPhysicalMaterial
          color={aluminumColor}
          metalness={0.9}
          roughness={0.2}
          reflectivity={0.8}
        />
      </mesh>

      {/* 右側壁 */}
      <mesh receiveShadow castShadow position={[railWidth/2 - wallThickness/2, railHeight/2 - grooveDepth/2, 0]}>
        <boxGeometry args={[wallThickness, grooveDepth, railLength]} />
        <meshPhysicalMaterial
          color={aluminumColor}
          metalness={0.9}
          roughness={0.2}
          reflectivity={0.8}
        />
      </mesh>

      {/* 表面模組 */}
      {surfaceType === 'ribbed' ? (
        // 細條狀刮泥面（橡膠肋條）
        <group position={[0, railHeight/2 + 0.002, 0]}>
          {Array.from({ length: 16 }).map((_, i) => {
            const ribWidth = 0.002;
            const ribHeight = 0.003;
            const spacing = (railWidth - wallThickness * 2) / 16;
            const xPos = -railWidth/2 + wallThickness + spacing * i + spacing/2;

            return (
              <mesh key={i} position={[xPos, 0, 0]} receiveShadow castShadow>
                <boxGeometry args={[ribWidth, ribHeight, railLength - 0.01]} />
                <meshPhysicalMaterial
                  color={surfaceColor}
                  metalness={0.1}
                  roughness={0.9}
                  clearcoat={0.3}
                />
              </mesh>
            );
          })}
        </group>
      ) : (
        // 纖維絨毛面
        <mesh position={[0, railHeight/2 + 0.001, 0]} receiveShadow castShadow>
          <boxGeometry args={[railWidth - wallThickness * 2 - 0.001, 0.004, railLength - 0.01]} />
          <meshPhysicalMaterial
            color={surfaceColor}
            metalness={0.05}
            roughness={0.95}
            clearcoat={0}
          />
        </mesh>
      )}
    </group>
  );
}

// 完整鋁合金地墊組件
function EntranceMat({ scene, material }: { scene: ShowcaseScene; material?: MaterialType }) {
  const groupRef = useRef<THREE.Group>(null);

  // 地墊整體參數
  const numRails = 7;  // 7條鋁條
  const railWidth = 0.05;  // 50mm
  const gapWidth = 0.0025; // 2.5mm間隙
  const totalWidth = numRails * railWidth + (numRails - 1) * gapWidth;

  // 根據場景和材質決定顏色配置
  const railConfigs = useMemo(() => {
    const configs = [];

    if (scene.matSystem.surface.includes('多色')) {
      // 多色配置
      configs.push(
        { type: 'fiber' as const, color: '#606060' }, // 灰
        { type: 'fiber' as const, color: '#8B4513' }, // 咖啡
        { type: 'ribbed' as const, color: '#1A1A1A' }, // 黑色刮泥
        { type: 'fiber' as const, color: '#B8382D' }, // 紅
        { type: 'fiber' as const, color: '#606060' }, // 灰
        { type: 'fiber' as const, color: '#8B4513' }, // 咖啡
        { type: 'ribbed' as const, color: '#1A1A1A' }  // 黑色刮泥
      );
    } else if (scene.matSystem.surface.includes('止滑膠條')) {
      // 全刮泥條配置
      for (let i = 0; i < numRails; i++) {
        configs.push({ type: 'ribbed' as const, color: '#1A1A1A' });
      }
    } else {
      // 單色纖維配置
      const color = material?.color || (
        scene.matSystem.surface.includes('灰色') ? '#808080' :
        scene.matSystem.surface.includes('黑色') ? '#2D2D2D' :
        scene.matSystem.surface.includes('棕') ? '#8B4513' : '#606060'
      );
      for (let i = 0; i < numRails; i++) {
        configs.push({ type: 'fiber' as const, color });
      }
    }

    return configs;
  }, [scene, material, numRails]);

  return (
    <group ref={groupRef}>
      {/* 鋁條陣列 */}
      {railConfigs.map((config, i) => {
        const xPos = -totalWidth / 2 + (railWidth / 2) + i * (railWidth + gapWidth);
        return (
          <AluminumRail
            key={i}
            position={[xPos, 0.009, 0]}
            surfaceType={config.type}
            surfaceColor={config.color}
          />
        );
      })}

      {/* 橡膠間隔條 */}
      {Array.from({ length: numRails - 1 }).map((_, i) => {
        const xPos = -totalWidth / 2 + railWidth + i * (railWidth + gapWidth) + gapWidth / 2;
        return (
          <mesh key={`gap-${i}`} position={[xPos, 0.009, 0]} receiveShadow>
            <boxGeometry args={[gapWidth, 0.016, 6.0]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.2} roughness={0.8} />
          </mesh>
        );
      })}

      {/* 前端收邊板 */}
      <mesh position={[0, 0.009, -3.02]} receiveShadow castShadow>
        <boxGeometry args={[totalWidth + 0.01, 0.003, 0.04]} />
        <meshPhysicalMaterial
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.2}
          reflectivity={0.8}
        />
      </mesh>

      {/* 後端收邊板 */}
      <mesh position={[0, 0.009, 3.02]} receiveShadow castShadow>
        <boxGeometry args={[totalWidth + 0.01, 0.003, 0.04]} />
        <meshPhysicalMaterial
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.2}
          reflectivity={0.8}
        />
      </mesh>

      {/* 螺絲孔（前端收邊板） */}
      {[-totalWidth/3, 0, totalWidth/3].map((xPos, i) => (
        <mesh key={`screw-front-${i}`} position={[xPos, 0.0105, -3.02]} castShadow>
          <cylinderGeometry args={[0.003, 0.003, 0.002, 16]} />
          <meshStandardMaterial color="#4A4A4A" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* 螺絲孔（後端收邊板） */}
      {[-totalWidth/3, 0, totalWidth/3].map((xPos, i) => (
        <mesh key={`screw-back-${i}`} position={[xPos, 0.0105, 3.02]} castShadow>
          <cylinderGeometry args={[0.003, 0.003, 0.002, 16]} />
          <meshStandardMaterial color="#4A4A4A" metalness={0.6} roughness={0.3} />
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
      <group position={[0, 2.5, -3.5]}>
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
      <mesh position={[0, 2, -3.35]} castShadow>
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
      <Canvas
        shadows
        dpr={[1, 2]}
        className="bg-gradient-to-b from-blue-50 to-white"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
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
          enableDamping={true}
          dampingFactor={0.05}
        />

        {/* 環境光 */}
        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.4} groundColor="#444444" />

        {/* 主光源 */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />

        {/* 補光 */}
        <pointLight position={[-5, 5, -5]} intensity={0.4} />
        <pointLight position={[5, 3, 5]} intensity={0.3} />

        {/* 主要地墊模型 */}
        <EntranceMat scene={scene} material={material} />

        {/* 建築環境 */}
        <BuildingEntrance scene={scene} />

        {/* 接觸陰影 */}
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.35}
          scale={15}
          blur={2.5}
          far={4}
        />

        {/* 網格輔助線 */}
        {showGrid && (
          <gridHelper args={[20, 20, '#666666', '#888888']} position={[0, -0.01, 0]} />
        )}

        {/* 尺寸標註 */}
        {showMeasurements && (
          <group>
            {/* 長度標註線 */}
            <mesh position={[0, 0.05, -3.2]}>
              <boxGeometry args={[0.4, 0.02, 0.02]} />
              <meshBasicMaterial color="#0066CC" />
            </mesh>
            <mesh position={[0, 0.05, 3.2]}>
              <boxGeometry args={[0.4, 0.02, 0.02]} />
              <meshBasicMaterial color="#0066CC" />
            </mesh>
            {/* 寬度標註線 */}
            <mesh position={[-0.2, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[6, 0.02, 0.02]} />
              <meshBasicMaterial color="#0066CC" />
            </mesh>
          </group>
        )}
      </Canvas>
    </div>
  );
}
