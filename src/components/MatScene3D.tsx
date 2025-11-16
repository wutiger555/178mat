import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { ShowcaseScene, MaterialType } from '@/data/showcase-scenes';
import * as THREE from 'three';

// 單條鋁合金條組件 - 精確按真實結構建模
// 尺寸單位：mm（在代碼中轉換為米）
// X軸：鋁條長度方向（出入口走向）
// Y軸：高度
// Z軸：鋁條排列方向
function AluminumRail({
  position,
  surfaceType,
  surfaceColor,
  barLength
}: {
  position: [number, number, number];
  surfaceType: 'ribbed' | 'carpet';
  surfaceColor: string;
  barLength: number; // 鋁條長度（米）
}) {
  // 真實尺寸（mm → m）
  const barWidth = 0.030;      // 30mm 鋁條寬度（Z方向）
  const totalHeight = 0.020;   // 20mm 總高度
  const pvcHeight = 0.005;     // 5mm PVC底墊高度
  const alFrameHeight = 0.012; // 12mm 鋁框架高度
  const insertHeight = 0.003;  // 3mm 表面模組可見高度
  const recessDepth = 0.009;   // 9mm 凹槽深度
  const wallThick = 0.0015;    // 1.5mm 壁厚
  const insertWidth = 0.028;   // 28mm 表面模組寬度（留1mm間隙）

  return (
    <group position={position}>
      {/* 層1: PVC橡膠墊底（最底層）*/}
      <mesh receiveShadow position={[0, pvcHeight/2, 0]}>
        <boxGeometry args={[barWidth, pvcHeight, barLength]} />
        <meshStandardMaterial
          color="#3A3A3A"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* 層2: 鋁合金擠壓框架 - 外殼 */}
      <group position={[0, pvcHeight + alFrameHeight/2, 0]}>
        {/* 底板 */}
        <mesh receiveShadow castShadow position={[0, -alFrameHeight/2 + wallThick/2, 0]}>
          <boxGeometry args={[barWidth, wallThick, barLength]} />
          <meshPhysicalMaterial
            color="#C0C0C0"
            metalness={0.95}
            roughness={0.12}
            reflectivity={0.95}
            clearcoat={0.6}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* 左側壁 */}
        <mesh receiveShadow castShadow position={[-barWidth/2 + wallThick/2, 0, 0]}>
          <boxGeometry args={[wallThick, alFrameHeight, barLength]} />
          <meshPhysicalMaterial
            color="#B8B8B8"
            metalness={0.95}
            roughness={0.15}
            reflectivity={0.95}
            clearcoat={0.6}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* 右側壁 */}
        <mesh receiveShadow castShadow position={[barWidth/2 - wallThick/2, 0, 0]}>
          <boxGeometry args={[wallThick, alFrameHeight, barLength]} />
          <meshPhysicalMaterial
            color="#B8B8B8"
            metalness={0.95}
            roughness={0.15}
            reflectivity={0.95}
            clearcoat={0.6}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* 前端壁 */}
        <mesh receiveShadow castShadow position={[0, 0, -barLength/2 + wallThick/2]}>
          <boxGeometry args={[barWidth - wallThick*2, alFrameHeight, wallThick]} />
          <meshPhysicalMaterial
            color="#B8B8B8"
            metalness={0.95}
            roughness={0.15}
            reflectivity={0.95}
            clearcoat={0.6}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* 後端壁 */}
        <mesh receiveShadow castShadow position={[0, 0, barLength/2 - wallThick/2]}>
          <boxGeometry args={[barWidth - wallThick*2, alFrameHeight, wallThick]} />
          <meshPhysicalMaterial
            color="#B8B8B8"
            metalness={0.95}
            roughness={0.15}
            reflectivity={0.95}
            clearcoat={0.6}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </group>

      {/* 層3: 表面模組（嵌入在凹槽中）*/}
      <group position={[0, pvcHeight + alFrameHeight - recessDepth + insertHeight/2, 0]}>
        {surfaceType === 'ribbed' ? (
          // PVC肋條型：多條平行細肋
          <group>
            {Array.from({ length: 24 }).map((_, i) => {
              const ribWidth = 0.001;   // 1mm 肋條寬度
              const ribHeight = 0.001;  // 1mm 肋條高度
              const ribGap = 0.0002;    // 0.2mm 間隙
              const ribPitch = ribWidth + ribGap;
              const totalRibWidth = 24 * ribPitch;
              const xPos = -totalRibWidth/2 + i * ribPitch + ribWidth/2;

              return (
                <mesh key={i} position={[xPos, insertHeight/2, 0]} receiveShadow castShadow>
                  <boxGeometry args={[ribWidth, ribHeight, barLength - 0.004]} />
                  <meshPhysicalMaterial
                    color={surfaceColor}
                    metalness={0.12}
                    roughness={0.88}
                    clearcoat={0.35}
                    clearcoatRoughness={0.4}
                  />
                </mesh>
              );
            })}
            {/* 肋條底層 */}
            <mesh position={[0, 0, 0]} receiveShadow>
              <boxGeometry args={[insertWidth, insertHeight - 0.001, barLength - 0.004]} />
              <meshStandardMaterial
                color={surfaceColor}
                roughness={0.85}
                metalness={0.08}
              />
            </mesh>
          </group>
        ) : (
          // 地毯型：微凸紋理表面
          <mesh position={[0, 0, 0]} receiveShadow castShadow>
            <boxGeometry args={[insertWidth, insertHeight, barLength - 0.004]} />
            <meshPhysicalMaterial
              color={surfaceColor}
              metalness={0.03}
              roughness={0.96}
              clearcoat={0}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

// 完整鋁合金地墊組件
function EntranceMat({ scene, material }: { scene: ShowcaseScene; material?: MaterialType }) {
  const groupRef = useRef<THREE.Group>(null);

  // 地墊整體參數（真實入口地墊尺寸）
  const barLength = 1.2;    // 1.2m 鋁條長度（X方向，合理的入口地墊長度）
  const numBars = 12;       // 12條鋁條（Z方向）
  const barWidth = 0.030;   // 30mm 單條寬度
  const barGap = 0.005;     // 5mm 鋁條間隙
  const totalWidth = numBars * barWidth + (numBars - 1) * barGap; // 總寬度約 41.5cm

  // 根據場景和材質決定顏色配置
  const barConfigs = useMemo(() => {
    const configs = [];

    if (scene.matSystem.surface.includes('多色')) {
      // 多色配置（地毯+肋條混合）
      const pattern = [
        { type: 'carpet' as const, color: '#707070' }, // 灰色地毯
        { type: 'carpet' as const, color: '#8B4513' }, // 咖啡色地毯
        { type: 'ribbed' as const, color: '#1A1A1A' }, // 黑色肋條
        { type: 'carpet' as const, color: '#606060' }, // 深灰地毯
        { type: 'carpet' as const, color: '#8B4513' }, // 咖啡色地毯
        { type: 'ribbed' as const, color: '#1A1A1A' }, // 黑色肋條
        { type: 'carpet' as const, color: '#707070' }, // 灰色地毯
        { type: 'carpet' as const, color: '#606060' }, // 深灰地毯
        { type: 'ribbed' as const, color: '#1A1A1A' }, // 黑色肋條
        { type: 'carpet' as const, color: '#8B4513' }, // 咖啡色地毯
        { type: 'carpet' as const, color: '#707070' }, // 灰色地毯
        { type: 'ribbed' as const, color: '#1A1A1A' }  // 黑色肋條
      ];
      configs.push(...pattern);
    } else if (scene.matSystem.surface.includes('止滑膠條')) {
      // 全肋條配置
      for (let i = 0; i < numBars; i++) {
        configs.push({ type: 'ribbed' as const, color: '#1A1A1A' });
      }
    } else {
      // 單色地毯配置
      const color = material?.color || (
        scene.matSystem.surface.includes('灰色') ? '#808080' :
        scene.matSystem.surface.includes('黑色') ? '#404040' :
        scene.matSystem.surface.includes('棕') ? '#8B4513' : '#707070'
      );
      for (let i = 0; i < numBars; i++) {
        configs.push({ type: 'carpet' as const, color });
      }
    }

    return configs;
  }, [scene, material, numBars]);

  return (
    <group ref={groupRef} rotation={[0, Math.PI / 2, 0]}>
      {/* 鋁條陣列（Z方向排列）*/}
      {barConfigs.map((config, i) => {
        const zPos = -totalWidth / 2 + (barWidth / 2) + i * (barWidth + barGap);
        return (
          <AluminumRail
            key={i}
            position={[0, 0, zPos]}
            surfaceType={config.type}
            surfaceColor={config.color}
            barLength={barLength}
          />
        );
      })}

      {/* 橡膠間隔條（鋁條之間的黑色縫隙）*/}
      {Array.from({ length: numBars - 1 }).map((_, i) => {
        const zPos = -totalWidth / 2 + barWidth + i * (barWidth + barGap) + barGap / 2;
        return (
          <mesh key={`gap-${i}`} position={[0, 0.0025, zPos]} receiveShadow>
            <boxGeometry args={[barLength, 0.005, barGap]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.15} roughness={0.85} />
          </mesh>
        );
      })}

      {/* 前端收邊條 */}
      <mesh position={[barLength/2 + 0.015, 0.01, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.03, 0.006, totalWidth + 0.006]} />
        <meshPhysicalMaterial
          color="#B0B0B0"
          metalness={0.95}
          roughness={0.12}
          reflectivity={0.95}
          clearcoat={0.6}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* 後端收邊條 */}
      <mesh position={[-barLength/2 - 0.015, 0.01, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.03, 0.006, totalWidth + 0.006]} />
        <meshPhysicalMaterial
          color="#B0B0B0"
          metalness={0.95}
          roughness={0.12}
          reflectivity={0.95}
          clearcoat={0.6}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* 固定螺絲（前端收邊條）*/}
      {[-totalWidth/3, 0, totalWidth/3].map((zPos, i) => (
        <group key={`screw-front-${i}`} position={[barLength/2 + 0.015, 0.013, zPos]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.003, 0.003, 0.004, 16]} />
            <meshPhysicalMaterial
              color="#2A2A2A"
              metalness={0.85}
              roughness={0.15}
              clearcoat={0.4}
            />
          </mesh>
          <mesh position={[0, 0.0022, 0]}>
            <cylinderGeometry args={[0.001, 0.001, 0.0008, 16]} />
            <meshStandardMaterial color="#0A0A0A" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* 固定螺絲（後端收邊條）*/}
      {[-totalWidth/3, 0, totalWidth/3].map((zPos, i) => (
        <group key={`screw-back-${i}`} position={[-barLength/2 - 0.015, 0.013, zPos]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.003, 0.003, 0.004, 16]} />
            <meshPhysicalMaterial
              color="#2A2A2A"
              metalness={0.85}
              roughness={0.15}
              clearcoat={0.4}
            />
          </mesh>
          <mesh position={[0, 0.0022, 0]}>
            <cylinderGeometry args={[0.001, 0.001, 0.0008, 16]} />
            <meshStandardMaterial color="#0A0A0A" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 企業辦公大樓場景 - 以地墊為中心
function CorporateOfficeScene() {
  return (
    <group>
      {/* 地板 - 拋光地磚 */}
      <mesh position={[0, -0.005, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshPhysicalMaterial
          color="#E5E5E5"
          metalness={0.3}
          roughness={0.5}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 門框 - 尺寸與地墊匹配 */}
      <group position={[0.8, 1.1, 0]}>
        {/* 左側門柱 */}
        <mesh position={[0, 0, -0.28]} castShadow>
          <boxGeometry args={[0.08, 2.2, 0.08]} />
          <meshStandardMaterial color="#303030" roughness={0.25} metalness={0.75} />
        </mesh>
        {/* 右側門柱 */}
        <mesh position={[0, 0, 0.28]} castShadow>
          <boxGeometry args={[0.08, 2.2, 0.08]} />
          <meshStandardMaterial color="#303030" roughness={0.25} metalness={0.75} />
        </mesh>
        {/* 門楣 */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.08, 0.08, 0.64]} />
          <meshStandardMaterial color="#303030" roughness={0.25} metalness={0.75} />
        </mesh>
        {/* 玻璃門片 */}
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.015, 2.1, 0.52]} />
          <meshPhysicalMaterial
            color="#C8DCE8"
            transmission={0.88}
            thickness={0.25}
            roughness={0.08}
            transparent
          />
        </mesh>
      </group>

      {/* 背景牆面 */}
      <mesh position={[0.88, 1.5, 0]} receiveShadow rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.05, 3]} />
        <meshStandardMaterial color="#F2F2F2" roughness={0.88} />
      </mesh>
    </group>
  );
}

// 五星級飯店場景
function LuxuryHotelScene() {
  return (
    <group>
      <mesh position={[0, -0.005, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshPhysicalMaterial color="#F8F3E8" metalness={0.2} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>
      <group position={[0.8, 1.1, 0]}>
        <mesh position={[0, 0, -0.28]} castShadow>
          <boxGeometry args={[0.06, 2.2, 0.06]} />
          <meshPhysicalMaterial color="#D4AF37" metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh position={[0, 0, 0.28]} castShadow>
          <boxGeometry args={[0.06, 2.2, 0.06]} />
          <meshPhysicalMaterial color="#D4AF37" metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.62]} />
          <meshPhysicalMaterial color="#D4AF37" metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.015, 2.1, 0.5]} />
          <meshPhysicalMaterial color="#E8F0F5" transmission={0.88} thickness={0.25} roughness={0.05} transparent />
        </mesh>
      </group>
      <mesh position={[0.86, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.05, 3]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.75} />
      </mesh>
    </group>
  );
}

// 國際機場場景
function AirportTerminalScene() {
  return (
    <group>
      <mesh position={[0, -0.005, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#D8D8D8" metalness={0.2} roughness={0.72} />
      </mesh>
      <group position={[0.8, 1.1, 0]}>
        <mesh position={[0, 0, -0.3]} castShadow>
          <boxGeometry args={[0.09, 2.2, 0.09]} />
          <meshPhysicalMaterial color="#555555" metalness={0.82} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.09, 2.2, 0.09]} />
          <meshPhysicalMaterial color="#555555" metalness={0.82} roughness={0.28} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.09, 0.09, 0.69]} />
          <meshPhysicalMaterial color="#555555" metalness={0.82} roughness={0.28} />
        </mesh>
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.015, 2.1, 0.51]} />
          <meshPhysicalMaterial color="#B5D5E8" transmission={0.87} thickness={0.25} roughness={0.08} transparent />
        </mesh>
      </group>
      <mesh position={[0.89, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.05, 3]} />
        <meshStandardMaterial color="#EBEBEB" roughness={0.82} />
      </mesh>
    </group>
  );
}

// 科技園區場景
function TechParkScene() {
  return (
    <group>
      <mesh position={[0, -0.005, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshPhysicalMaterial color="#C5C5C5" metalness={0.32} roughness={0.62} />
      </mesh>
      <group position={[0.8, 1.15, 0]}>
        <mesh position={[0, 0, -0.27]} castShadow>
          <boxGeometry args={[0.05, 2.3, 0.05]} />
          <meshPhysicalMaterial color="#787878" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.27]} castShadow>
          <boxGeometry args={[0.05, 2.3, 0.05]} />
          <meshPhysicalMaterial color="#787878" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.59]} />
          <meshPhysicalMaterial color="#787878" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.012, 2.25, 0.49]} />
          <meshPhysicalMaterial color="#A5C8E0" transmission={0.9} thickness={0.22} roughness={0.05} transparent />
        </mesh>
      </group>
      <mesh position={[0.86, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.05, 3]} />
        <meshStandardMaterial color="#DCDCDC" roughness={0.78} />
      </mesh>
    </group>
  );
}

// 醫療中心場景
function MedicalCenterScene() {
  return (
    <group>
      <mesh position={[0, -0.005, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshPhysicalMaterial color="#F4F7FA" metalness={0.16} roughness={0.62} clearcoat={0.82} />
      </mesh>
      <group position={[0.8, 1.05, 0]}>
        <mesh position={[0, 0, -0.28]} castShadow>
          <boxGeometry args={[0.08, 2.1, 0.08]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.32} />
        </mesh>
        <mesh position={[0, 0, 0.28]} castShadow>
          <boxGeometry args={[0.08, 2.1, 0.08]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.32} />
        </mesh>
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[0.08, 0.08, 0.64]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.32} />
        </mesh>
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.015, 2.0, 0.48]} />
          <meshPhysicalMaterial color="#DCE8F2" transmission={0.86} thickness={0.25} roughness={0.1} transparent />
        </mesh>
      </group>
      <mesh position={[0.88, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.05, 3]} />
        <meshStandardMaterial color="#FEFEFE" roughness={0.62} />
      </mesh>
    </group>
  );
}

// 購物中心場景
function ShoppingMallScene() {
  return (
    <group>
      <mesh position={[0, -0.005, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshPhysicalMaterial color="#EAE2D8" metalness={0.22} roughness={0.42} clearcoat={0.95} clearcoatRoughness={0.08} />
      </mesh>
      <group position={[0.8, 1.1, 0]}>
        <mesh position={[0, 0, -0.3]} castShadow>
          <boxGeometry args={[0.08, 2.2, 0.08]} />
          <meshPhysicalMaterial color="#8D7558" metalness={0.86} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.08, 2.2, 0.08]} />
          <meshPhysicalMaterial color="#8D7558" metalness={0.86} roughness={0.18} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.08, 0.08, 0.68]} />
          <meshPhysicalMaterial color="#8D7558" metalness={0.86} roughness={0.18} />
        </mesh>
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.015, 2.1, 0.52]} />
          <meshPhysicalMaterial color="#C2D8E8" transmission={0.88} thickness={0.25} roughness={0.06} transparent />
        </mesh>
      </group>
      <mesh position={[0.88, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.05, 3]} />
        <meshStandardMaterial color="#F2EADF" roughness={0.72} />
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
        {/* 相機設置 - 聚焦地墊（適配新尺寸）*/}
        <PerspectiveCamera
          makeDefault
          position={[-0.8, 0.6, 0.8]}
          fov={50}
        />

        {/* 軌道控制器 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={0.8}
          maxDistance={3.5}
          maxPolarAngle={Math.PI / 2.3}
          target={[0, 0.01, 0]}
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
