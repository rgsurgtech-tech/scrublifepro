import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, MessageCircle, ThumbsUp, Clock, Pin, CheckCircle } from "lucide-react";

interface CommunityForumProps {
  onBack: () => void;
}

// TODO: Remove mock data when implementing real backend
const mockPosts = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
  },
  {
    id: 4,
    title: "Best practice for mayo stand organization?",
    content: "New tech here! What's your go-to mayo stand setup for general cases? Pictures would be amazing if allowed!",
    author: "NewTech_Learning",
    authorInitials: "N",
    isVerified: false,
    specialty: "General Surgery",
    timeAgo: "5 hours ago",
    replies: 31,
    likes: 19,
    isPinned: false,
    tags: ["mayo-stand", "organization", "newbie"]
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  });

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || 
                           post.specialty === selectedCategory ||
                           (selectedCategory === "Questions" && post.title.includes("?")) ||
                           (selectedCategory === "Tips & Tricks" && post.tags.includes("tips")) ||
                           (selectedCategory === "Protocols" && post.tags.includes("protocols"));
    return matchesSearch && matchesCategory;
  });

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New post submitted:', newPost);
    setShowNewPost(false);
    setNewPost({ title: "", content: "", category: "", tags: "" });
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
            <form onSubmit={handleNewPost} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  data-testid="input-post-title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="What would you like to discuss? Remember - no patient-identifying information!"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="min-h-[100px]"
                  data-testid="textarea-post-content"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Category (e.g., General Surgery)"
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  data-testid="input-post-category"
                />
                <Input
                  placeholder="Tags (comma separated)"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  data-testid="input-post-tags"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" data-testid="button-submit-post">Post</Button>
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