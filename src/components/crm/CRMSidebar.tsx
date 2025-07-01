
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  CheckSquare,
  Map,
  UsersIcon,
  Building2,
  FileText,
  Mail,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';

interface CRMSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  userRole: string;
  userName: string;
}

export const CRMSidebar: React.FC<CRMSidebarProps> = ({
  collapsed,
  onToggle,
  userRole,
  userName
}) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/crm', roles: ['super_admin', 'admin', 'executive'] },
    { icon: Users, label: 'Contacts', path: '/crm/contacts', roles: ['super_admin', 'admin', 'executive'] },
    { icon: Target, label: 'Deal Pipeline', path: '/crm/deals', roles: ['super_admin', 'admin', 'executive'] },
    { icon: CheckSquare, label: 'Tasks', path: '/crm/tasks', roles: ['super_admin', 'admin', 'executive'] },
    { icon: Map, label: 'Itinerary Builder', path: '/crm/itinerary', roles: ['super_admin', 'admin', 'executive'] },
    { icon: UsersIcon, label: 'Group Travel', path: '/crm/groups', roles: ['super_admin', 'admin', 'executive'] },
    { icon: Building2, label: 'Suppliers', path: '/crm/suppliers', roles: ['super_admin', 'admin'] },
    { icon: FileText, label: 'Invoices', path: '/crm/invoices', roles: ['super_admin', 'admin'] },
    { icon: Mail, label: 'Marketing', path: '/crm/marketing', roles: ['super_admin', 'admin'] },
    { icon: BarChart3, label: 'Reports', path: '/crm/reports', roles: ['super_admin', 'admin'] },
    { icon: Settings, label: 'Settings', path: '/crm/settings', roles: ['super_admin', 'admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">Travel CRM</h1>
              <p className="text-sm text-gray-500">Nomad Safari Hub</p>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole.replace('_', ' ')}</p>
            </div>
          )}
          <button
            className="p-1 rounded hover:bg-gray-100"
            title="Logout"
            onClick={() => {
              // Handle logout
              window.location.href = '/';
            }}
          >
            <LogOut className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
