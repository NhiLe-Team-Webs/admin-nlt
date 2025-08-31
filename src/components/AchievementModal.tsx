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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, X } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stats: { key: string; value: string }[];
  images: string[];
}

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (achievement: Omit<Achievement, 'id'>) => void;
  achievement?: Achievement | null;
}

export const AchievementModal = ({ isOpen, onClose, onSave, achievement }: AchievementModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    stats: [{ key: "5000+", value: "Thành viên" }],
    images: [] as string[]
  });

  useEffect(() => {
    if (achievement) {
      setFormData({
        title: achievement.title,
        subtitle: achievement.subtitle,
        description: achievement.description,
        stats: achievement.stats.length > 0 ? achievement.stats : [{ key: "5000+", value: "Thành viên" }],
        images: achievement.images
      });
    } else {
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        stats: [{ key: "5000+", value: "Thành viên" }],
        images: []
      });
    }
  }, [achievement, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { key: "", value: "" }]
    });
  };

  const removeStat = (index: number) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index)
    });
  };

  const updateStat = (index: number, field: 'key' | 'value', value: string) => {
    const newStats = [...formData.stats];
    newStats[index][field] = value;
    setFormData({ ...formData, stats: newStats });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, e.target?.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {achievement ? "Chỉnh sửa thành tựu" : "Thêm thành tựu mới"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden">
          <Tabs defaultValue="info" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Thông tin chung</TabsTrigger>
              <TabsTrigger value="details">Trang chi tiết</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-y-auto px-1">
              <TabsContent value="info" className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="achievement-title" className="text-sm font-medium text-foreground mb-2 block">
                    Tiêu đề thành tựu
                  </Label>
                  <Input
                    id="achievement-title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Ví dụ: Xây dựng Cộng đồng Học tập..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="achievement-subtitle" className="text-sm font-medium text-foreground mb-2 block">
                    Tên đơn vị liên quan
                  </Label>
                  <Input
                    id="achievement-subtitle"
                    value={formData.subtitle}
                    onChange={(e) => handleChange('subtitle', e.target.value)}
                    placeholder="Ví dụ: NhiLe Team Community"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="achievement-description" className="text-sm font-medium text-foreground mb-2 block">
                    Mô tả tóm tắt
                  </Label>
                  <Textarea
                    id="achievement-description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Viết mô tả ngắn gọn hiển thị trên trang danh sách..."
                    rows={4}
                    required
                  />
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-8 mt-6">
                <div>
                  <h4 className="text-md font-semibold text-foreground mb-3">Thành tựu nổi bật (Thông số)</h4>
                  <div className="space-y-3">
                    {formData.stats.map((stat, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Input
                          value={stat.key}
                          onChange={(e) => updateStat(index, 'key', e.target.value)}
                          placeholder="5000+"
                          className="w-1/3"
                        />
                        <Input
                          value={stat.value}
                          onChange={(e) => updateStat(index, 'value', e.target.value)}
                          placeholder="Thành viên"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="p-2 text-destructive hover:bg-destructive/10"
                          onClick={() => removeStat(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-3 text-sm text-primary hover:text-primary"
                    onClick={addStat}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Thêm thông số
                  </Button>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-foreground mb-3">Album hình ảnh cộng đồng</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img 
                          src={image} 
                          alt={`Achievement image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border border-border"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="album-upload"
                  />
                  <Label
                    htmlFor="album-upload"
                    className="block w-full text-center px-4 py-3 bg-background border-2 border-dashed border-border text-muted-foreground font-semibold rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    Nhấn để tải lên hoặc kéo thả ảnh vào đây
                  </Label>
                </div>
              </TabsContent>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-border bg-background">
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit">
                Lưu thành tựu
              </Button>
            </div>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
};