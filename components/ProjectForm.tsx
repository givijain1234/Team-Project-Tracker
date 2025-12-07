import React, { useState } from 'react';
import { ProjectStatus, ProjectFormData } from '../types';
import { Plus, Loader2, Sparkles } from 'lucide-react';

interface ProjectFormProps {
  onAddProject: (data: ProjectFormData) => void;
  onGenerateAI: () => Promise<void>;
  isGenerating: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject, onGenerateAI, isGenerating }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.NOT_STARTED);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !owner.trim()) return;
    
    onAddProject({ name, owner, status });
    setName('');
    setOwner('');
    setStatus(ProjectStatus.NOT_STARTED);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Add New Project</h2>
        {process.env.API_KEY && (
          <button
            type="button"
            onClick={onGenerateAI}
            disabled={isGenerating}
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            AI Auto-Fill
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col gap-1.5 md:col-span-1">
          <label htmlFor="projectName" className="text-sm font-medium text-gray-600">
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Website Redesign"
            className="px-4 py-3 md:px-3 md:py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow placeholder-gray-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-1">
          <label htmlFor="owner" className="text-sm font-medium text-gray-600">
            Owner
          </label>
          <input
            id="owner"
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="e.g. Alice Johnson"
            className="px-4 py-3 md:px-3 md:py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow placeholder-gray-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-1">
          <label htmlFor="status" className="text-sm font-medium text-gray-600">
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className="w-full px-4 py-3 md:px-3 md:py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow appearance-none cursor-pointer"
            >
              <option value={ProjectStatus.NOT_STARTED}>{ProjectStatus.NOT_STARTED}</option>
              <option value={ProjectStatus.IN_PROGRESS}>{ProjectStatus.IN_PROGRESS}</option>
              <option value={ProjectStatus.DONE}>{ProjectStatus.DONE}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 md:py-2 px-4 rounded-md transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;