import React from 'react';

// --- Types ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: React.ReactNode;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// --- Components ---

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', icon, children, className, ...props }) => {
  const baseStyle = "flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#0078d4] text-white hover:bg-[#106ebe] focus:ring-[#0078d4]",
    secondary: "bg-white text-[#333] border border-[#d2d0ce] hover:bg-[#f3f2f1] focus:ring-[#605e5c]",
    outline: "bg-transparent text-[#0078d4] border border-[#0078d4] hover:bg-[#eff6fc]",
    ghost: "bg-transparent text-[#333] hover:bg-[#f3f2f1]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className || ''}`} {...props}>
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
};

export const Input: React.FC<InputProps> = ({ label, error, className, multiline, ...props }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
    {multiline ? (
        <textarea 
            className={`px-3 py-2 border rounded-sm text-sm outline-none transition-all resize-none ${error ? 'border-red-500' : 'border-gray-600 focus:border-[#0078d4] focus:border-b-2 focus:pb-[7px]'}`}
            rows={4}
            {...(props as any)}
        />
    ) : (
        <input 
        className={`px-3 py-2 border rounded-sm text-sm outline-none transition-all ${error ? 'border-red-500' : 'border-gray-600 focus:border-[#0078d4] focus:border-b-2 focus:pb-[7px]'}`} 
        {...props} 
        />
    )}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, children, ...props }) => (
    <div className="flex flex-col gap-1.5">
        {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
        <select className="px-3 py-2 border border-gray-600 rounded-sm text-sm outline-none focus:border-[#0078d4] focus:border-b-2" {...props}>
            {children}
        </select>
    </div>
)

export const Card: React.FC<CardProps> = ({ title, action, children, className }) => (
  <div className={`bg-white border border-[#e1dfdd] rounded-sm shadow-sm p-4 ${className}`}>
    {(title || action) && (
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#f3f2f1]">
        {title && <h3 className="text-base font-bold text-[#323130]">{title}</h3>}
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode }> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-xl animate-[fadeIn_0.2s_ease-out]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#edebe9]">
          <h2 className="text-lg font-semibold text-[#201f1e]">{title}</h2>
          <button onClick={onClose} className="text-[#605e5c] hover:text-[#323130] text-xl">&times;</button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 bg-[#f3f2f1] flex justify-end gap-2 border-t border-[#edebe9]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-50 w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f3f2f1] border-b border-[#edebe9]">
           <div className="flex items-center gap-2">
               <span className="bg-[#0078d4] text-white p-1 rounded-sm">
                   <span className="material-icons text-sm block">add</span>
               </span>
               <h2 className="text-lg font-semibold text-[#323130]">{title}</h2>
           </div>
           <button onClick={onClose} className="text-gray-500 hover:text-black transition-colors">
               <span className="material-icons">close</span>
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
            {children}
        </div>
      </div>
    </>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let colorClass = "bg-gray-100 text-gray-700";
  const s = status.toLowerCase();
  
  if (['new', 'prospecting', 'open'].includes(s)) colorClass = "bg-blue-100 text-blue-800";
  else if (['qualified', 'closed won', 'completed', 'active'].includes(s)) colorClass = "bg-green-100 text-green-800";
  else if (['lost', 'disqualified'].includes(s)) colorClass = "bg-red-100 text-red-800";
  else if (['negotiation', 'proposal'].includes(s)) colorClass = "bg-orange-100 text-orange-800";

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${colorClass}`}>
      {status}
    </span>
  );
};