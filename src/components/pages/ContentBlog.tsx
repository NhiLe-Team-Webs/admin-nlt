import { useState } from "react";
import ReactQuill from "react-quill-new";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Edit } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  publishedDate: string;
  status: 'published' | 'draft';
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tâm - Tầm - Đức: Nền tảng của một Leader',
    author: 'Nhi Le',
    category: 'Phát triển bản thân',
    publishedDate: '29/08/2025',
    status: 'published'
  },
  {
    id: '2',
    title: 'Tổng kết dự án thiện nguyện "Ánh Sáng Tri Thức"',
    author: 'Minh Anh',
    category: 'Hoạt động cộng đồng',
    publishedDate: '15/08/2025',
    status: 'published'
  },
  {
    id: '3',
    title: '5 ứng dụng AI cho công việc bạn nên biết',
    author: 'Hoàng Bách',
    category: 'Công nghệ',
    publishedDate: '-',
    status: 'draft'
  }
];

export const ContentBlog = () => {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [editorContent, setEditorContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const { toast } = useToast();

  const handleNewPost = () => {
    setEditingPost(null);
    setPostTitle('');
    setEditorContent('');
    setSelectedCategory('');
    setTags('');
    setFeaturedImage('');
    setView('editor');
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setSelectedCategory(post.category);
    setView('editor');
  };

  const handleBackToList = () => {
    setView('list');
    setEditingPost(null);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Bản nháp đã được lưu",
      description: "Bài viết đã được lưu dưới dạng bản nháp.",
    });
  };

  const handlePublish = () => {
    if (!postTitle.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tiêu đề bài viết.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Đã xuất bản thành công",
      description: "Bài viết đã được xuất bản lên website.",
    });
    
    setView('list');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFeaturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['image', 'video', 'blockquote'],
      ['clean']
    ],
  };

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Đã xuất bản</Badge>;
    }
    return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Bản nháp</Badge>;
  };

  if (view === 'editor') {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToList}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại danh sách bài viết
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              Lưu nháp
            </Button>
            <Button onClick={handlePublish}>
              Xuất bản
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Input
              type="text"
              placeholder="Thêm tiêu đề bài viết"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="text-3xl font-bold border-0 focus-visible:ring-0 px-2 py-1 h-auto text-foreground placeholder:text-muted-foreground"
            />
            
            <div className="bg-card rounded-xl border border-border">
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
                modules={modules}
                placeholder="Bắt đầu viết câu chuyện của bạn..."
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground border-b border-border pb-3 mb-4">
                Tùy chọn
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Chuyên mục
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chuyên mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Phát triển bản thân">Phát triển bản thân</SelectItem>
                      <SelectItem value="Công nghệ">Công nghệ</SelectItem>
                      <SelectItem value="Hoạt động cộng đồng">Hoạt động cộng đồng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Thẻ (tags)
                  </label>
                  <Input
                    type="text"
                    placeholder="Nhập thẻ, cách nhau bởi dấu phẩy"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Ảnh đại diện
              </h3>
              
              {featuredImage && (
                <div className="aspect-video bg-accent rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={featuredImage} 
                    alt="Featured preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="featured-image-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('featured-image-upload')?.click()}
                className="w-full"
              >
                Tải ảnh lên
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quản lý: Blog</h2>
          <p className="text-muted-foreground mt-1">
            Tạo, chỉnh sửa và quản lý các bài viết trên trang.
          </p>
        </div>
        <Button onClick={handleNewPost} className="flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Viết bài mới
        </Button>
      </div>

      <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50">
              <tr>
                <th className="py-3 px-6 text-muted-foreground">Tiêu đề</th>
                <th className="py-3 px-6 text-muted-foreground">Tác giả</th>
                <th className="py-3 px-6 text-muted-foreground">Chuyên mục</th>
                <th className="py-3 px-6 text-muted-foreground">Ngày đăng</th>
                <th className="py-3 px-6 text-muted-foreground">Trạng thái</th>
                <th className="py-3 px-6 text-muted-foreground">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post, index) => (
                <tr key={post.id} className={`border-b border-border hover:bg-muted/30 ${index === blogPosts.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="py-4 px-6 font-semibold text-card-foreground">
                    {post.title}
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    {post.author}
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    {post.category}
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    {post.publishedDate}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPost(post)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};