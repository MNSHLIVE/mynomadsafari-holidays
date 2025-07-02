
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
  User,
  Shield
} from 'lucide-react';

interface CRMSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  userRole: string;
  userName: string;
  isMobile?: boolean;
}

export const CRMSidebar: React.FC<CRMSidebarProps> = ({
  collapsed,
  onToggle,
  userRole,
  userName,
  isMobile = false
}) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/crm', roles: ['super_admin', 'admin', 'staff'] },
    { icon: Users, label: 'Contacts', path: '/crm/contacts', roles: ['super_admin', 'admin', 'staff'] },
    { icon: Target, label: 'Deal Pipeline', path: '/crm/deals', roles: ['super_admin', 'admin', 'staff'] },
    { icon: CheckSquare, label: 'Tasks', path: '/crm/tasks', roles: ['super_admin', 'admin', 'staff'] },
    { icon: Map, label: 'Itinerary Builder', path: '/crm/itinerary', roles: ['super_admin', 'admin', 'staff'] },
    { icon: UsersIcon, label: 'Group Travel', path: '/crm/groups', roles: ['super_admin', 'admin', 'staff'] },
    { icon: Building2, label: 'Suppliers', path: '/crm/suppliers', roles: ['super_admin', 'admin'] },
    { icon: FileText, label: 'Invoices', path: '/crm/invoices', roles: ['super_admin', 'admin'] },
    { icon: Mail, label: 'Marketing', path: '/crm/marketing', roles: ['super_admin', 'admin'] },
    { icon: BarChart3, label: 'Reports', path: '/crm/reports', roles: ['super_admin', 'admin'] },
    { icon: Settings, label: 'Settings', path: '/crm/settings', roles: ['super_admin', 'admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        isMobile 
          ? collapsed ? '-translate-x-full' : 'w-64'
          : collapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {(!collapsed || isMobile) && (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Travel CRM</h1>
                  <p className="text-xs text-gray-500">Nomadsafari Hub</p>
                </div>
              </div>
            )}
            {!isMobile && (
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
          {filteredMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => isMobile && onToggle()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              title={collapsed && !isMobile ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {(!collapsed || isMobile) && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            {(!collapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole.replace('_', ' ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
