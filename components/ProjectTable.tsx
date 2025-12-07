import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { Trash2, FolderOpen, Search, XCircle } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

const statusStyles = {
  [ProjectStatus.NOT_STARTED]: 'bg-gray-100 text-gray-800 border-gray-200',
  [ProjectStatus.IN_PROGRESS]: 'bg-blue-50 text-blue-700 border-blue-200',
  [ProjectStatus.DONE]: 'bg-green-50 text-green-700 border-green-200',
};

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="bg-indigo-50 p-4 rounded-full mb-4">
          <FolderOpen className="w-8 h-8 text-indigo-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No projects yet</h3>
        <p className="text-gray-500">Create a new project above to get started.</p>
      </div>
    );
  }

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(term) ||
      project.owner.toLowerCase().includes(term) ||
      project.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Filter by name, owner, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-shadow"
        />
      </div>

      <div className="md:hidden text-right text-xs text-gray-400 italic">
        Swipe to see more &rarr;
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Project Name</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Owner</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {project.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[project.status]}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onDelete(project.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                        aria-label="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <XCircle className="w-8 h-8 text-gray-300 mb-2" />
                      <p>No projects matching "{searchTerm}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;