import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Video, VideoComment, VideoProgress } from '@shared/schema';

interface VideoPlayerProps {
  video: Video;
  userId?: string;
  isAuthenticated: boolean;
}

export default function VideoPlayer({ video, userId, isAuthenticated }: VideoPlayerProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressUpdateRef = useRef<NodeJS.Timeout>();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Fetch video progress for authenticated users
  const { data: userProgress } = useQuery<VideoProgress>({
    queryKey: ['video-progress', video.id, userId],
    queryFn: async () => {
      const response = await fetch(`/api/user/video-progress/${video.id}`);
      if (!response.ok) throw new Error('Failed to fetch video progress');
      return response.json();
    },
    enabled: isAuthenticated && !!userId,
  });

  // Fetch video comments
  const { data: comments = [], isLoading: commentsLoading } = useQuery<VideoComment[]>({
    queryKey: ['video-comments', video.id],
    queryFn: async () => {
      const response = await fetch(`/api/videos/${video.id}/comments`);
      if (!response.ok) throw new Error('Failed to fetch video comments');
      return response.json();
    },
  });

  // Update video progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async (progressData: { videoId: string; progressTime: number; completed: boolean }) => {
      return apiRequest('POST', '/api/user/video-progress', progressData);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save video progress",
        variant: "destructive",
      });
    },
  });

  // Toggle video like mutation
  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', `/api/user/video-likes/${video.id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['videos', video.id] });
      toast({
        title: "Success",
        description: "Video like updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update video like",
        variant: "destructive",
      });
    },
  });

  // Toggle video favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', `/api/user/video-favorites/${video.id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-video-favorites'] });
      toast({
        title: "Success",
        description: "Video favorite updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update video favorite",
        variant: "destructive",
      });
    },
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest('POST', `/api/videos/${video.id}/comments`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['video-comments', video.id] });
      setNewComment('');
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    },
  });

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Resume from saved progress
      if (userProgress?.progressTime) {
        video.currentTime = userProgress.progressTime;
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Save progress every 5 seconds
      if (isAuthenticated && userId) {
        clearTimeout(progressUpdateRef.current);
        progressUpdateRef.current = setTimeout(() => {
          const completed = video.currentTime >= video.duration * 0.95; // 95% watched = completed
          updateProgressMutation.mutate({
            videoId: video.id,
            progressTime: video.currentTime,
            completed,
          });
        }, 5000);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (isAuthenticated && userId) {
        updateProgressMutation.mutate({
          videoId: video.id,
          progressTime: video.duration,
          completed: true,
        });
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      clearTimeout(progressUpdateRef.current);
    };
  }, [video.id, isAuthenticated, userId, userProgress]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const vol = newVolume[0];
    video.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const handleSeek = (newTime: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = newTime[0];
    setCurrentTime(newTime[0]);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addCommentMutation.mutate(newComment);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card className="overflow-hidden bg-black/20 backdrop-blur-md border-white/10">
        <div 
          className="relative aspect-video bg-black group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={video.videoUrl}
            poster={video.thumbnailUrl || undefined}
            data-testid={`video-player-${video.id}`}
          />
          
          {/* Video Controls Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={togglePlay}
                data-testid="button-play-pause"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </Button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              {/* Progress Bar */}
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
                data-testid="slider-progress"
              />
              
              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skip(-10)}
                    className="text-white hover:bg-white/20"
                    data-testid="button-rewind"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skip(10)}
                    className="text-white hover:bg-white/20"
                    data-testid="button-forward"
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                    data-testid="button-mute"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  
                  <div className="w-20">
                    <Slider
                      value={[volume]}
                      max={1}
                      step={0.1}
                      onValueChange={handleVolumeChange}
                      className="w-full"
                    />
                  </div>
                  
                  <span className="text-white text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                  data-testid="button-fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Video Information */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-xl text-white" data-testid={`text-video-title-${video.id}`}>
                {video.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge className={getDifficultyColor(video.difficulty)}>
                  {video.difficulty}
                </Badge>
                {video.cmeCredits && (
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {video.cmeCredits} CME Credits
                  </Badge>
                )}
                <Badge variant="outline" className="text-cyan-300 border-cyan-500/30">
                  {Math.floor(video.duration / 60)}min
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-500/30">
                  {(video.views || 0).toLocaleString()} views
                </Badge>
              </div>
            </div>
            
            {/* Action Buttons */}
            {isAuthenticated && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleLikeMutation.mutate()}
                  disabled={toggleLikeMutation.isPending}
                  className="border-white/20 hover:bg-white/10"
                  data-testid={`button-like-${video.id}`}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {video.likes}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFavoriteMutation.mutate()}
                  disabled={toggleFavoriteMutation.isPending}
                  className="border-white/20 hover:bg-white/10"
                  data-testid={`button-favorite-${video.id}`}
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-300 leading-relaxed">{video.description}</p>
          
          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {video.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageCircle className="w-5 h-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Add Comment */}
          {isAuthenticated ? (
            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                data-testid="input-comment"
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || addCommentMutation.isPending}
                className="bg-cyan-600 hover:bg-cyan-700"
                data-testid="button-add-comment"
              >
                {addCommentMutation.isPending ? 'Adding...' : 'Add Comment'}
              </Button>
            </div>
          ) : (
            <p className="text-gray-400 italic">Sign in to add comments</p>
          )}
          
          <Separator className="bg-white/10" />
          
          {/* Comments List */}
          <div className="space-y-4">
            {commentsLoading ? (
              <div className="text-gray-400">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="text-gray-400 italic">No comments yet</div>
            ) : (
              comments.map((comment: VideoComment) => (
                <div key={comment.id} className="flex gap-3" data-testid={`comment-${comment.id}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-cyan-600 text-white text-xs">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        Anonymous
                      </span>
                      <span className="text-xs text-gray-400">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Unknown date'}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}