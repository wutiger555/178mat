import { useEffect, useState } from "react";

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  count: number;
}

const locations: Location[] = [
  { id: "taipei", name: "台北", x: 55, y: 15, count: 150 },
  { id: "taoyuan", name: "桃園", x: 52, y: 22, count: 80 },
  { id: "hsinchu", name: "新竹", x: 50, y: 28, count: 60 },
  { id: "taichung", name: "台中", x: 48, y: 42, count: 120 },
  { id: "changhua", name: "彰化", x: 47, y: 50, count: 45 },
  { id: "tainan", name: "台南", x: 45, y: 65, count: 90 },
  { id: "kaohsiung", name: "高雄", x: 48, y: 75, count: 110 },
  { id: "pingtung", name: "屏東", x: 47, y: 85, count: 40 },
];

export default function TaiwanMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [animatedCounts, setAnimatedCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // 數字動畫效果
    locations.forEach((location) => {
      let current = 0;
      const increment = location.count / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= location.count) {
          current = location.count;
          clearInterval(timer);
        }
        setAnimatedCounts((prev) => ({
          ...prev,
          [location.id]: Math.floor(current),
        }));
      }, 30);
    });
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* 台灣地圖輪廓 */}
      <svg
        viewBox="0 0 100 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 台灣本島輪廓 */}
        <path
          d="M 50 10 
             Q 55 12, 58 18
             Q 60 25, 58 32
             Q 56 40, 52 48
             Q 50 55, 48 62
             Q 46 70, 48 78
             Q 50 85, 48 92
             Q 46 98, 44 102
             Q 40 108, 38 110
             L 36 108
             Q 34 102, 35 95
             Q 36 88, 38 80
             Q 40 72, 42 64
             Q 44 56, 46 48
             Q 48 40, 48 32
             Q 48 24, 46 18
             Q 44 12, 46 10
             Z"
          className="fill-primary/10 stroke-primary stroke-2 transition-all duration-300 hover:fill-primary/20"
        />

        {/* 位置標記點 */}
        {locations.map((location) => (
          <g key={location.id}>
            {/* 脈動圓圈動畫 */}
            <circle
              cx={location.x}
              cy={location.y}
              r="3"
              className="fill-primary animate-ping opacity-75"
            />
            {/* 主要標記點 */}
            <circle
              cx={location.x}
              cy={location.y}
              r="2.5"
              className="fill-primary cursor-pointer transition-all duration-300 hover:r-4"
              onMouseEnter={() => setActiveLocation(location.id)}
              onMouseLeave={() => setActiveLocation(null)}
            />
            {/* 城市名稱 */}
            <text
              x={location.x + 5}
              y={location.y + 1}
              className="text-[3px] fill-foreground font-medium"
            >
              {location.name}
            </text>
          </g>
        ))}

        {/* 連接線動畫 */}
        {locations.map((location, index) => {
          if (index === locations.length - 1) return null;
          const nextLocation = locations[index + 1];
          return (
            <line
              key={`line-${location.id}`}
              x1={location.x}
              y1={location.y}
              x2={nextLocation.x}
              y2={nextLocation.y}
              className="stroke-primary/30 stroke-[0.5]"
              strokeDasharray="2,2"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="4"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
          );
        })}
      </svg>

      {/* 統計資訊卡片 */}
      {activeLocation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg shadow-lg p-4 animate-scale-in z-10">
          {locations
            .filter((loc) => loc.id === activeLocation)
            .map((location) => (
              <div key={location.id} className="text-center min-w-[120px]">
                <div className="text-2xl font-bold text-primary">
                  {animatedCounts[location.id] || 0}+
                </div>
                <div className="text-sm text-muted-foreground">
                  {location.name}地區案例
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 總計統計 */}
      <div className="mt-8 text-center">
        <div className="text-4xl font-bold text-primary mb-2">
          {Object.values(animatedCounts).reduce((a, b) => a + b, 0)}+
        </div>
        <div className="text-muted-foreground">全台服務案例總數</div>
      </div>
    </div>
  );
}
