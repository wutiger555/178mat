
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useLocation } from "wouter";
import { Search, MapPin, Calendar, Filter } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import {
  projects,
  buildingTypes,
  cities,
  getSurfaceMaterials,
  getAvailableYears,
  filterProjects,
  getTagStatistics,
} from "@/data/projects";

export default function Projects() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuildingType, setSelectedBuildingType] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSurfaceMaterial, setSelectedSurfaceMaterial] = useState<string>("");

  // 從 URL 參數讀取城市篩選
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cityParam = params.get('city');
    if (cityParam) {
      setSelectedCity(cityParam);
    }
  }, [location]);

  const years = getAvailableYears();
  const tagStats = getTagStatistics();
  const surfaceMaterials = getSurfaceMaterials();

  const filteredProjects = useMemo(() => {
    return filterProjects({
      buildingType: selectedBuildingType || undefined,
      city: selectedCity || undefined,
      year: selectedYear ? parseInt(selectedYear) : undefined,
      surfaceMaterial: selectedSurfaceMaterial || undefined,
    });
  }, [selectedBuildingType, selectedCity, selectedYear, selectedSurfaceMaterial]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBuildingType("");
    setSelectedCity("");
    setSelectedYear("");
    setSelectedSurfaceMaterial("");
  };

  const hasActiveFilters =
    searchQuery || selectedBuildingType || selectedCity || selectedYear || selectedSurfaceMaterial;

  return (
    <div className="min-h-screen py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            工程實績
          </Badge>
          <h1 className="mb-4">全台服務案例</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            遍布全台各地的成功案例，從住宅大廈到公共建築，展現我們的專業實力
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">篩選條件</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto"
                >
                  清除篩選
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋案例..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Building Type Filter */}
              <Select value={selectedBuildingType} onValueChange={setSelectedBuildingType}>
                <SelectTrigger>
                  <SelectValue placeholder="建物類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部類型</SelectItem>
                  {buildingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type} ({tagStats.buildingTypes[type] || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* City Filter */}
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="地區" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部地區</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city} ({tagStats.cities[city] || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Year Filter */}
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="年份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部年份</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Surface Material Filter */}
              <Select value={selectedSurfaceMaterial} onValueChange={setSelectedSurfaceMaterial}>
                <SelectTrigger>
                  <SelectValue placeholder="面料類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部面料</SelectItem>
                  {surfaceMaterials.map((material: string) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              找到 <span className="font-bold text-foreground">{filteredProjects.length}</span> 個案例
            </div>
          </Card>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: any) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        {project.year}年
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.buildingType.map((type: string) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                      {project.tags.installationType.slice(0, 1).map((type: string) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">找不到符合條件的案例</h3>
            <p className="text-muted-foreground mb-6">
              請嘗試調整篩選條件或清除所有篩選
            </p>
            <Button onClick={clearFilters}>清除篩選條件</Button>
          </div>
        )}

        {/* Tag Cloud Section */}
        <div className="mt-24">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">熱門標籤</h3>
            <div className="space-y-6">
              {/* Building Types */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">建物類型</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(tagStats.buildingTypes)
                    .sort((a, b) => (b[1] as number) - (a[1] as number))
                    .map(([type, count]) => (
                      <Button
                        key={type}
                        variant={selectedBuildingType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          setSelectedBuildingType(selectedBuildingType === type ? "" : type)
                        }
                        className="gap-2"
                      >
                        {type}
                        <Badge variant="secondary" className="ml-1">
                          {count as number}
                        </Badge>
                      </Button>
                    ))}
                </div>
              </div>

              {/* Cities */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">服務地區</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(tagStats.cities)
                    .sort((a, b) => (b[1] as number) - (a[1] as number))
                    .map(([city, count]) => (
                      <Button
                        key={city}
                        variant={selectedCity === city ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCity(selectedCity === city ? "" : city)}
                        className="gap-2"
                      >
                        <MapPin className="w-3 h-3" />
                        {city}
                        <Badge variant="secondary" className="ml-1">
                          {count as number}
                        </Badge>
                      </Button>
                    ))}
                </div>
              </div>

              {/* Surface Materials */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">面料類型</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(tagStats.surfaceMaterials)
                    .sort((a, b) => (b[1] as number) - (a[1] as number))
                    .slice(0, 10)
                    .map(([material, count]) => (
                      <Button
                        key={material}
                        variant={selectedSurfaceMaterial === material ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          setSelectedSurfaceMaterial(
                            selectedSurfaceMaterial === material ? "" : material
                          )
                        }
                        className="gap-2"
                      >
                        {material}
                        <Badge variant="secondary" className="ml-1">
                          {count as number}
                        </Badge>
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
