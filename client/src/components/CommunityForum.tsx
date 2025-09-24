import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Search, Plus, MessageCircle, ThumbsUp, Clock, Pin, CheckCircle } from "lucide-react";
import { insertForumPostSchema, type InsertForumPost } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface CommunityForumProps {
  onBack: () => void;
}

interface ForumPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  specialty: string | null;
  tags: string[];
  isPinned: boolean;
  replyCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

const formSchema = insertForumPostSchema.omit({
  authorId: true // Will be set server-side from authenticated user
}).extend({
  tags: insertForumPostSchema.shape.tags.optional()
});

// Mock data for existing component functionality
const mockPosts = [
  {
    id: "1",
    title: "Tips for difficult gallbladder cases?",
    content: "Having trouble with some challenging lap choles lately. Any veteran techs have advice for tricky anatomy situations?",
    author: "TechSarah_5yrs",
    authorInitials: "S",
    isVerified: true,
    specialty: "General Surgery",
    timeAgo: "2 hours ago",
    replies: 8,
    likes: 12,
    isPinned: false,
    tags: ["laparoscopic", "gallbladder", "tips"]
  },
  {
    id: "2", 
    title: "PINNED: New instrument cleaning protocols",
    content: "Updated protocols for cleaning laparoscopic instruments per new hospital guidelines. Please review and discuss any questions.",
    author: "AdminTech",
    authorInitials: "A",
    isVerified: true,
    specialty: "Administration",
    timeAgo: "1 day ago",
    replies: 23,
    likes: 45,
    isPinned: true,
    tags: ["protocols", "cleaning", "instruments"]
  },
  {
    id: "3",
    title: "Orthopedic surgeon preferences database",
    content: "Starting a thread to collect common orthopedic surgeon preferences. Please share (no patient info obviously!) typical requests you see.",
    author: "OrthoBones",
    authorInitials: "B",
    isVerified: true,
    specialty: "Orthopedics",
    timeAgo: "3 hours ago",
    replies: 15,
    likes: 28,
    isPinned: false,
    tags: ["orthopedics", "preferences", "surgeons"]
  }
];

const categories = [
  "All",
  "General Surgery",
  "Orthopedics", 
  "Cardiovascular",
  "Neurosurgery",
  "Gynecology",
  "Questions",
  "Tips & Tricks",
  "Protocols"
];

export default function CommunityForum({ onBack }: CommunityForumProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showNewPost, setShowNewPost] = useState(false);

  // Fetch forum posts
  const { data: posts, isLoading: postsLoading } = useQuery<ForumPost[]>({
    queryKey: ['/api/forum/posts'],
    queryFn: async () => {
      const response = await fetch('/api/forum/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });

  // Form for creating new posts
  const form = useForm<InsertForumPost>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      specialty: "",
      tags: []
    }
  });

  // Create new post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: InsertForumPost) => {
      const response = await apiRequest('POST', '/api/forum/posts', postData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/forum/posts'] });
      setShowNewPost(false);
      form.reset();
      toast({
        title: 'Post created!',
        description: 'Your post has been published to the community.'
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create post',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const onSubmit = (data: InsertForumPost) => {
    console.log('Form submitted', { user, data });
    if (!user) {
      console.log('User not authenticated, showing toast');
      toast({
        title: 'Authentication required',
        description: 'Please sign in to create posts.',
        variant: 'destructive'
      });
      return;
    }
    console.log('Creating post mutation');
    createPostMutation.mutate(data);
  };

  // Use real data if available, fallback to mock data
  const postsToUse = posts || mockPosts;
  
  const filteredPosts = postsToUse.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = selectedCategory === "All" || 
                           post.specialty === selectedCategory ||
                           (selectedCategory === "Questions" && post.title.includes("?")) ||
                           (selectedCategory === "Tips & Tricks" && post.tags && post.tags.includes("tips")) ||
                           (selectedCategory === "Protocols" && post.tags && post.tags.includes("protocols"));
    return matchesSearch && matchesCategory;
  });

  // Helper function to convert tags string to array
  const parseTagsString = (tagsString: string): string[] => {
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Community Forum</h1>
          <p className="text-sm text-muted-foreground">Connect with fellow surgical technologists</p>
        </div>
        <Button 
          onClick={() => setShowNewPost(!showNewPost)}
          data-testid="button-new-post"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-forum"
        />
      </div>

      {/* Loading State */}
      {postsLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading discussions...</p>
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Badge 
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className="cursor-pointer hover-elevate"
            onClick={() => setSelectedCategory(category)}
            data-testid={`badge-category-${category}`}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Create New Post</CardTitle>
            <CardDescription className="text-xs">
              Share knowledge, ask questions, or start discussions with the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Post title..."
                          data-testid="input-post-title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="What would you like to discuss? Remember - no patient-identifying information!"
                          className="min-h-[100px]"
                          data-testid="textarea-post-content"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Category (e.g., General Surgery)"
                            data-testid="input-post-category"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Input
                      placeholder="Tags (comma separated)"
                      data-testid="input-post-tags"
                      onChange={(e) => {
                        const tags = parseTagsString(e.target.value);
                        form.setValue('tags', tags);
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createPostMutation.isPending}
                    data-testid="button-submit-post"
                  >
                    {createPostMutation.isPending ? 'Posting...' : 'Post'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowNewPost(false)}
                    data-testid="button-cancel-post"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card 
            key={post.id} 
            className={`cursor-pointer hover-elevate ${post.isPinned ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => console.log('Post clicked:', post.id)}
            data-testid={`card-post-${post.id}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">{post.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {post.isPinned && <Pin className="h-3 w-3 text-primary" />}
                    <h3 className="font-semibold text-sm line-clamp-2">{post.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      {post.author}
                      {post.isVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
                    </span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">{post.specialty}</Badge>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.timeAgo}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.content}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.replies} replies
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {post.likes} likes
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No discussions found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your search or browse different categories
          </p>
          <Button onClick={() => setShowNewPost(true)} data-testid="button-start-discussion">
            Start a Discussion
          </Button>
        </div>
      )}

      {/* Community Guidelines */}
      <Card className="mt-6 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">
            Community Guidelines
          </h4>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <li>• No patient-identifying information (HIPAA compliance)</li>
            <li>• Be respectful and professional at all times</li>
            <li>• Share knowledge and learn from others</li>
            <li>• Report inappropriate content to moderators</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}