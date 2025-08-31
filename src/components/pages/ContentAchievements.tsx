import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AchievementModal } from "@/components/AchievementModal";
import { Pencil, Trash2 } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stats: { key: string; value: string }[];
  images: string[];
}

export const ContentAchievements = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Xây dựng Cộng đồng Học tập trên 5000 thành viên",
      subtitle: "NhiLe Team Community",
      description: "Phát triển và quản lý cộng đồng học tập trực tuyến, tạo ra một môi trường tích cực nơi các thành viên có thể chia sẻ kiến thức, hỗ trợ lẫn nhau...",
      stats: [
        { key: "5000+", value: "Thành viên" },
        { key: "500+", value: "Bài chia sẻ" }
      ],
      images: []
    }
  ]);

  const handleAddAchievement = () => {
    setEditingAchievement(null);
    setIsModalOpen(true);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setIsModalOpen(true);
  };

  const handleDeleteAchievement = (achievementId: string) => {
    setAchievements(achievements.filter(a => a.id !== achievementId));
    toast({
      title: "Đã xóa thành tựu",
      description: "Thành tựu đã được xóa thành công.",
    });
  };

  const handleSaveAchievement = (achievementData: Omit<Achievement, 'id'>) => {
    if (editingAchievement) {
      setAchievements(achievements.map(a => 
        a.id === editingAchievement.id 
          ? { ...achievementData, id: editingAchievement.id }
          : a
      ));
      toast({
        title: "Đã cập nhật thành tựu",
        description: "Thông tin thành tựu đã được cập nhật.",
      });
    } else {
      const newAchievement: Achievement = {
        ...achievementData,
        id: Date.now().toString()
      };
      setAchievements([...achievements, newAchievement]);
      toast({
        title: "Đã thêm thành tựu mới",
        description: "Thành tựu mới đã được thêm thành công.",
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quản lý: Thành tựu</h2>
          <p className="text-muted-foreground mt-1">Cập nhật các thành tựu và dự án nổi bật của team.</p>
        </div>
        <Button onClick={handleAddAchievement} className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Thêm thành tựu mới
        </Button>
      </div>

      <div className="bg-card rounded-2xl shadow-lg border border-border">
        <div className="p-6 space-y-6 divide-y divide-border">
          {achievements.map((achievement, index) => (
            <div key={achievement.id} className={`${index === 0 ? 'pt-0' : 'pt-6'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{achievement.subtitle}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-2 text-muted-foreground hover:bg-accent rounded-md"
                    onClick={() => handleEditAchievement(achievement)}
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-2 text-muted-foreground hover:bg-accent rounded-md"
                    onClick={() => handleDeleteAchievement(achievement.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-muted-foreground">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      <AchievementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAchievement}
        achievement={editingAchievement}
      />
    </div>
  );
};