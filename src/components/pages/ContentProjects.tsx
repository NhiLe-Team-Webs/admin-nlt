import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProjectModal } from "@/components/ProjectModal";

interface Project {
  id: string;
  name: string;
  partner: string;
  subtitle: string;
  imageUrl: string;
  backgroundColor: string;
}

export const ContentProjects = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Dự án Alpha",
      partner: "Doanh nghiệp ABC",
      subtitle: "Xây dựng Thương hiệu",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      backgroundColor: "bg-slate-800"
    },
    {
      id: "2", 
      name: "Dự án Beta",
      partner: "Tổ chức XYZ",
      subtitle: "Chiến dịch Gây quỹ",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      backgroundColor: "bg-slate-600"
    }
  ]);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    toast({
      title: "Đã xóa dự án",
      description: "Dự án đã được xóa thành công.",
    });
  };

  const handleSaveProject = (projectData: Omit<Project, 'id'>) => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...projectData, id: editingProject.id }
          : p
      ));
      toast({
        title: "Đã cập nhật dự án",
        description: "Thông tin dự án đã được cập nhật.",
      });
    } else {
      const newProject: Project = {
        ...projectData,
        id: Date.now().toString()
      };
      setProjects([...projects, newProject]);
      toast({
        title: "Đã thêm dự án mới",
        description: "Dự án mới đã được thêm thành công.",
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quản lý: Dự án đã hoàn thành</h2>
          <p className="text-muted-foreground mt-1">Thêm, sửa, hoặc xóa các dự án đã thực hiện.</p>
        </div>
        <Button onClick={handleAddProject} className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Thêm dự án mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className={`group ${project.backgroundColor} rounded-2xl shadow-lg p-6 flex flex-col justify-between relative overflow-hidden`}>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">{project.partner}</p>
              <h3 className="text-lg font-bold text-white mt-1">{project.subtitle}</h3>
            </div>
            <p className="text-5xl font-extrabold text-white mt-8 mb-4">{project.name}</p>
            <img 
              src={project.imageUrl}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity -z-10"
            />
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-sm"
                onClick={() => handleEditProject(project)}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-sm"
                onClick={() => handleDeleteProject(project.id)}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
};