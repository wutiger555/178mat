import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Layers, Tag, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { youtubeVideos } from "@/data/youtube-videos";
import YouTubePlayer, { YouTubeVideoCard } from "@/components/YouTubePlayer";
import { useState } from "react";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const project = projects.find((p) => p.id === params?.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">找不到此案例</h2>
          <Link href="/projects">
            <Button>返回工程實績</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container">
        {/* Back Button */}
        <Link href="/projects">
          <Button variant="outline" size="sm" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            返回工程實績
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-4">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - 圖片 ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`縮圖 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.buildingType.map((type) => (
                <Badge key={type} className="bg-primary/10 text-primary border-primary/20">
                  {type}
                </Badge>
              ))}
            </div>

            <h1 className="mb-6">{project.title}</h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{project.year}年完工</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Layers className="w-5 h-5 text-primary" />
                <span>{project.tags.installationType.join("、")}</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Specifications */}
            {project.specs && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">施工規格</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.specs.area && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">施工面積</div>
                        <div className="font-semibold">{project.specs.area}</div>
                      </div>
                    )}
                    {project.specs.depth && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">深度</div>
                        <div className="font-semibold">{project.specs.depth}</div>
                      </div>
                    )}
                    {project.specs.width && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">寬度</div>
                        <div className="font-semibold">{project.specs.width}</div>
                      </div>
                    )}
                    {project.specs.length && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">長度</div>
                        <div className="font-semibold">{project.specs.length}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* YouTube Videos Section */}
            {project.youtubeVideoIds && project.youtubeVideoIds.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    相關影片
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {youtubeVideos
                      .filter((v) => project.youtubeVideoIds?.includes(v.id))
                      .map((video) => (
                        <YouTubeVideoCard key={video.id} video={video} />
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  詳細標籤
                </h3>
                <div className="space-y-4">
                  {project.tags.floorMaterial.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-2">
                        地面材質
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.floorMaterial.map((material) => (
                          <Badge key={material} variant="secondary">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.tags.framingType.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-2">
                        收邊框類型
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.framingType.map((type) => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.tags.surfaceMaterial.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-2">
                        面料類型
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.surfaceMaterial.map((material) => (
                          <Badge key={material} variant="secondary">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.tags.drainageType.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-2">
                        排水設計
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.drainageType.map((type) => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.tags.designFeature.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-2">
                        設計特點
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.designFeature.map((feature) => (
                          <Badge key={feature} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-8">相關案例</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects
              .filter(
                (p) =>
                  p.id !== project.id &&
                  (p.tags.buildingType.some((type) =>
                    project.tags.buildingType.includes(type)
                  ) ||
                    p.city === project.city)
              )
              .slice(0, 3)
              .map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedProject.images[0]}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                        {relatedProject.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{relatedProject.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
