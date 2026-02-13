import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import QuickCreate from './QuickCreate';
import { Drawer, Button, Card, StatusBadge } from './UIComponents';
import { useTheme } from '@/ThemeContext';
import {
    AlertRegular,
    SettingsRegular,
    QuestionCircleRegular,
    SearchRegular,
    PlayRegular,
    GlobeRegular,
    DismissRegular,
    MoreHorizontalRegular,
    AddRegular,
    GridRegular
} from '@fluentui/react-icons';

const navItems = [
    { label: 'Home', path: '/dashboard', icon: 'home' },
    { label: 'My Projects', path: '/projects', icon: 'rocket_launch' },
    { label: 'Experience', path: '/experience', icon: 'work' },
    { label: 'Education', path: '/education', icon: 'school' },
    { label: 'About Me', path: '/about', icon: 'person' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isNavCollapsed, setNavCollapsed] = useState(false);
    const [isQuickCreateOpen, setQuickCreateOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isAppSwitcherOpen, setAppSwitcherOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { mode, toggleTheme } = useTheme();

    return (
        <div className={`flex h-screen overflow-hidden font-['Segoe_UI'] ${mode === 'dark' ? 'bg-[#111] text-white' : 'bg-[#f0f2f5] text-[#333]'}`}>
            {/* Top Bar - Power Apps Style */}
            <div className={`fixed top-0 left-0 right-0 h-12 flex items-center px-4 z-20 shadow-sm justify-between ${mode === 'dark' ? 'bg-[#000]' : 'bg-black text-white'}`}>

                {/* Left: App Switcher & Name */}
                <div className="flex items-center gap-4 w-60">
                    <button
                        onClick={() => setAppSwitcherOpen(true)}
                        className="p-2 hover:bg-[#333] rounded flex items-center justify-center text-white"
                    >
                        <GridRegular fontSize={20} />
                    </button>
                    <span className="font-semibold tracking-wide text-sm text-white">Power Portfolio</span>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-2xl mx-4">
                    <div className="relative group">
                        <span className="absolute left-2 top-1.5 text-gray-500 flex items-center">
                            <SearchRegular fontSize={18} />
                        </span>
                        <input
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full text-sm rounded-md pl-9 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0078d4] transition-all ${mode === 'dark' ? 'bg-[#333] text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'}`}
                        />
                    </div>
                </div>

                {/* Right: Environment & Profile */}
                <div className="flex items-center gap-2 w-auto justify-end relative">
                    {/* Environment Info - Earth Icon style */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 hover:bg-[#333] rounded cursor-pointer group text-white">
                        <GlobeRegular fontSize={18} />
                        <div className="flex flex-col text-[10px] leading-tight">
                            <span className="text-gray-400">Environment</span>
                            <span className="font-semibold">Shivam's Portfolio</span>
                        </div>
                    </div>

                    <div className="w-px h-6 bg-gray-700 mx-1"></div>

                    <button
                        onClick={() => setNotificationsOpen(true)}
                        className="p-1.5 hover:bg-[#333] rounded-full text-gray-300 flex items-center"
                    >
                        <AlertRegular fontSize={20} />
                    </button>
                    <button
                        onClick={() => setSettingsOpen(true)}
                        className="p-1.5 hover:bg-[#333] rounded-full text-gray-300 flex items-center"
                    >
                        <SettingsRegular fontSize={20} />
                    </button>
                    <button className="p-1.5 hover:bg-[#333] rounded-full text-gray-300 flex items-center">
                        <QuestionCircleRegular fontSize={20} />
                    </button>

                    <div
                        onClick={() => setProfileOpen(!isProfileOpen)}
                        className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center border border-white/40 cursor-pointer ml-1 hover:ring-2 hover:ring-white/20 transition-all overflow-hidden aspect-square"
                    >
                        <img
                            src="/assets/profile.jpeg"
                            alt="Profile"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Profile Popover (Matches Screenshot) */}
                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                            <div className="absolute top-12 right-0 w-[340px] bg-white shadow-xl border border-gray-200 z-50 animate-[fadeIn_0.1s_ease-out] text-black overflow-hidden rounded-sm">
                                {/* Popover Header */}
                                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                                    <span className="text-xs text-gray-500 font-medium truncate max-w-[200px]">Power Portfolio</span>
                                    <button className="text-xs text-[#0078d4] hover:underline font-medium">Sign out</button>
                                </div>

                                {/* Popover Body */}
                                <div className="p-6 flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                                            <img
                                                src="/assets/profile.jpeg"
                                                alt="Profile Large"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center overflow-hidden">
                                        <h2 className="text-xl font-semibold text-[#323130] truncate">Shivam</h2>
                                        <p className="text-sm text-gray-500 truncate mb-2">shivam@dynamics-crm.dev</p>

                                        <button className="text-sm text-[#0078d4] hover:underline text-left block w-fit">View account</button>
                                        <button className="text-sm text-[#0078d4] hover:underline text-left block w-fit mt-1">Switch directory</button>
                                    </div>
                                </div>

                                {/* Popover Footer */}
                                <div className="px-4 py-2 flex justify-end border-t border-gray-100">
                                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 flex items-center">
                                        <MoreHorizontalRegular fontSize={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <aside className={`fixed left-0 top-12 bottom-0 border-r transition-all duration-300 z-10 ${isNavCollapsed ? 'w-12' : 'w-56'} flex flex-col ${mode === 'dark' ? 'bg-[#1b1b1b] border-white/10' : 'bg-[#f3f2f1] border-gray-200'}`}>
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => setNavCollapsed(!isNavCollapsed)} className={`${mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}>
                        <GridRegular fontSize={20} />
                    </button>
                </div>

                <nav className="flex flex-col gap-1 px-1 h-full overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-sm text-sm text-[#333] transition-colors ${isActive ? 'bg-white shadow-sm font-semibold' : 'hover:bg-[#e1dfdd]'}`}
                            title={item.label}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`material-icons text-lg ${isActive ? 'text-[#0078d4]' : 'text-gray-500'}`}>{item.icon}</span>
                                    {!isNavCollapsed && <span>{item.label}</span>}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 flex flex-col pt-12 transition-all duration-300 ${isNavCollapsed ? 'ml-12' : 'ml-56'} h-full`}>
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </main>

            {/* Quick Create Drawer */}
            <QuickCreate isOpen={isQuickCreateOpen} onClose={() => setQuickCreateOpen(false)} />

            {/* Notifications Drawer */}
            <Drawer isOpen={isNotificationsOpen} onClose={() => setNotificationsOpen(false)} title="Notifications">
                <div className="space-y-4">
                    <div className="p-3 bg-[#f3f2f1] rounded-sm border-l-4 border-[#0078d4]">
                        <p className="text-sm font-semibold text-[#323130]">Welcome to Power Portfolio!</p>
                        <p className="text-xs text-[#605e5c] mt-1">Explore the new Dynamics 365 style interface.</p>
                        <p className="text-[10px] text-gray-400 mt-2">Just now</p>
                    </div>
                    <div className="p-3 bg-white rounded-sm border border-[#edebe9] hover:bg-[#f3f2f1] cursor-pointer transition-colors">
                        <p className="text-sm font-semibold text-[#323130]">New Activity Created</p>
                        <p className="text-xs text-[#605e5c] mt-1">You added a new task to your dashboard.</p>
                        <p className="text-[10px] text-gray-400 mt-2">2 hours ago</p>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <Button variant="ghost" className="text-[#0078d4] w-full">See all notifications</Button>
                </div>
            </Drawer>

            {/* Settings Drawer */}
            <Drawer isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
                <div className="space-y-6">
                    <section>
                        <h3 className="text-sm font-bold text-[#323130] mb-3 uppercase tracking-wider text-[11px]">General Settings</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#323130]">Dark Mode</span>
                                <div
                                    onClick={toggleTheme}
                                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${mode === 'dark' ? 'bg-[#0078d4]' : 'bg-gray-200'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${mode === 'dark' ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#323130]">Compact View</span>
                                <div className="w-10 h-5 bg-[#0078d4] rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-sm font-bold text-[#323130] mb-3 uppercase tracking-wider text-[11px]">Personalization</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {['#0078d4', '#5c2d91', '#004e8c', '#d13438', '#00ad56', '#ca5010', '#038387', '#00188f'].map(color => (
                                <div key={color} className="h-8 w-full rounded-sm cursor-pointer border border-[#edebe9]" style={{ backgroundColor: color }}></div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="mt-auto pt-6 border-t border-[#edebe9]">
                    <Button className="w-full">Save Changes</Button>
                </div>
            </Drawer>

            {/* App Switcher Drawer (Custom width) */}
            <div
                className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 ${isAppSwitcherOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setAppSwitcherOpen(false)}
            />
            <div
                className={`fixed top-0 left-0 bottom-0 z-50 w-[320px] bg-[#2b2b2b] text-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isAppSwitcherOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <span className="font-bold">Apps</span>
                    <button onClick={() => setAppSwitcherOpen(false)} className="text-white/60 hover:text-white flex items-center">
                        <DismissRegular fontSize={18} />
                    </button>
                </div>
                <div className="p-4 grid grid-cols-3 gap-4">
                    {[
                        { name: 'Dynamics 365', color: 'bg-[#5c2d91]', icon: <PlayRegular fontSize={24} /> },
                        { name: 'Power Apps', color: 'bg-[#5c2d91]', icon: <GridRegular fontSize={24} /> },
                        { name: 'Power BI', color: 'bg-[#f2c811]', icon: <AddRegular fontSize={24} /> },
                        { name: 'Outlook', color: 'bg-[#0078d4]', icon: <AlertRegular fontSize={24} /> },
                        { name: 'Teams', color: 'bg-[#464eb8]', icon: <QuestionCircleRegular fontSize={24} /> },
                        { name: 'OneDrive', color: 'bg-[#0078d4]', icon: <GlobeRegular fontSize={24} /> }
                    ].map(app => (
                        <div key={app.name} className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/5 p-2 rounded-sm transition-colors">
                            <div className={`w-10 h-10 ${app.color} rounded flex items-center justify-center`}>
                                {app.icon}
                            </div>
                            <span className="text-[10px] text-center opacity-80">{app.name}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-auto p-4 border-t border-white/10 text-center">
                    <Button variant="ghost" className="text-white/60 text-xs w-full">All Apps</Button>
                </div>
            </div>
        </div>
    );
};