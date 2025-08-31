import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { DashboardPage } from "@/pages/Dashboard";

Chart.register(...registerables);

interface OverviewProps {
  onNavigate: (page: DashboardPage) => void;
}

export const Overview = ({ onNavigate }: OverviewProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5', 'Tuần 6'],
            datasets: [{
              label: 'Số đơn đăng ký',
              data: [12, 19, 3, 5, 2, 8],
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }, []);

  const recentApplications = [
    {
      name: "Nguyễn Văn An",
      time: "2 giờ trước",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Lê Thị Bình",
      time: "Hôm qua",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Phạm Văn Cường",
      time: "27/08/2025",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-foreground">Tổng quan</h2>
      <p className="text-muted-foreground mt-1">Báo cáo nhanh về tình hình tuyển dụng của team.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground">Số đơn mới</h3>
          <p className="text-4xl font-bold text-card-foreground mt-2">12</p>
          <p className="text-xs text-success mt-1">+5 so với tuần trước</p>
        </div>
        
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground">Chờ phỏng vấn</h3>
          <p className="text-4xl font-bold text-card-foreground mt-2">8</p>
          <p className="text-xs text-muted-foreground mt-1">2 ứng viên đã lên lịch</p>
        </div>
        
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground">Tỷ lệ chấp thuận</h3>
          <p className="text-4xl font-bold text-card-foreground mt-2">35%</p>
          <p className="text-xs text-destructive mt-1">-2% so với tháng trước</p>
        </div>
        
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground">Tổng số đơn</h3>
          <p className="text-4xl font-bold text-card-foreground mt-2">152</p>
          <p className="text-xs text-muted-foreground mt-1">Tính từ đầu chiến dịch</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-lg font-bold text-card-foreground">Thống kê đơn theo tuần</h3>
          <div className="mt-4 h-80">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-lg font-bold text-card-foreground">Đơn đăng ký gần đây</h3>
          <ul className="mt-4 space-y-4">
            {recentApplications.map((app, index) => (
              <li key={index} className="flex items-center">
                <img 
                  className="w-10 h-10 rounded-full mr-3" 
                  src={app.avatar}
                  alt={app.name}
                />
                <div className="text-sm">
                  <p className="font-semibold text-card-foreground">{app.name}</p>
                  <p className="text-muted-foreground">{app.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => onNavigate('applications')}
            className="mt-6 block w-full text-center py-2 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/80 transition-colors"
          >
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  );
};