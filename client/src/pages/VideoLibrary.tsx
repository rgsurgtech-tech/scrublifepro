import { useState } from 'react';
import { Search, Filter, Grid, List, Play, Clock, Eye, Heart, BookOpen, Crown, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import VideoPlayer from '@/components/VideoPlayer';
import type { Video, VideoCategory, Specialty } from '@shared/schema';

export default function VideoLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Fetch video categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<VideoCategory[]>({
    queryKey: ['video-categories'],
    queryFn: async () => {
      const response = await fetch('/api/video-categories');
      if (!response.ok) throw new Error('Failed to fetch video categories');
      return response.json();
    },
  });

  // Fetch specialties
  const { data: specialties = [], isLoading: specialtiesLoading } = useQuery<Specialty[]>({
    queryKey: ['specialties'],
    queryFn: async () => {
      const response = await fetch('/api/specialties');
      if (!response.ok) throw new Error('Failed to fetch specialties');
      return response.json();
    },
  });

  // Fetch videos with filters
  const { data: videos = [], isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ['videos', searchQuery, selectedCategory, selectedSpecialty],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedSpecialty && selectedSpecialty !== 'all') params.append('specialtyId', selectedSpecialty);
      
      const response = await fetch(`/api/videos?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    },
  });

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSpecialty('all');
  };

  const VideoCard = ({ video }: { video: Video }) => {
    const hasVideo = video.videoUrl && video.videoUrl.trim() !== '';
    
    return (
      <Card 
        className="group bg-white/5 backdrop-blur-md border-white/10 hover-elevate cursor-pointer transition-all duration-300"
        onClick={() => hasVideo && setSelectedVideo(video)}
        data-testid={`card-video-${video.id}`}
      >
        <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
          {hasVideo ? (
            <>
              {video.thumbnailUrl ? (
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <Play className="w-8 h-8 text-white/80" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-cyan-600/80 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white/50" />
                </div>
                <div className="text-white/70 text-sm font-medium">Coming Soon</div>
              </div>
            </div>
          )}
          
          {/* CME badge */}
          {video.cmeCredits && (
            <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
              {video.cmeCredits} CME
            </div>
          )}
          
          {/* Duration badge */}
          {hasVideo && video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
              {formatDuration(video.duration)}
            </div>
          )}
        </div>
        
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-white line-clamp-2 leading-tight" data-testid={`text-video-title-${video.id}`}>
            {video.title}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {video.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge className={getDifficultyColor(video.difficulty)}>
              {video.difficulty}
            </Badge>
            {video.accessTier === 'standard' && (
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 flex items-center gap-1">
                <Star className="w-3 h-3" />
                Standard
              </Badge>
            )}
            {video.accessTier === 'premium' && (
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Premium
              </Badge>
            )}
          </div>
          
          {!hasVideo && (
            <div className="text-center">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                Coming Soon
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const VideoListItem = ({ video }: { video: Video }) => {
    const hasVideo = video.videoUrl && video.videoUrl.trim() !== '';
    
    return (
      <Card 
        className="group bg-white/5 backdrop-blur-md border-white/10 hover-elevate cursor-pointer transition-all duration-300"
        onClick={() => hasVideo && setSelectedVideo(video)}
        data-testid={`list-video-${video.id}`}
      >
        <div className="flex gap-4 p-4">
          <div className="relative w-32 h-20 bg-black rounded overflow-hidden flex-shrink-0">
            {hasVideo ? (
              <>
                {video.thumbnailUrl ? (
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white/80" />
                  </div>
                )}
                
                {/* Duration badge */}
                {video.duration && (
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {formatDuration(video.duration)}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-1">
                    <Play className="w-4 h-4 text-white/50" />
                  </div>
                  <div className="text-white/70 text-xs">Coming Soon</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-white line-clamp-1">
              {video.title}
            </h3>
            
            <p className="text-gray-400 text-sm line-clamp-2">
              {video.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Badge className={getDifficultyColor(video.difficulty)}>
                {video.difficulty}
              </Badge>
              {video.cmeCredits && (
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {video.cmeCredits} CME
                </Badge>
              )}
              {video.accessTier !== 'free' && (
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  {video.accessTier}
                </Badge>
              )}
              {!hasVideo && (
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                  Coming Soon
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2" data-testid="text-page-title">
            Video Library
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Access comprehensive surgical video content including procedure demonstrations, 
            technique tutorials, and educational materials from certified professionals.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search videos by title, description, or technique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                data-testid="input-search"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white" data-testid="select-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categoriesLoading ? (
                      <SelectItem value="loading" disabled>Loading...</SelectItem>
                    ) : (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white" data-testid="select-specialty">
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialtiesLoading ? (
                      <SelectItem value="loading" disabled>Loading...</SelectItem>
                    ) : (
                      specialties.map((specialty) => (
                        <SelectItem key={specialty.id} value={specialty.id}>
                          {specialty.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                {/* View Mode Toggle */}
                <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                    data-testid="button-grid-view"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-3"
                    data-testid="button-list-view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-white/20 hover:bg-white/10"
                  data-testid="button-clear-filters"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-gray-300">
            {videosLoading ? 'Loading videos...' : `${videos.length} videos found`}
          </p>
          
          {/* Quick Links */}
          <div className="flex gap-2">
            <Link href="/procedures">
              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Procedures
              </Button>
            </Link>
          </div>
        </div>

        {/* Videos Grid/List */}
        {videosLoading ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-md border-white/10">
                <div className="aspect-video">
                  <Skeleton className="w-full h-full bg-white/10" />
                </div>
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-full bg-white/10" />
                  <Skeleton className="h-4 w-2/3 bg-white/10" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Videos Found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-white/20 hover:bg-white/10"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }>
            {videos.map((video) => 
              viewMode === 'grid' ? (
                <VideoCard key={video.id} video={video} />
              ) : (
                <VideoListItem key={video.id} video={video} />
              )
            )}
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] bg-slate-900/95 backdrop-blur-md border-white/10 p-0">
          <div className="h-full overflow-y-auto p-6">
            {selectedVideo && (
              <VideoPlayer video={selectedVideo} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}