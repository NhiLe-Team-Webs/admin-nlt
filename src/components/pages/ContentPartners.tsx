import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Partner {
  id: string;
  name: string;
  title: string;
  testimonial: string;
  avatar: string;
}

const initialPartners: Partner[] = [
  {
    id: "1",
    name: "Hoàng An",
    title: "CEO Timbre Group",
    testimonial: "Đội ngũ NhiLe Team tràn đầy sự tích cực và năng lượng tốt. Sự đồng đều và trơn tru khi làm việc cùng họ làm tôi rất bất ngờ, ngôn ngữ đã không còn là rào cản khi làm việc cùng NhiLe Team.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Chị Thu Trang",
    title: "Giám đốc Tổ chức XYZ",
    testimonial: "Điều tôi ấn tượng nhất là giá trị 'Tâm' mà NhiLe Team mang vào từng công việc. Họ làm việc bằng cả trái tim và sự chính trực, tạo ra những kết quả vượt ngoài mong đợi.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  }
];

export const ContentPartners = () => {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    testimonial: "",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  });

  const { toast } = useToast();

  const openAddModal = () => {
    setSelectedPartner(null);
    setIsEditing(false);
    setFormData({
      name: "",
      title: "",
      testimonial: "",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsEditing(true);
    setFormData({
      name: partner.name,
      title: partner.title,
      testimonial: partner.testimonial,
      avatar: partner.avatar
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.testimonial.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && selectedPartner) {
      setPartners(prev => 
        prev.map(p => p.id === selectedPartner.id ? { ...p, ...formData } : p)
      );
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin đối tác đã được cập nhật.",
      });
    } else {
      const newPartner: Partner = {
        ...formData,
        id: Date.now().toString()
      };
      setPartners(prev => [...prev, newPartner]);
      toast({
        title: "Thêm thành công",
        description: "Đối tác mới đã được thêm.",
      });
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (partnerId: string) => {
    setPartners(prev => prev.filter(p => p.id !== partnerId));
    toast({
      title: "Xóa thành công",
      description: "Đối tác đã được xóa.",
      variant: "destructive"
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          avatar: e.target?.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quản lý: Đối tác</h2>
          <p className="text-muted-foreground mt-1">Thêm, sửa, hoặc xóa các đánh giá của đối tác.</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Thêm đối tác</span>
        </Button>
      </div>

      <div className="bg-card rounded-2xl shadow-lg border border-border">
        <ul>
          {partners.map((partner, index) => (
            <li 
              key={partner.id} 
              className={`flex items-start p-6 space-x-6 ${
                index < partners.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <img 
                src={partner.avatar}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                alt={partner.name}
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-card-foreground">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">{partner.title}</p>
                  </div>
                  <div className="space-x-3 flex-shrink-0">
                    <button 
                      onClick={() => openEditModal(partner)}
                      className="text-sm font-semibold text-primary hover:text-primary/80"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDelete(partner.id)}
                      className="text-sm font-semibold text-destructive hover:text-destructive/80"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-card-foreground italic leading-relaxed">
                  "{partner.testimonial}"
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Partner Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Chỉnh sửa đối tác' : 'Thêm đối tác mới'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Label className="text-sm font-medium mb-2">Ảnh đại diện</Label>
                <div className="aspect-square bg-accent rounded-lg overflow-hidden">
                  <img 
                    src={formData.avatar}
                    alt="Partner Avatar Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="partner-avatar-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('partner-avatar-upload')?.click()}
                  className="mt-2 w-full"
                >
                  Chọn ảnh
                </Button>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <div>
                  <Label htmlFor="partner-name" className="text-sm font-medium mb-2">
                    Tên đối tác
                  </Label>
                  <Input
                    id="partner-name"
                    placeholder="Ví dụ: Hoàng An"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="partner-title" className="text-sm font-medium mb-2">
                    Chức vụ & Công ty
                  </Label>
                  <Input
                    id="partner-title"
                    placeholder="Ví dụ: CEO Timbre Group"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="partner-testimonial" className="text-sm font-medium mb-2">
                Nội dung đánh giá
              </Label>
              <Textarea
                id="partner-testimonial"
                rows={6}
                placeholder="Nhập nội dung testimonial của đối tác..."
                value={formData.testimonial}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave}>
              Lưu đối tác
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};