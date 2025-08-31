import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const Analytics = () => {
  const sourceChartRef = useRef<HTMLCanvasElement>(null);
  const commitmentChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Source Chart
    if (sourceChartRef.current) {
      const ctx = sourceChartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['YouTube', 'Facebook', 'Bạn bè', 'Khác'],
            datasets: [{
              label: 'Số lượng đơn',
              data: [80, 35, 27, 10],
              backgroundColor: ['#ef4444', '#3b82f6', '#22c55e', '#64748b']
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }

    // Commitment Chart
    if (commitmentChartRef.current) {
      const ctx = commitmentChartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['5-10h', '10-15h', '15-20h', '20h+'],
            datasets: [{
              label: 'Cam kết/tuần',
              data: [30, 55, 45, 22],
              backgroundColor: ['#38bdf8', '#60a5fa', '#3b82f6', '#1e40af']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }
  }, []);

  const motivationWords = [
    { word: 'học hỏi', size: 5 },
    { word: 'phát triển', size: 4 },
    { word: 'kỹ năng', size: 4 },
    { word: 'cơ hội', size: 3 },
    { word: 'kết nối', size: 3 },
    { word: 'AI', size: 2 },
    { word: 'chuyên nghiệp', size: 2 },
    { word: 'cống hiến', size: 2 }
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-foreground">Phân Tích Hành Vi Ứng Tuyển</h2>
      <p className="text-muted-foreground mt-1">Những insight dựa trên dữ liệu về quy trình tuyển dụng của bạn.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recruitment Funnel */}
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-lg font-bold text-card-foreground mb-4">Phễu Tuyển Dụng</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <div className="w-24 font-semibold text-muted-foreground">Nộp đơn</div>
              <div className="flex-1 bg-accent rounded-full h-6">
                <div className="bg-primary h-6 rounded-full text-primary-foreground text-xs flex items-center justify-center" style={{width: '100%'}}>
                  152
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-semibold text-muted-foreground">Đã liên hệ</div>
              <div className="flex-1 bg-accent rounded-full h-6">
                <div className="bg-primary h-6 rounded-full text-primary-foreground text-xs flex items-center justify-center" style={{width: '75%'}}>
                  114
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-semibold text-muted-foreground">Phỏng vấn</div>
              <div className="flex-1 bg-accent rounded-full h-6">
                <div className="bg-primary h-6 rounded-full text-primary-foreground text-xs flex items-center justify-center" style={{width: '40%'}}>
                  61
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-semibold text-muted-foreground">Chấp nhận</div>
              <div className="flex-1 bg-accent rounded-full h-6">
                <div className="bg-success h-6 rounded-full text-success-foreground text-xs flex items-center justify-center" style={{width: '15%'}}>
                  23
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Source Effectiveness */}
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-lg font-bold text-card-foreground">Hiệu Quả Kênh Tuyển Dụng</h3>
          <div className="mt-4 h-56">
            <canvas ref={sourceChartRef}></canvas>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Motivation Word Cloud */}
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-lg font-bold text-card-foreground mb-4">Động Lực Ứng Tuyển</h3>
          <div className="h-64 flex items-center justify-center flex-wrap gap-4">
            {motivationWords.map((item, index) => (
              <span
                key={index}
                className="inline-block text-foreground"
                style={{
                  fontSize: `${12 + item.size * 3}px`,
                  opacity: 0.4 + item.size * 0.1
                }}
              >
                {item.word}
              </span>
            ))}
          </div>
        </div>

        {/* Time Commitment */}
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h3 className="text-lg font-bold text-card-foreground">Phân bổ Thời gian Cam kết</h3>
          <div className="mt-4 h-64">
            <canvas ref={commitmentChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};