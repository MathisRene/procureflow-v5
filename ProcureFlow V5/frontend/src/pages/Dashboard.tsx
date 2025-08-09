import { BarChart3, FolderOpen, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  // Mock data - will be replaced with real data from API
  const stats = [
    { name: 'Active Projects', value: '12', change: '+2', changeType: 'positive', icon: FolderOpen },
    { name: 'Team Members', value: '8', change: '+1', changeType: 'positive', icon: Users },
    { name: 'Completed RFPs', value: '45', change: '+5', changeType: 'positive', icon: CheckCircle },
    { name: 'Avg. Response Time', value: '2.3 days', change: '-0.5', changeType: 'positive', icon: Clock },
  ]

  const recentProjects = [
    { id: 1, name: 'IT Infrastructure RFP', client: 'TechCorp Inc.', status: 'In Progress', progress: 75 },
    { id: 2, name: 'Marketing Services RFQ', client: 'Global Marketing', status: 'Review', progress: 90 },
    { id: 3, name: 'Office Supplies Contract', client: 'StartupXYZ', status: 'Draft', progress: 30 },
    { id: 4, name: 'Legal Services RFP', client: 'LawFirm Partners', status: 'Completed', progress: 100 },
  ]

  const recentActivity = [
    { id: 1, action: 'Project created', target: 'IT Infrastructure RFP', time: '2 hours ago', user: 'John Doe' },
    { id: 2, action: 'Document uploaded', target: 'Requirements Document', time: '4 hours ago', user: 'Jane Smith' },
    { id: 3, action: 'Vendor response received', target: 'TechCorp Inc.', time: '1 day ago', user: 'System' },
    { id: 4, action: 'Project completed', target: 'Legal Services RFP', time: '2 days ago', user: 'Mike Johnson' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your procurement projects.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="text-primary-600" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              <button className="text-sm text-primary-600 hover:text-primary-500 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{project.status}</p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <button className="text-sm text-primary-600 hover:text-primary-500">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-primary-600 hover:text-primary-500 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">{activity.target}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="text-primary-600" size={20} />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Create New Project</p>
              <p className="text-sm text-gray-600">Start a new procurement project</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="text-primary-600" size={20} />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Invite Team Member</p>
              <p className="text-sm text-gray-600">Add someone to your team</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-primary-600" size={20} />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-600">Check your performance metrics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
