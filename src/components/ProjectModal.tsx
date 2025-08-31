import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Project {
  id: string;
  name: string;
  partner: string;
  subtitle: string;
  imageUrl: string;
  backgroundColor: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, 'id'>) => void;
  project?: Project | null;
}

export const ProjectModal = ({ isOpen, onClose, onSave, project }: ProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    partner: "",
    subtitle: "",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    backgroundColor: "bg-slate-800"
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        partner: project.partner,
        subtitle: project.subtitle,
        imageUrl: project.imageUrl,
        backgroundColor: project.backgroundColor
      });
    } else {
      setFormData({
        name: "",
        partner: "",
        subtitle: "",
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
        backgroundColor: "bg-slate-800"
      });
    }
  }, [project, isOpen]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, imageUrl: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {project ? "Chỉnh sửa dự án" : "Thêm dự án mới"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              Hình ảnh nền dự án
            </Label>
            <div className="aspect-video bg-accent rounded-lg flex items-center justify-center overflow-hidden border border-border">
              <img 
                src={formData.imageUrl}
                alt="Project preview" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="project-image-upload"
            />
            <Button 
              type="button"
              variant="outline"
              onClick={() => document.getElementById('project-image-upload')?.click()}
              className="mt-2 w-full"
            >
              Chọn ảnh
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="project-name" className="text-sm font-medium text-foreground mb-2 block">
                Tên dự án
              </Label>
              <Input
                id="project-name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ví dụ: Dự án Alpha"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="project-partner" className="text-sm font-medium text-foreground mb-2 block">
                Tên đối tác
              </Label>
              <Input
                id="project-partner"
                value={formData.partner}
                onChange={(e) => handleChange('partner', e.target.value)}
                placeholder="Ví dụ: Doanh nghiệp ABC"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="project-subtitle" className="text-sm font-medium text-foreground mb-2 block">
              Tiêu đề phụ
            </Label>
            <Input
              id="project-subtitle"
              value={formData.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="Ví dụ: Xây dựng Thương hiệu"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              Lưu dự án
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};