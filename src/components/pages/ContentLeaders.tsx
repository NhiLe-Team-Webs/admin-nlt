import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { LeaderModal } from "@/components/LeaderModal";
import { useToast } from "@/hooks/use-toast";

interface Leader {
  id: string;
  name: string;
  title: string;
  description?: string;
  imageUrl: string;
}

const initialLeaders: Leader[] = [
  {
    id: "1",
    name: "Nhi Le",
    title: "Người Sáng Lập",
    description: "Founder với tầm nhìn về tương lai AI và giáo dục",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Trần Minh Anh",
    title: "Trưởng Ban Đào Tạo",
    description: "Chuyên gia về phát triển nhân sự và đào tạo",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "Lê Hoàng Bách",
    title: "Quản Lý Cộng Đồng",
    description: "Xây dựng và duy trì mối quan hệ với cộng đồng",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  }
];

export const ContentLeaders = () => {
  const [leaders, setLeaders] = useState<Leader[]>(initialLeaders);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const openAddModal = () => {
    setSelectedLeader(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (leader: Leader) => {
    setSelectedLeader(leader);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLeader(null);
    setIsEditing(false);
  };

  const handleSaveLeader = (leaderData: Omit<Leader, 'id'>) => {
    if (isEditing && selectedLeader) {
      // Update existing leader
      setLeaders(prev => 
        prev.map(leader => 
          leader.id === selectedLeader.id 
            ? { ...leader, ...leaderData }
            : leader
        )
      );
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin leader đã được cập nhật.",
      });
    } else {
      // Add new leader
      const newLeader: Leader = {
        ...leaderData,
        id: Date.now().toString()
      };
      setLeaders(prev => [...prev, newLeader]);
      toast({
        title: "Thêm thành công",
        description: "Leader mới đã được thêm vào danh sách.",
      });
    }
    closeModal();
  };

  const handleDeleteLeader = (leaderId: string) => {
    setLeaders(prev => prev.filter(leader => leader.id !== leaderId));
    toast({
      title: "Xóa thành công",
      description: "Leader đã được xóa khỏi danh sách.",
      variant: "destructive"
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quản lý: Leaders</h2>
          <p className="text-muted-foreground mt-1">Thêm, sửa, hoặc xóa thông tin các leader của team.</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Thêm Leader mới</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {leaders.map((leader) => (
          <div key={leader.id} className="bg-card rounded-2xl shadow-lg border border-border p-6 text-center">
            <img 
              className="w-32 h-32 rounded-full mx-auto ring-4 ring-accent object-cover" 
              src={leader.imageUrl}
              alt={`Chân dung ${leader.name}`}
            />
            <div className="mt-4">
              <h3 className="text-lg font-bold text-card-foreground">{leader.name}</h3>
              <p className="text-sm text-muted-foreground font-medium">{leader.title}</p>
              {leader.description && (
                <p className="text-xs text-muted-foreground mt-2">{leader.description}</p>
              )}
              <div className="mt-4 flex justify-center space-x-3">
                <button 
                  onClick={() => openEditModal(leader)}
                  className="flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Sửa
                </button>
                <button 
                  onClick={() => handleDeleteLeader(leader.id)}
                  className="flex items-center text-sm font-semibold text-destructive hover:text-destructive/80 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LeaderModal
        leader={selectedLeader}
        isOpen={isModalOpen}
        isEditing={isEditing}
        onClose={closeModal}
        onSave={handleSaveLeader}
      />
    </div>
  );
};