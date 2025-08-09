import { useState } from 'react'
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, FolderOpen } from 'lucide-react'

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data - will be replaced with real data from API
  const projects = [
    { 
      id: 1, 
      name: 'IT Infrastructure RFP', 
      client: 'TechCorp Inc.', 
      status: 'In Progress', 
      type: 'RFP',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      progress: 75,
      team: ['John Doe', 'Jane Smith'],
      budget: '$500,000'
    },
    { 
      id: 2, 
      name: 'Marketing Services RFQ', 
      client: 'Global Marketing', 
      status: 'Review', 
      type: 'RFQ',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      progress: 90,
      team: ['Mike Johnson'],
      budget: '$200,000'
    },
    { 
      id: 3, 
      name: 'Office Supplies Contract', 
      client: 'StartupXYZ', 
      status: 'Draft', 
      type: 'Contract',
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      progress: 30,
      team: ['Sarah Wilson'],
      budget: '$50,000'
    },
    { 
      id: 4, 
      name: 'Legal Services RFP', 
      client: 'LawFirm Partners', 
      status: 'Completed', 
      type: 'RFP',
      startDate: '2023-12-01',
      endDate: '2024-01-31',
      progress: 100,
      team: ['John Doe', 'Lisa Chen'],
      budget: '$300,000'
    },
  ]

  const statuses = ['all', 'draft', 'in progress', 'review', 'completed']
  const types = ['all', 'RFP', 'RFQ', 'Contract', 'Tender']

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || project.status.toLowerCase() === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your procurement projects and track their progress.</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card hover:shadow-md transition-shadow">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.client}</p>
              </div>
              <div className="relative">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Type:</span>
                <span className="text-sm font-medium text-gray-900">{project.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Budget:</span>
                <span className="text-sm font-medium text-gray-900">{project.budget}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Timeline:</span>
                <span className="text-sm text-gray-900">
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Progress</span>
                <span className="text-sm text-gray-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye size={16} />
                </button>
                <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Team Members */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Team Members:</p>
              <div className="flex flex-wrap gap-1">
                {project.team.map((member, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedStatus !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'Get started by creating your first project.'
            }
          </p>
          <button className="btn-primary">
            Create New Project
          </button>
        </div>
      )}
    </div>
  )
}
