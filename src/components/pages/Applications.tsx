import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationModal } from "@/components/ApplicationModal";

interface Application {
  id: string;
  name: string;
  email: string;
  source: string;
  date: string;
  status: string;
  telegram?: string;
  motivation?: string;
  goals?: string;
  timeCommitment?: string;
}

const mockApplications: Application[] = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    source: "Kênh YouTube",
    date: "29/08/2025",
    status: "new",
    telegram: "@annv",
    motivation: "Tôi đã theo dõi kênh YouTube của chị Nhi Lê từ lâu và rất ngưỡng mộ những giá trị mà team đang xây dựng. Tôi muốn được đóng góp một phần công sức và học hỏi trong một môi trường chuyên nghiệp, ý nghĩa.",
    goals: "Mong muốn lớn nhất của tôi là được học hỏi các kỹ năng thực tế về vận hành và AI, đồng thời kết nối với những người cùng chí hướng để phát triển bản thân.",
    timeCommitment: "15 - 20 giờ / tuần"
  },
  {
    id: "2",
    name: "Lê Thị Bình",
    email: "binh.le@email.com",
    source: "Facebook",
    date: "28/08/2025",
    status: "contacted",
    telegram: "@binhle",
    motivation: "Tôi rất ấn tượng với những hoạt động thiện nguyện và giáo dục của team.",
    goals: "Muốn học hỏi và đóng góp cho cộng đồng.",
    timeCommitment: "10 - 15 giờ / tuần"
  },
  {
    id: "3",
    name: "Phạm Văn Cường",
    email: "cuong.pham@email.com",
    source: "Bạn bè giới thiệu",
    date: "27/08/2025",
    status: "interview",
    telegram: "@cuongpham",
    motivation: "Được bạn bè giới thiệu về team và cảm thấy rất phù hợp với định hướng của mình.",
    goals: "Phát triển kỹ năng và đóng góp cho dự án có ý nghĩa.",
    timeCommitment: "20+ giờ / tuần"
  }
];

const statusLabels = {
  new: "Mới",
  contacted: "Đã liên hệ",
  interview: "Phỏng vấn",
  accepted: "Chấp nhận",
  rejected: "Từ chối"
};

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  interview: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
};

export const Applications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  const openModal = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-foreground">Quản lý Người Ứng Tuyển</h2>
      <p className="text-muted-foreground mt-1">Xem và quản lý tất cả người ứng tuyển từ trang web.</p>
      
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input 
            type="text" 
            placeholder="Tìm kiếm theo tên, email..." 
            className="w-72"
          />
          <Button variant="outline">Lọc</Button>
        </div>
        <Button>Xuất file CSV</Button>
      </div>
      
      <div className="mt-6 bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-accent">
            <tr>
              <th scope="col" className="p-4">
                <input type="checkbox" />
              </th>
              <th scope="col" className="py-3 px-6 text-accent-foreground">Họ và Tên</th>
              <th scope="col" className="py-3 px-6 text-accent-foreground">Liên hệ</th>
              <th scope="col" className="py-3 px-6 text-accent-foreground">Nguồn</th>
              <th scope="col" className="py-3 px-6 text-accent-foreground">Ngày đăng ký</th>
              <th scope="col" className="py-3 px-6 text-accent-foreground">Trạng thái</th>
              <th scope="col" className="py-3 px-6 text-accent-foreground">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="bg-card border-b border-border hover:bg-accent/50">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="py-4 px-6 font-semibold text-card-foreground">{app.name}</td>
                <td className="py-4 px-6 text-card-foreground">{app.email}</td>
                <td className="py-4 px-6 text-card-foreground">{app.source}</td>
                <td className="py-4 px-6 text-card-foreground">{app.date}</td>
                <td className="py-4 px-6">
                  <Select 
                    value={app.status} 
                    onValueChange={(value) => handleStatusChange(app.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue>
                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[app.status as keyof typeof statusColors]}`}>
                          {statusLabels[app.status as keyof typeof statusLabels]}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => openModal(app)}
                    className="font-medium text-primary hover:underline"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Hiển thị 1-10 của 50 đơn</span>
        <div className="flex space-x-1">
          <Button variant="outline" size="sm">Trước</Button>
          <Button variant="outline" size="sm">1</Button>
          <Button size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Sau</Button>
        </div>
      </div>

      <ApplicationModal 
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={closeModal}
        onStatusChange={(status) => {
          if (selectedApplication) {
            handleStatusChange(selectedApplication.id, status);
          }
        }}
      />
    </div>
  );
};