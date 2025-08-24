import React from 'react';
import { Button } from './ui/button';

interface TrendingVideoProps {
    title: string;
    platform: string;
    views: string;
    duration: string;
    thumbnail: string;
    quality: string;
}

const TrendingVideo: React.FC<TrendingVideoProps> = ( {
    title,
    platform,
    views,
    duration,
    thumbnail,
    quality
} ) => {
    return (
        <div className="bg-[#333333] rounded-lg overflow-hidden hover:bg-[#444444] transition-colors group">
            {/* Thumbnail */ }
            <div className="aspect-video bg-black relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/60"></div>
                <div className="text-center z-10">
                    <div className="text-[#D76EF3] text-lg font-bold mb-1">{ platform }</div>
                    <div className="text-white text-sm opacity-80">{ thumbnail }</div>
                </div>
                {/* Duration badge */ }
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    { duration }
                </div>
                {/* Quality badge */ }
                <div className="absolute top-2 left-2 bg-[#D76EF3] text-white text-xs px-2 py-1 rounded font-bold">
                    { quality }
                </div>
            </div>

            {/* Content */ }
            <div className="p-4">
                <h3 className="text-white font-medium text-sm mb-2 line-clamp-2 group-hover:text-[#D76EF3] transition-colors">
                    { title }
                </h3>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-xs">{ views } downloads</span>
                    <span className="text-gray-500 text-xs">{ platform }</span>
                </div>
                <Button className="w-full h-8 bg-[#D76EF3] hover:bg-[#c55bd8] text-xs">
                    Download Now
                </Button>
            </div>
        </div>
    );
};

export default TrendingVideo; 