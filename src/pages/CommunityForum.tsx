
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  MessageSquare, 
  ThumbsUp, 
  Calendar, 
  User, 
  Users, 
  Eye, 
  MessageCircle, 
  ArrowUp, 
  ArrowDown,
  Search,
  Flame,
  Clock
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Sample data for the community forum
const forumPosts = [
  {
    id: 1,
    title: "Best practices for organic rice farming?",
    author: "RiceFarmer42",
    authorAvatar: "RF",
    category: "Organic Farming",
    content: "I've been growing rice for 5 years but want to transition to organic methods. What are some effective organic pest control methods that won't compromise yield too much?",
    date: "2 days ago",
    upvotes: 24,
    comments: 8,
    views: 156,
    tags: ["rice", "organic", "pest-control"]
  },
  {
    id: 2,
    title: "Dealing with wheat rust - urgent help needed",
    author: "WheatGrower",
    authorAvatar: "WG",
    category: "Plant Diseases",
    content: "My wheat crop is showing signs of rust. Yellow patches appearing on leaves. What fungicides are most effective at this stage? Any natural remedies?",
    date: "14 hours ago",
    upvotes: 32,
    comments: 15,
    views: 203,
    tags: ["wheat", "disease", "rust", "urgent"]
  },
  {
    id: 3,
    title: "New subsidy scheme for drip irrigation - anyone applied?",
    author: "WaterConserver",
    authorAvatar: "WC",
    category: "Government Schemes",
    content: "The government announced a new subsidy for drip irrigation systems last month. Has anyone applied and received approval? How complicated is the process?",
    date: "3 days ago",
    upvotes: 45,
    comments: 23,
    views: 511,
    tags: ["irrigation", "subsidy", "government"]
  },
  {
    id: 4,
    title: "Best crop rotation strategy for North Indian soil",
    author: "PunjabFarmer",
    authorAvatar: "PF",
    category: "Crop Management",
    content: "I'm planning my crop rotation for the next three seasons. Currently growing wheat. What would be the best follow-up crops to maintain soil health in Punjab region?",
    date: "1 week ago",
    upvotes: 38,
    comments: 27,
    views: 342,
    tags: ["crop-rotation", "soil-health", "north-india"]
  },
  {
    id: 5,
    title: "Drone technology for small farms - worth it?",
    author: "TechFarmer",
    authorAvatar: "TF",
    category: "Technology",
    content: "I'm considering investing in a basic agricultural drone for my 5-acre farm. Is it worth the cost for a small farm? What specific benefits have you seen?",
    date: "4 days ago",
    upvotes: 29,
    comments: 19,
    views: 274,
    tags: ["technology", "drones", "small-farm"]
  },
  {
    id: 6,
    title: "Best market prices for organic vegetables in Delhi NCR",
    author: "OrganicSeller",
    authorAvatar: "OS",
    category: "Market & Prices",
    content: "I grow organic vegetables and am looking for the best markets to sell in Delhi NCR. Which markets offer the best prices and have good footfall for organic produce?",
    date: "5 days ago",
    upvotes: 31,
    comments: 22,
    views: 289,
    tags: ["marketing", "organic", "delhi"]
  }
];

const CommunityForum = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter posts based on search term
  const filteredPosts = forumPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Sort posts based on active tab
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === 'popular') return b.upvotes - a.upvotes;
    if (activeTab === 'recent') return new Date(b.date) > new Date(a.date) ? 1 : -1;
    if (activeTab === 'discussed') return b.comments - a.comments;
    return 0;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Community Forum</h1>
            <p className="text-muted-foreground">Connect with fellow farmers and share knowledge</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Join Groups
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {['Crop Management', 'Pest Control', 'Organic Farming', 'Technology', 'Government Schemes', 'Market & Prices', 'Weather', 'Livestock', 'Equipment'].map((category, index) => (
                    <div key={index} className="flex items-center justify-between group cursor-pointer">
                      <span className="text-sm group-hover:text-primary transition-colors">{category}</span>
                      <Badge variant="outline" className="text-xs">{Math.floor(Math.random() * 100) + 5}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View All Categories
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Active Members</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {['KisanExpert', 'TechFarmer', 'OrganicGuru', 'WheatMaster', 'SoilScientist'].map((member, index) => (
                    <div key={index} className="flex items-center gap-3 group cursor-pointer">
                      <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                        <span className="text-xs">{member.slice(0, 2)}</span>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium group-hover:text-primary transition-colors">{member}</div>
                        <div className="text-xs text-muted-foreground">{5 + index} posts this week</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View All Members
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="popular" className="flex items-center flex-1">
                      <Flame className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Popular</span>
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="flex items-center flex-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Recent</span>
                    </TabsTrigger>
                    <TabsTrigger value="discussed" className="flex items-center flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Most Discussed</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="space-y-4">
              {sortedPosts.length > 0 ? (
                sortedPosts.map((post) => (
                  <Card key={post.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-2 pt-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUp className="h-5 w-5" />
                          </Button>
                          <span className="font-medium text-sm">{post.upvotes}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowDown className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                            <Badge variant="outline" className="w-fit">
                              {post.category}
                            </Badge>
                            
                            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {post.date}
                              </div>
                              <Separator orientation="vertical" className="h-3" />
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {post.views} views
                              </div>
                              <Separator orientation="vertical" className="h-3" />
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {post.comments} comments
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.content}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <div className="flex h-full w-full items-center justify-center bg-muted">
                                  {post.authorAvatar}
                                </div>
                              </Avatar>
                              <div className="text-sm font-medium">{post.author}</div>
                            </div>
                            
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No posts found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm 
                          ? `No posts matching "${searchTerm}"`
                          : "There are no posts to display"
                        }
                      </p>
                      <Button>Create New Post</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {filteredPosts.length > 0 && (
              <div className="flex justify-center">
                <Button variant="outline">Load More Posts</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityForum;
