import { useState } from "react";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const ContentStory = () => {
  const [content, setContent] = useState(`
    <p>Chúng tôi tin trong trái tim của mỗi người Việt Nam luôn chứa đựng niềm tin vào sức mạnh của lòng nhân ái và tri thức. Từ một ý tưởng nhỏ nhưng đầy nhiệt huyết, Nhi Le đã biến ước mơ của mình thành hiện thực thông qua việc thành lập <strong>NhiLe Team</strong>.</p>
    <p><br></p>
    <p>Đây là di sản mà chúng tôi muốn để lại cho thế hệ sau – một câu chuyện về niềm tin, lòng trắc ẩn và sức mạnh của sự đoàn kết.</p>
  `);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Đã lưu thành công",
      description: "Nội dung câu chuyện đã được cập nhật.",
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quản lý: Câu chuyện</h2>
          <p className="text-muted-foreground mt-1">Chỉnh sửa nội dung và hình ảnh cho trang "Câu chuyện".</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Hủy</Button>
          <Button onClick={handleSave}>Lưu thay đổi</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
            <h3 className="text-lg font-bold text-card-foreground mb-4">Nội dung chính</h3>
            <div className="bg-background">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
            <h3 className="text-lg font-bold text-card-foreground mb-4">Ảnh đại diện</h3>
            <div className="aspect-video bg-accent rounded-lg flex items-center justify-center border border-border overflow-hidden">
              <img 
                src={imageUrl}
                alt="Story preview" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <Button 
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="mt-4 w-full"
            >
              Thay đổi ảnh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};