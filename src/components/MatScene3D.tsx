import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { ShowcaseScene, MaterialType } from '@/data/showcase-scenes';
import * as THREE from 'three';

// 單條鋁合金條組件（含凹槽結構）- 增強立體感版本
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
  const wallThickness = 0.003; // 側壁厚3mm（增加厚度以增強立體感）

  // 鋁框顏色 - 更有質感的銀灰色
  const aluminumColor = '#B8B8B8';

  return (
    <group position={position}>
      {/* 底板 - 增加倒角效果 */}
      <mesh receiveShadow castShadow position={[0, (railHeight - grooveDepth) / 2, 0]}>
        <boxGeometry args={[railWidth, railHeight - grooveDepth, railLength]} />
        <meshPhysicalMaterial
          color={aluminumColor}
          metalness={0.95}
          roughness={0.15}
          reflectivity={0.9}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 左側壁 - 增強立體感 */}
      <mesh receiveShadow castShadow position={[-railWidth/2 + wallThickness/2, railHeight/2 - grooveDepth/2, 0]}>
        <boxGeometry args={[wallThickness, grooveDepth, railLength]} />
        <meshPhysicalMaterial
          color={aluminumColor}
          metalness={0.95}
          roughness={0.15}
          reflectivity={0.9}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 右側壁 - 增強立體感 */}
      <mesh receiveShadow castShadow position={[railWidth/2 - wallThickness/2, railHeight/2 - grooveDepth/2, 0]}>
        <boxGeometry args={[wallThickness, grooveDepth, railLength]} />
        <meshPhysicalMaterial
          color={aluminumColor}
          metalness={0.95}
          roughness={0.15}
          reflectivity={0.9}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 側壁頂部邊緣 - 增加細節 */}
      <mesh receiveShadow castShadow position={[-railWidth/2 + wallThickness/2, railHeight/2, 0]}>
        <boxGeometry args={[wallThickness, 0.001, railLength]} />
        <meshPhysicalMaterial
          color="#D0D0D0"
          metalness={1.0}
          roughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
      <mesh receiveShadow castShadow position={[railWidth/2 - wallThickness/2, railHeight/2, 0]}>
        <boxGeometry args={[wallThickness, 0.001, railLength]} />
        <meshPhysicalMaterial
          color="#D0D0D0"
          metalness={1.0}
          roughness={0.1}
          reflectivity={1.0}
        />
      </mesh>

      {/* 表面模組 */}
      {surfaceType === 'ribbed' ? (
        // 細條狀刮泥面（橡膠肋條）
        <group position={[0, railHeight/2 + 0.002, 0]}>
          {Array.from({ length: 16 }).map((_, i) => {
            const ribWidth = 0.002;
            const ribHeight = 0.004; // 增加高度
            const spacing = (railWidth - wallThickness * 2) / 16;
            const xPos = -railWidth/2 + wallThickness + spacing * i + spacing/2;

            return (
              <mesh key={i} position={[xPos, 0, 0]} receiveShadow castShadow>
                <boxGeometry args={[ribWidth, ribHeight, railLength - 0.01]} />
                <meshPhysicalMaterial
                  color={surfaceColor}
                  metalness={0.15}
                  roughness={0.85}
                  clearcoat={0.4}
                  clearcoatRoughness={0.3}
                />
              </mesh>
            );
          })}
        </group>
      ) : (
        // 纖維絨毛面
        <mesh position={[0, railHeight/2 + 0.001, 0]} receiveShadow castShadow>
          <boxGeometry args={[railWidth - wallThickness * 2 - 0.001, 0.005, railLength - 0.01]} />
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

      {/* 前端收邊板 - 增強立體感 */}
      <mesh position={[0, 0.01, -3.02]} receiveShadow castShadow>
        <boxGeometry args={[totalWidth + 0.01, 0.005, 0.04]} />
        <meshPhysicalMaterial
          color="#B8B8B8"
          metalness={0.95}
          roughness={0.15}
          reflectivity={0.9}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 後端收邊板 - 增強立體感 */}
      <mesh position={[0, 0.01, 3.02]} receiveShadow castShadow>
        <boxGeometry args={[totalWidth + 0.01, 0.005, 0.04]} />
        <meshPhysicalMaterial
          color="#B8B8B8"
          metalness={0.95}
          roughness={0.15}
          reflectivity={0.9}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 螺絲孔（前端收邊板）- 增強細節 */}
      {[-totalWidth/3, 0, totalWidth/3].map((xPos, i) => (
        <group key={`screw-front-${i}`} position={[xPos, 0.0125, -3.02]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.004, 0.004, 0.003, 16]} />
            <meshPhysicalMaterial
              color="#3A3A3A"
              metalness={0.8}
              roughness={0.2}
              clearcoat={0.3}
            />
          </mesh>
          {/* 螺絲頭凹槽 */}
          <mesh position={[0, 0.0016, 0]}>
            <cylinderGeometry args={[0.0015, 0.0015, 0.001, 16]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* 螺絲孔（後端收邊板）- 增強細節 */}
      {[-totalWidth/3, 0, totalWidth/3].map((xPos, i) => (
        <group key={`screw-back-${i}`} position={[xPos, 0.0125, 3.02]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.004, 0.004, 0.003, 16]} />
            <meshPhysicalMaterial
              color="#3A3A3A"
              metalness={0.8}
              roughness={0.2}
              clearcoat={0.3}
            />
          </mesh>
          {/* 螺絲頭凹槽 */}
          <mesh position={[0, 0.0016, 0]}>
            <cylinderGeometry args={[0.0015, 0.0015, 0.001, 16]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 嵌入式地墊安裝系統 - 地面凹槽和導水溝
function RecessionInstallation() {
  const matWidth = 0.4; // 地墊寬度約 40cm
  const matLength = 6.0; // 地墊長度 6m

  return (
    <group>
      {/* 地面嵌入凹槽 */}
      <mesh position={[0, -0.025, 0]} receiveShadow>
        <boxGeometry args={[matWidth + 0.02, 0.03, matLength + 0.1]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.9} />
      </mesh>

      {/* 前端導水溝 */}
      <mesh position={[0, -0.035, -3.1]} receiveShadow>
        <boxGeometry args={[matWidth + 0.05, 0.02, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* 後端導水溝 */}
      <mesh position={[0, -0.035, 3.1]} receiveShadow>
        <boxGeometry args={[matWidth + 0.05, 0.02, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* 導水溝排水孔 */}
      {[-0.15, 0, 0.15].map((xPos, i) => (
        <mesh key={`drain-front-${i}`} position={[xPos, -0.044, -3.1]} receiveShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.01, 16]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.7} />
        </mesh>
      ))}
      {[-0.15, 0, 0.15].map((xPos, i) => (
        <mesh key={`drain-back-${i}`} position={[xPos, -0.044, 3.1]} receiveShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.01, 16]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// 企業辦公大樓場景 - 簡化版（地墊為主）
function CorporateOfficeScene() {
  return (
    <group>
      {/* 地板 - 拋光地磚 */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 14]} />
        <meshPhysicalMaterial
          color="#E8E8E8"
          metalness={0.3}
          roughness={0.5}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 嵌入式地墊安裝系統 */}
      <RecessionInstallation />

      {/* 門框 - 簡化但可識別 */}
      <group position={[0, 1.3, -3.5]}>
        {/* 左側門柱 */}
        <mesh position={[-0.65, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2.6, 0.1]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* 右側門柱 */}
        <mesh position={[0.65, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2.6, 0.1]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* 門楣 */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[1.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* 玻璃門片 */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.2, 2.5, 0.02]} />
          <meshPhysicalMaterial
            color="#C5D9E8"
            transmission={0.85}
            thickness={0.3}
            roughness={0.1}
            transparent
          />
        </mesh>
      </group>

      {/* 背景牆面提示 */}
      <mesh position={[0, 1.5, -3.6]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.85} />
      </mesh>
    </group>
  );
}

// 五星級飯店場景 - 簡化版（地墊為主）
function LuxuryHotelScene() {
  return (
    <group>
      {/* 地板 - 大理石 */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 14]} />
        <meshPhysicalMaterial
          color="#F5F0E8"
          metalness={0.2}
          roughness={0.3}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 嵌入式地墊安裝系統 */}
      <RecessionInstallation />

      {/* 金色門框 - 簡化但奢華 */}
      <group position={[0, 1.3, -3.5]}>
        <mesh position={[-0.65, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 2.6, 0.08]} />
          <meshPhysicalMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.65, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 2.6, 0.08]} />
          <meshPhysicalMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[1.3, 0.08, 0.08]} />
          <meshPhysicalMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* 透明玻璃門 */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[1.2, 2.5, 0.02]} />
          <meshPhysicalMaterial
            color="#E8F0F5"
            transmission={0.88}
            thickness={0.3}
            roughness={0.05}
            transparent
          />
        </mesh>
      </group>

      {/* 背景牆面 - 淺色奢華 */}
      <mesh position={[0, 1.5, -3.6]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#F8F5F0" roughness={0.7} />
      </mesh>
    </group>
  );
}

// 國際機場場景 - 簡化版（地墊為主）
function AirportTerminalScene() {
  return (
    <group>
      {/* 地板 - 工業地板 */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 14]} />
        <meshStandardMaterial
          color="#D5D5D5"
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* 嵌入式地墊安裝系統 */}
      <RecessionInstallation />

      {/* 自動門框 - 工業風格 */}
      <group position={[0, 1.3, -3.5]}>
        <mesh position={[-0.7, 0, 0]} castShadow>
          <boxGeometry args={[0.12, 2.6, 0.12]} />
          <meshPhysicalMaterial color="#505050" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.7, 0, 0]} castShadow>
          <boxGeometry args={[0.12, 2.6, 0.12]} />
          <meshPhysicalMaterial color="#505050" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[1.52, 0.12, 0.12]} />
          <meshPhysicalMaterial color="#505050" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* 玻璃門片 */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[1.28, 2.5, 0.02]} />
          <meshPhysicalMaterial
            color="#B8D5E8"
            transmission={0.87}
            thickness={0.3}
            roughness={0.08}
            transparent
          />
        </mesh>
      </group>

      {/* 背景牆面 */}
      <mesh position={[0, 1.5, -3.6]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.8} />
      </mesh>
    </group>
  );
}

// 科技園區場景 - 簡化版（地墊為主）
function TechParkScene() {
  return (
    <group>
      {/* 地板 - 現代混凝土 */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 14]} />
        <meshPhysicalMaterial
          color="#C0C0C0"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* 嵌入式地墊安裝系統 */}
      <RecessionInstallation />

      {/* 極簡鋁框門 */}
      <group position={[0, 1.4, -3.5]}>
        <mesh position={[-0.65, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 2.8, 0.06]} />
          <meshPhysicalMaterial color="#707070" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0.65, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 2.8, 0.06]} />
          <meshPhysicalMaterial color="#707070" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[1.24, 0.06, 0.06]} />
          <meshPhysicalMaterial color="#707070" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* 大片玻璃 */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.18, 2.74, 0.015]} />
          <meshPhysicalMaterial
            color="#A8C8E0"
            transmission={0.9}
            thickness={0.25}
            roughness={0.05}
            transparent
          />
        </mesh>
      </group>

      {/* 背景牆面 */}
      <mesh position={[0, 1.5, -3.6]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#D8D8D8" roughness={0.75} />
      </mesh>
    </group>
  );
}

// 醫療中心場景 - 簡化版（地墊為主）
function MedicalCenterScene() {
  return (
    <group>
      {/* 地板 - 醫療級地板 */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 14]} />
        <meshPhysicalMaterial
          color="#F2F6F9"
          metalness={0.15}
          roughness={0.6}
          clearcoat={0.8}
        />
      </mesh>

      {/* 嵌入式地墊安裝系統 */}
      <RecessionInstallation />

      {/* 白色門框 */}
      <group position={[0, 1.2, -3.5]}>
        <mesh position={[-0.65, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2.4, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
        </mesh>
        <mesh position={[0.65, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2.4, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
        </mesh>
        {/* 透明門 */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.2, 2.3, 0.02]} />
          <meshPhysicalMaterial
            color="#DAE8F2"
            transmission={0.86}
            thickness={0.3}
            roughness={0.1}
            transparent
          />
        </mesh>
      </group>

      {/* 背景牆面 - 潔淨白 */}
      <mesh position={[0, 1.5, -3.6]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#FCFCFC" roughness={0.6} />
      </mesh>
    </group>
  );
}

// 購物中心場景 - 簡化版（地墊為主）
function ShoppingMallScene() {
  return (
    <group>
      {/* 地板 - 大理石拼花 */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 14]} />
        <meshPhysicalMaterial
          color="#E8E0D5"
          metalness={0.2}
          roughness={0.4}
          clearcoat={0.95}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 嵌入式地墊安裝系統 */}
      <RecessionInstallation />

      {/* 金屬門框 */}
      <group position={[0, 1.3, -3.5]}>
        <mesh position={[-0.7, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2.6, 0.1]} />
          <meshPhysicalMaterial color="#8B7355" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0.7, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2.6, 0.1]} />
          <meshPhysicalMaterial color="#8B7355" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[1.5, 0.1, 0.1]} />
          <meshPhysicalMaterial color="#8B7355" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* 玻璃門 */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.3, 2.5, 0.02]} />
          <meshPhysicalMaterial
            color="#C0D8E8"
            transmission={0.88}
            thickness={0.3}
            roughness={0.06}
            transparent
          />
        </mesh>
      </group>

      {/* 背景牆面 */}
      <mesh position={[0, 1.5, -3.6]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#F0E8DC" roughness={0.7} />
      </mesh>
    </group>
  );
}

// 場景環境選擇器
function SceneEnvironment({ scene }: { scene: ShowcaseScene }) {
  switch (scene.id) {
    case 'corporate-office':
      return <CorporateOfficeScene />;
    case 'luxury-hotel':
      return <LuxuryHotelScene />;
    case 'airport-terminal':
      return <AirportTerminalScene />;
    case 'tech-park':
      return <TechParkScene />;
    case 'medical-center':
      return <MedicalCenterScene />;
    case 'shopping-mall':
      return <ShoppingMallScene />;
    default:
      return <CorporateOfficeScene />;
  }
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
        {/* 相機設置 - 聚焦地墊 */}
        <PerspectiveCamera
          makeDefault
          position={[0.5, 1.5, 4]}
          fov={45}
        />

        {/* 軌道控制器 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.08}
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

        {/* 場景環境 */}
        <SceneEnvironment scene={scene} />

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
