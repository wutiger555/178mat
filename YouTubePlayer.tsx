import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { YouTubeVideo } from '@/data/youtube-videos';

interface YouTubePlayerProps {
  video: YouTubeVideo;
  autoplay?: boolean;
  className?: string;
}

/**
 * YouTube 影片播放器組件
 * 支援嵌入式播放和點擊展開全屏播放
 */
export default function YouTubePlayer({
  video,
  autoplay = false,
  className = '',
}: YouTubePlayerProps) {
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=${autoplay ? 1 : 0}&rel=0`;

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-black rounded-lg overflow-hidden shadow-lg">
        {/* 影片容器 */}
        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 影片資訊 */}
        <div className="p-4 bg-card border-t border-border">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {video.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{video.duration}</span>
            <span>{video.views.toLocaleString()} 次觀看</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * YouTube 影片卡片組件（用於列表展示）
 */
export function YouTubeVideoCard({
  video,
  onClick,
}: {
  video: YouTubeVideo;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className="cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-black">
        {/* 縮圖 */}
        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
          <img
            src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-75 transition-opacity"
          />
          {/* 播放按鈕覆蓋層 */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white"
            >
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </motion.div>
          </div>
          {/* 時長標籤 */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>

        {/* 影片資訊 */}
        <div className="p-3 bg-card">
          <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h4>
          <p className="text-xs text-muted-foreground">
            {video.views.toLocaleString()} 次觀看
          </p>
        </div>
      </div>
    </motion.div>
  );
}
