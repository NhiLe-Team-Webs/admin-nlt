import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Overview } from "@/components/pages/Overview";
import { Applications } from "@/components/pages/Applications";
import { Analytics } from "@/components/pages/Analytics";
import { ContentStory } from "@/components/pages/ContentStory";
import { ContentBlog } from "@/components/pages/ContentBlog";
import { ContentFAQ } from "@/components/pages/ContentFAQ";
import { Settings } from "@/components/pages/Settings";
import { ContentLeaders } from "@/components/pages/ContentLeaders";
import { ContentPlaceholder } from "@/components/pages/ContentPlaceholder";
import { ContentCommunity } from "@/components/pages/ContentCommunity";
import { ContentPartners } from "@/components/pages/ContentPartners";
import { ContentProjects } from "@/components/pages/ContentProjects";
import { ContentAchievements } from "@/components/pages/ContentAchievements";

export type DashboardPage = 
  | 'overview' 
  | 'applications' 
  | 'analytics'
  | 'content-story'
  | 'content-leaders'
  | 'content-community'
  | 'content-partners'
  | 'content-projects'
  | 'content-achievements'
  | 'content-blog'
  | 'content-faq'
  | 'settings';

const Dashboard = () => {
  const [activePage, setActivePage] = useState<DashboardPage>('overview');

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <Overview onNavigate={setActivePage} />;
      case 'applications':
        return <Applications />;
      case 'analytics':
        return <Analytics />;
      case 'content-story':
        return <ContentStory />;
      case 'content-leaders':
        return <ContentLeaders />;
      case 'content-community':
        return <ContentCommunity />;
      case 'content-partners':
        return <ContentPartners />;
      case 'content-projects':
        return <ContentProjects />;
      case 'content-achievements':
        return <ContentAchievements />;
      case 'content-blog':
        return <ContentBlog />;
      case 'content-faq':
        return <ContentFAQ />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default Dashboard;