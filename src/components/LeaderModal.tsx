import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Leader {
  id: string;
  name: string;
  title: string;
  description?: string;
  imageUrl: string;
}

interface LeaderModalProps {
  leader: Leader | null;
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSave: (leader: Omit<Leader, 'id'>) => void;
}

export const LeaderModal = ({ leader, isOpen, isEditing, onClose, onSave }: LeaderModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  });

  useEffect(() => {
    if (isEditing && leader) {
      setFormData({
        name: leader.name,
        title: leader.title,
        description: leader.description || "",
        imageUrl: leader.imageUrl
      });
    } else {
      setFormData({
        name: "",
        title: "",
        description: "",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
      });
    }
  }, [leader, isEditing, isOpen]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Chỉnh sửa Leader' : 'Thêm Leader Mới'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-6 py-4">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">Ảnh đại diện</Label>
            <div className="flex items-center space-x-4">
              <img 
                src={formData.imageUrl}
                alt="Avatar preview" 
                className="w-24 h-24 rounded-full object-cover bg-accent"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="leader-image-upload"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={() => document.getElementById('leader-image-upload')?.click()}
              >
                Chọn ảnh
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="leader-name" className="text-sm font-medium text-foreground mb-2">
              Họ và Tên
            </Label>
            <Input
              id="leader-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="leader-title" className="text-sm font-medium text-foreground mb-2">
              Chức vụ
            </Label>
            <Input
              id="leader-title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="leader-description" className="text-sm font-medium text-foreground mb-2">
              Mô tả ngắn
            </Label>
            <Textarea
              id="leader-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              Lưu
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};