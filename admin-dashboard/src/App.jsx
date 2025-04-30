import { useState } from 'react'
import './App.css'
import { FaUsers, FaFolderOpen, FaHospital, FaChartBar, FaComments, FaBoxes, FaExclamationTriangle, FaFileAlt, FaClipboardList, FaCog, FaMoon, FaSun } from 'react-icons/fa';
import { useEffect } from 'react';

const icons = {
  users: <FaUsers />,
  cases: <FaFolderOpen />,
  providers: <FaHospital />,
  analytics: <FaChartBar />,
  communication: <FaComments />,
  resources: <FaBoxes />,
  incidents: <FaExclamationTriangle />,
  documents: <FaFileAlt />,
  audit: <FaClipboardList />,
  settings: <FaCog />,
}

const navItems = [
  { key: 'users', label: 'Users', icon: icons.users },
  { key: 'cases', label: 'Cases', icon: icons.cases },
  { key: 'providers', label: 'Providers', icon: icons.providers },
  { key: 'analytics', label: 'Analytics', icon: icons.analytics },
  { key: 'communication', label: 'Communication', icon: icons.communication },
  { key: 'resources', label: 'Resources', icon: icons.resources },
  { key: 'incidents', label: 'Incidents', icon: icons.incidents },
  { key: 'documents', label: 'Documents', icon: icons.documents },
  { key: 'audit', label: 'Audit Logs', icon: icons.audit },
  { key: 'settings', label: 'System Settings', icon: icons.settings },
]

function TopBar({ selected, onSelect, theme, toggleTheme }) {
  return (
    <header className="topbar">
      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-btn${selected === item.key ? ' active' : ''}`}
            onClick={() => onSelect(item.key)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="topbar-actions">
        <button className="icon-btn" title="Toggle Theme" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <button className="icon-btn" title="Notifications">🔔</button>
        <button className="icon-btn" title="Profile">👤</button>
        <button className="icon-btn" title="Settings"><FaCog /></button>
      </div>
    </header>
  );
}

// Widget content for each section
const sectionWidgets = {
  users: [
    { key: 'user-list', title: 'User List', content: 'Manage all users here.' },
    { key: 'user-activity', title: 'User Activity', content: 'Recent user activity.' },
  ],
  cases: [
    { key: 'case-list', title: 'Case List', content: 'View and manage cases.' },
    { key: 'case-status', title: 'Case Status', content: 'Track case progress.' },
  ],
  providers: [
    { key: 'provider-list', title: 'Providers', content: 'Manage service providers.' },
    { key: 'provider-analytics', title: 'Provider Analytics', content: 'Provider performance.' },
  ],
  analytics: [
    { key: 'service-usage', title: 'Service Usage', content: 'Charts and stats.' },
    { key: 'outcomes', title: 'Outcomes', content: 'Success rates and outcomes.' },
  ],
  communication: [
    { key: 'messages', title: 'Messages', content: 'Send and view messages.' },
    { key: 'notifications', title: 'Notifications', content: 'System notifications.' },
  ],
  resources: [
    { key: 'resource-list', title: 'Resources', content: 'Manage resources.' },
    { key: 'resource-map', title: 'Resource Map', content: 'Map of resources.' },
  ],
  incidents: [
    { key: 'incident-reports', title: 'Incident Reports', content: 'View and manage incidents.' },
    { key: 'incident-stats', title: 'Incident Stats', content: 'Incident analytics.' },
  ],
  documents: [
    { key: 'document-list', title: 'Documents', content: 'Upload and review documents.' },
    { key: 'document-approval', title: 'Document Approval', content: 'Approve or reject documents.' },
  ],
  audit: [
    { key: 'audit-log', title: 'Audit Log', content: 'Track admin actions.' },
    { key: 'log-filters', title: 'Log Filters', content: 'Filter audit logs.' },
  ],
  settings: [
    { key: 'system-settings', title: 'System Settings', content: 'Configure system options.' },
    { key: 'theme-options', title: 'Theme Options', content: 'Switch between light and dark mode.' },
  ],
};

import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function DashboardSection({ section }) {
  const widgets = sectionWidgets[section] || [];
  const layout = widgets.map((w, i) => ({ i: w.key, x: i * 2, y: 0, w: 2, h: 2 }));
  return (
    <GridLayout className="layout" layout={layout} cols={6} rowHeight={80} width={1000} draggableHandle=".widget-title">
      {widgets.map((widget) => (
        <div key={widget.key} className="widget">
          <div className="widget-title">{widget.title}</div>
          <div className="widget-content">{widget.content}</div>
        </div>
      ))}
    </GridLayout>
  );
}

function App() {
  const [selected, setSelected] = useState('users');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Update navItems to use real icons
  navItems.forEach(item => { item.icon = icons[item.key]; });

  return (
    <div className="dashboard-root">
      <TopBar selected={selected} onSelect={setSelected} theme={theme} toggleTheme={toggleTheme} />
      <main className="dashboard-main">
        <DashboardSection section={selected} />
      </main>
    </div>
  )
}

export default App
