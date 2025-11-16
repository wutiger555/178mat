import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { ShowcaseScene, MaterialType } from '@/data/showcase-scenes';
import * as THREE from 'three';

// 單條鋁合金細條（非常細密的一條）
// 鋁條方向：沿著出入口走動方向（從室外指向室內）
function AluminumBar({
  position,
  barLength,
  surfaceColor,
  isCarpet
}: {
  position: [number, number, number];
  barLength: number;
  surfaceColor: string;
  isCarpet: boolean;
}) {
  const barWidth = 0.012;   // 12mm 單條寬度（很細）
  const barHeight = 0.018;  // 18mm 高度
  const gapWidth = 0.003;   // 3mm 縫隙

  return (
    <group position={position}>
      {/* PVC底墊 */}
      <mesh receiveShadow position={[0, 0.0025, 0]}>
        <boxGeometry args={[barWidth, 0.005, barLength]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.9} />
      </mesh>

      {/* 鋁框 */}
      <mesh receiveShadow castShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[barWidth, 0.012, barLength]} />
        <meshPhysicalMaterial
          color="#B5B5B5"
          metalness={0.95}
          roughness={0.12}
          reflectivity={0.95}
          clearcoat={0.6}
        />
      </mesh>

      {/* 表面 */}
      {isCarpet ? (
        <mesh receiveShadow castShadow position={[0, 0.017, 0]}>
          <boxGeometry args={[barWidth * 0.9, 0.004, barLength - 0.01]} />
          <meshStandardMaterial color={surfaceColor} roughness={0.95} />
        </mesh>
      ) : (
        // 肋條表面
        <group position={[0, 0.017, 0]}>
          {Array.from({ length: Math.floor(barLength * 100) }).map((_, i) => {
            const ribZ = -barLength/2 + 0.01 + i * 0.01;
            return (
              <mesh key={i} position={[0, 0, ribZ]} receiveShadow castShadow>
                <boxGeometry args={[barWidth * 0.85, 0.003, 0.002]} />
                <meshStandardMaterial color={surfaceColor} roughness={0.88} />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
}

// 完整嵌入式鋁條地墊（密集細條，帶斜切角）
function EmbeddedEntranceMat({ surfaceType = 'carpet' }: { surfaceType?: 'carpet' | 'ribbed' }) {
  // 地墊尺寸（符合兩扇門寬度）
  const matWidth = 1.8;    // 1.8m 寬（約兩扇門寬度）
  const matDepth = 1.0;    // 1.0m 深（約1.5倍腳步深度）
  const numBars = 60;      // 60條細密鋁條
  const barWidth = 0.012;  // 12mm 單條
  const barGap = 0.003;    // 3mm 間隙

  // 左下角斜切角參數
  const chamferSize = 0.3; // 斜切30cm

  return (
    <group position={[0, 0, 0]}>
      {/* 密集鋁條陣列（沿Z方向排列，從室外指向室內）*/}
      {Array.from({ length: numBars }).map((_, i) => {
        const xPos = -matWidth/2 + (barWidth + barGap) * i + barWidth/2;

        // 左下角斜切：如果在左側且靠前，縮短長度
        let actualDepth = matDepth;
        let zOffset = 0;

        if (xPos < -matWidth/2 + chamferSize && i < numBars / 3) {
          const ratio = (xPos - (-matWidth/2)) / chamferSize;
          actualDepth = matDepth * (0.3 + 0.7 * ratio);
          zOffset = (matDepth - actualDepth) / 2;
        }

        const color = surfaceType === 'carpet' ?
          (i % 3 === 0 ? '#707070' : i % 3 === 1 ? '#8B4513' : '#606060') :
          '#1A1A1A';

        return (
          <AluminumBar
            key={i}
            position={[xPos, 0, zOffset]}
            barLength={actualDepth}
            surfaceColor={color}
            isCarpet={surfaceType === 'carpet'}
          />
        );
      })}

      {/* 黑色縫隙填充 */}
      {Array.from({ length: numBars - 1 }).map((_, i) => {
        const xPos = -matWidth/2 + (barWidth + barGap) * i + barWidth + barGap/2;
        return (
          <mesh key={`gap-${i}`} position={[xPos, 0.009, 0]} receiveShadow>
            <boxGeometry args={[barGap, 0.018, matDepth]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
          </mesh>
        );
      })}

      {/* 金屬收邊框 */}
      {/* 前邊 */}
      <mesh position={[0, 0.01, matDepth/2 + 0.01]} receiveShadow castShadow>
        <boxGeometry args={[matWidth + 0.04, 0.005, 0.02]} />
        <meshPhysicalMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* 後邊 */}
      <mesh position={[0, 0.01, -matDepth/2 - 0.01]} receiveShadow castShadow>
        <boxGeometry args={[matWidth + 0.04, 0.005, 0.02]} />
        <meshPhysicalMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* 左邊（帶斜切） */}
      <mesh position={[-matWidth/2 - 0.01, 0.01, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.02, 0.005, matDepth + 0.04]} />
        <meshPhysicalMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* 右邊 */}
      <mesh position={[matWidth/2 + 0.01, 0.01, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.02, 0.005, matDepth + 0.04]} />
        <meshPhysicalMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 完整室內入口場景組件
function IndoorEntranceScene() {
  // 尺寸參數
  const indoorFloorWidth = 5.0;   // 室內地板寬度 5m
  const indoorFloorDepth = 4.0;   // 室內地板深度 4m（從門口往室內）
  const outdoorFloorDepth = 1.5;  // 室外地面深度 1.5m

  const matWidth = 1.8;  // 地墊寬度 1.8m
  const matDepth = 1.0;  // 地墊深度 1.0m

  const doorWidth = 1.8;  // 落地玻璃門寬度（兩扇門）
  const doorHeight = 2.4; // 門高度

  return (
    <group>
      {/* === 室內木地板 === */}
      {/* 木地板主體 */}
      <mesh position={[0, 0, -matDepth/2 - indoorFloorDepth/2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[indoorFloorWidth, indoorFloorDepth]} />
        <meshPhysicalMaterial
          color="#C8A882"
          metalness={0.05}
          roughness={0.65}
          clearcoat={0.3}
        />
      </mesh>

      {/* 木板拼接縫（沿X方向的長條木板）*/}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={`wood-line-${i}`}
          position={[-indoorFloorWidth/2 + i * (indoorFloorWidth/15), 0.001, -matDepth/2 - indoorFloorDepth/2]}
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.005, indoorFloorDepth]} />
          <meshStandardMaterial color="#A08060" roughness={0.8} />
        </mesh>
      ))}

      {/* === 地墊嵌入凹槽 === */}
      <mesh position={[0, -0.005, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[matWidth + 0.1, matDepth + 0.1]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.95} />
      </mesh>

      {/* === 嵌入式鋁條地墊 === */}
      <EmbeddedEntranceMat surfaceType="carpet" />

      {/* === 室外水泥地面 === */}
      <mesh position={[0, -0.002, matDepth/2 + outdoorFloorDepth/2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[indoorFloorWidth, outdoorFloorDepth]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.1}
          roughness={0.85}
        />
      </mesh>

      {/* === 落地玻璃門系統 === */}
      <group position={[0, doorHeight/2, matDepth/2]}>
        {/* 左側門框 */}
        <mesh position={[-doorWidth/2, 0, 0]} castShadow>
          <boxGeometry args={[0.05, doorHeight, 0.08]} />
          <meshPhysicalMaterial
            color="#B8B8B8"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* 右側門框 */}
        <mesh position={[doorWidth/2, 0, 0]} castShadow>
          <boxGeometry args={[0.05, doorHeight, 0.08]} />
          <meshPhysicalMaterial
            color="#B8B8B8"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* 頂部門框 */}
        <mesh position={[0, doorHeight/2, 0]} castShadow>
          <boxGeometry args={[doorWidth + 0.1, 0.08, 0.08]} />
          <meshPhysicalMaterial
            color="#B8B8B8"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* 左側玻璃門扇（關閉狀態）*/}
        <mesh position={[-doorWidth/4, 0, -0.02]} castShadow receiveShadow>
          <boxGeometry args={[doorWidth/2 - 0.06, doorHeight - 0.08, 0.012]} />
          <meshPhysicalMaterial
            color="#D0E8F5"
            transmission={0.9}
            thickness={0.3}
            roughness={0.05}
            transparent
          />
        </mesh>

        {/* 右側玻璃門扇（微開）*/}
        <group position={[doorWidth/4, 0, -0.15]} rotation={[0, -0.3, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[doorWidth/2 - 0.06, doorHeight - 0.08, 0.012]} />
            <meshPhysicalMaterial
              color="#D0E8F5"
              transmission={0.9}
              thickness={0.3}
              roughness={0.05}
              transparent
            />
          </mesh>
        </group>

        {/* 門軌道 */}
        <mesh position={[0, -doorHeight/2 + 0.02, 0]} receiveShadow>
          <boxGeometry args={[doorWidth + 0.1, 0.04, 0.03]} />
          <meshPhysicalMaterial
            color="#A0A0A0"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* === 室內牆面（門框背後）=== */}
      <mesh position={[0, 1.5, matDepth/2 + 0.04]} receiveShadow>
        <planeGeometry args={[indoorFloorWidth, 3]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.85} />
      </mesh>

      {/* === 天花板（略微可見）=== */}
      <mesh position={[0, 3, -1]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[indoorFloorWidth, 3]} />
        <meshStandardMaterial color="#FAFAFA" roughness={0.9} />
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
        {/* 相機設置 - 室內俯視角度 */}
        <PerspectiveCamera
          makeDefault
          position={[0.4, 1.4, -2.5]}
          fov={55}
        />

        {/* 軌道控制器 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={5.0}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0.01, 0.2]}
          enableDamping={true}
          dampingFactor={0.1}
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

        {/* 室內入口場景（包含嵌入式地墊）*/}
        <IndoorEntranceScene />

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
