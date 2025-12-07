import React, { useState, useCallback } from 'react';
import { Layout } from 'lucide-react';
import { Project, ProjectFormData } from './types';
import ProjectForm from './components/ProjectForm';
import ProjectTable from './components/ProjectTable';
import { generateSampleProjects } from './services/geminiService';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddProject = useCallback((data: ProjectFormData) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      ...data,
    };
    setProjects((prev) => [newProject, ...prev]);
  }, []);

  const handleDeleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleGenerateAI = useCallback(async () => {
    setIsGenerating(true);
    try {
      const samples = await generateSampleProjects();
      const newProjects = samples.map(sample => ({
        id: crypto.randomUUID(),
        ...sample
      }));
      setProjects(prev => [...newProjects, ...prev]);
    } catch (error) {
      console.error("Error adding generated projects:", error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-lg">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner">
              <Layout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Team Project Tracker</h1>
              <p className="text-blue-100 text-sm mt-1 font-medium opacity-90">Manage your team's ongoing initiatives efficiently.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <ProjectForm 
          onAddProject={handleAddProject} 
          onGenerateAI={handleGenerateAI}
          isGenerating={isGenerating}
        />
        
        <ProjectTable 
          projects={projects} 
          onDelete={handleDeleteProject} 
        />
        
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Team Tracker Inc. Simple, clean, effective.</p>
        </div>
      </main>
    </div>
  );
};

export default App;