import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Group {
  id: string;
  name: string;
}

interface Post {
  id: string;
  author: string;
  group: string;
  content: string;
  imageUrl?: string;
  avatar: string;
}

const initialGroups: Group[] = [
  { id: "1", name: "Học AI" },
  { id: "2", name: "Vận hành" },
  { id: "3", name: "Dạy con tuổi teen" }
];

const initialPosts: Post[] = [
  {
    id: "1",
    author: "Trần Minh Anh",
    group: "Nhóm Học AI",
    content: "Buổi học đầu tiên về Generative AI đã diễn ra rất thành công! Cảm ơn cả nhà đã tham gia...",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

export const ContentCommunity = () => {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  
  const [groupFormData, setGroupFormData] = useState({ name: "" });
  const [postFormData, setPostFormData] = useState({
    content: "",
    group: "",
    imageUrl: ""
  });

  const { toast } = useToast();

  // Group Management
  const openAddGroupModal = () => {
    setSelectedGroup(null);
    setIsEditingGroup(false);
    setGroupFormData({ name: "" });
    setIsGroupModalOpen(true);
  };

  const openEditGroupModal = (group: Group) => {
    setSelectedGroup(group);
    setIsEditingGroup(true);
    setGroupFormData({ name: group.name });
    setIsGroupModalOpen(true);
  };

  const handleSaveGroup = () => {
    if (!groupFormData.name.trim()) return;

    if (isEditingGroup && selectedGroup) {
      setGroups(prev => 
        prev.map(g => g.id === selectedGroup.id ? { ...g, name: groupFormData.name } : g)
      );
      toast({
        title: "Cập nhật thành công",
        description: "Nhóm đã được cập nhật.",
      });
    } else {
      const newGroup: Group = {
        id: Date.now().toString(),
        name: groupFormData.name
      };
      setGroups(prev => [...prev, newGroup]);
      toast({
        title: "Thêm thành công",
        description: "Nhóm mới đã được tạo.",
      });
    }
    
    setIsGroupModalOpen(false);
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(prev => prev.filter(g => g.id !== groupId));
    toast({
      title: "Xóa thành công",
      description: "Nhóm đã được xóa.",
      variant: "destructive"
    });
  };

  // Post Management
  const openCreatePostModal = () => {
    setPostFormData({ content: "", group: groups[0]?.name || "", imageUrl: "" });
    setIsPostModalOpen(true);
  };

  const handleCreatePost = () => {
    if (!postFormData.content.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: "Admin",
      group: postFormData.group,
      content: postFormData.content,
      imageUrl: postFormData.imageUrl,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    };

    setPosts(prev => [newPost, ...prev]);
    setIsPostModalOpen(false);
    toast({
      title: "Đăng bài thành công",
      description: "Bài viết đã được đăng.",
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    toast({
      title: "Xóa bài viết",
      description: "Bài viết đã được xóa.",
      variant: "destructive"
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostFormData(prev => ({ 
          ...prev, 
          imageUrl: e.target?.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-foreground">Quản lý: Cộng đồng</h2>
      <p className="text-muted-foreground mt-1">Quản lý nhóm và các bài đăng trong cộng đồng.</p>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Group Management */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-border sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-card-foreground">Các Nhóm Học Tập</h3>
              <Button
                size="sm"
                onClick={openAddGroupModal}
                className="p-2 h-auto w-auto"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <ul className="space-y-2">
              {groups.map((group) => (
                <li key={group.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                  <span className="text-foreground">{group.name}</span>
                  <div className="space-x-2">
                    <button 
                      onClick={() => openEditGroupModal(group)}
                      className="text-xs font-semibold text-primary hover:text-primary/80"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDeleteGroup(group.id)}
                      className="text-xs font-semibold text-destructive hover:text-destructive/80"
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Right Column: Post Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post Area */}
          <div className="bg-card p-4 rounded-2xl shadow-lg border border-border">
            <div className="flex items-start space-x-4">
              <img 
                className="w-12 h-12 rounded-full object-cover" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Admin Avatar"
              />
              <button
                onClick={openCreatePostModal}
                className="flex-1 bg-accent text-muted-foreground rounded-full py-3 px-4 text-left hover:bg-accent/80 transition-colors"
              >
                Bạn muốn chia sẻ điều gì?
              </button>
            </div>
          </div>
          
          {/* Post List */}
          {posts.map((post) => (
            <div key={post.id} className="bg-card p-5 rounded-2xl shadow-lg border border-border">
              <div className="flex items-center mb-4">
                <img 
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                  src={post.avatar}
                  alt={`${post.author} avatar`}
                />
                <div>
                  <p className="font-bold text-card-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    đã đăng trong <span className="font-semibold text-card-foreground">{post.group}</span>
                  </p>
                </div>
              </div>
              <p className="text-card-foreground mb-4">{post.content}</p>
              {post.imageUrl && (
                <img 
                  src={post.imageUrl}
                  className="rounded-xl w-full max-h-96 object-cover" 
                  alt="Post image"
                />
              )}
              <div className="mt-4 flex justify-end space-x-3">
                <button className="text-sm font-semibold text-primary hover:text-primary/80">
                  Sửa
                </button>
                <button 
                  onClick={() => handleDeletePost(post.id)}
                  className="text-sm font-semibold text-destructive hover:text-destructive/80"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Add/Edit Modal */}
      <Dialog open={isGroupModalOpen} onOpenChange={setIsGroupModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditingGroup ? 'Chỉnh sửa nhóm' : 'Thêm nhóm mới'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="group-name" className="text-sm font-medium mb-2">
                Tên nhóm
              </Label>
              <Input
                id="group-name"
                placeholder="Ví dụ: U40+ học Tech"
                value={groupFormData.name}
                onChange={(e) => setGroupFormData({ name: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsGroupModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveGroup}>
              Lưu nhóm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Post Create Modal */}
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tạo bài viết</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Bạn muốn chia sẻ điều gì?"
              rows={5}
              value={postFormData.content}
              onChange={(e) => setPostFormData(prev => ({ ...prev, content: e.target.value }))}
            />
            
            <div>
              <Label className="text-sm font-medium mb-2">Đăng vào nhóm</Label>
              <Select 
                value={postFormData.group} 
                onValueChange={(value) => setPostFormData(prev => ({ ...prev, group: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.name}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="post-image-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('post-image-upload')?.click()}
                className="w-full border-dashed"
              >
                <Image className="w-6 h-6 mr-2" />
                Thêm ảnh/video
              </Button>
              {postFormData.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={postFormData.imageUrl} 
                    alt="Preview" 
                    className="max-h-32 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreatePost} className="w-full">
              Đăng bài
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};