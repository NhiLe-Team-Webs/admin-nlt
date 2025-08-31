import { DashboardPage } from "@/pages/Dashboard";
import { 
  Home,
  Users,
  BarChart3,
  BookOpen,
  UserCircle,
  Share2,
  Building,
  FolderCheck,
  Award,
  FileText,
  HelpCircle,
  Settings
} from "lucide-react";

interface SidebarProps {
  activePage: DashboardPage;
  onPageChange: (page: DashboardPage) => void;
}

const menuItems = [
  {
    section: "Phân tích & Tuyển dụng",
    items: [
      { id: 'overview' as DashboardPage, label: 'Tổng quan', icon: Home },
      { id: 'applications' as DashboardPage, label: 'Quản lý người ứng tuyển', icon: Users },
      { id: 'analytics' as DashboardPage, label: 'Phân tích', icon: BarChart3 },
    ]
  },
  {
    section: "Quản lý Nội dung",
    items: [
      { id: 'content-story' as DashboardPage, label: 'Câu chuyện', icon: BookOpen },
      { id: 'content-leaders' as DashboardPage, label: 'Leaders', icon: UserCircle },
      { id: 'content-community' as DashboardPage, label: 'Cộng đồng', icon: Share2 },
      { id: 'content-partners' as DashboardPage, label: 'Đối tác', icon: Building },
      { id: 'content-projects' as DashboardPage, label: 'Dự án đã hoàn thành', icon: FolderCheck },
      { id: 'content-achievements' as DashboardPage, label: 'Thành tựu', icon: Award },
      { id: 'content-blog' as DashboardPage, label: 'Blog', icon: FileText },
      { id: 'content-faq' as DashboardPage, label: 'FAQ', icon: HelpCircle },
    ]
  },
  {
    section: "Hệ thống",
    items: [
      { id: 'settings' as DashboardPage, label: 'Cài đặt', icon: Settings },
    ]
  }
];

export const Sidebar = ({ activePage, onPageChange }: SidebarProps) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-sidebar border-r border-sidebar-border">
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-4">
          <h1 className="text-xl font-bold text-sidebar-foreground truncate">NhiLe Team Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((section) => (
            <div key={section.section} className="mb-4">
              <h2 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.section}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onPageChange(item.id)}
                      className={`w-full flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        isActive 
                          ? 'sidebar-link-active' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-sidebar-primary' : ''}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};