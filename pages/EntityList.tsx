import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, StatusBadge, Input } from '../components/UIComponents';
import { appStore } from '../constants';

const EntityList: React.FC<{ entityType: string }> = ({ entityType }) => {
  const location = useLocation();
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // Force refresh

  useEffect(() => {
    setData(appStore.get(entityType));
  }, [entityType, refreshKey, location]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      appStore.delete(entityType, id);
      setRefreshKey(prev => prev + 1);
    }
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Dynamic columns based on entity type (mapped to Portfolio concepts)
  const getColumns = () => {
    switch (entityType) {
      case 'Experience': // Uses 'Account' Model
        return [
          { key: 'name', label: 'Company', link: true },
          { key: 'industry', label: 'Role' },
          { key: 'phone', label: 'Duration' },
          { key: 'address', label: 'Key Contributions' }
        ];
      case 'Education': // Uses 'Contact' Model
        return [
          { key: 'firstName', label: 'Degree/Cert', link: true },
          { key: 'lastName', label: 'Major', link: false },
          { key: 'jobTitle', label: 'Institution' },
          { key: 'email', label: 'Year' }
        ];
      case 'Projects': // Uses 'Opportunity' Model
        return [
          { key: 'name', label: 'Project Name', link: true },
          { key: 'closeDate', label: 'Tech Stack' }, // Using closeDate field for Tech Stack
          { key: 'stage', label: 'Status', render: (v: any) => <StatusBadge status={v === 'Closed Won' ? 'Completed' : v} /> },
          { key: 'estRevenue', label: 'Complexity (%)', render: (v: any) => <div className="w-24 bg-gray-200 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${v}%`}}></div></div> }
        ];
      case 'Activity':
        return [
          { key: 'subject', label: 'Subject', link: true },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'State', render: (v: any) => <StatusBadge status={v} /> },
          { key: 'dueDate', label: 'Due Date' }
        ];
      default: return [];
    }
  };

  const columns = getColumns();

  return (
    <div className="h-full flex flex-col bg-white rounded shadow-sm border border-gray-200 m-4">
      {/* Command Bar */}
      <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between bg-white rounded-t">
        <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-700 mr-4">{entityType}</h2>
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <Button variant="ghost" icon={<span className="material-icons text-base">filter_list</span>}>Filter</Button>
            <Button variant="ghost" icon={<span className="material-icons text-base">refresh</span>} onClick={() => setRefreshKey(prev => prev + 1)}>Refresh</Button>
            <Button variant="ghost" icon={<span className="material-icons text-base">download</span>}>Export to Excel</Button>
        </div>
        <div className="w-64">
            <Input 
                placeholder={`Search ${entityType}...`} 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full"
            />
        </div>
      </div>

      {/* Grid Header */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-600 border-b w-10">
                <input type="checkbox" />
              </th>
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 font-semibold text-gray-600 border-b cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center gap-1">
                      {col.label}
                      <span className="material-icons text-[14px] text-gray-400">arrow_downward</span>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 font-semibold text-gray-600 border-b w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map(item => (
                <tr key={item.id} className="hover:bg-[#eff6fc] group transition-colors">
                    <td className="px-4 py-3">
                        <input type="checkbox" />
                    </td>
                    {columns.map(col => (
                        <td key={col.key} className="px-4 py-3 text-gray-700">
                            {col.link ? (
                                <span className="text-[#0078d4] font-medium cursor-pointer hover:underline">
                                    {(item as any)[col.key]}
                                </span>
                            ) : (
                                col.render ? col.render((item as any)[col.key]) : (item as any)[col.key]
                            )}
                        </td>
                    ))}
                    <td className="px-4 py-3">
                        <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100">
                            <span className="material-icons text-lg">delete</span>
                        </button>
                    </td>
                </tr>
            ))}
            {filteredData.length === 0 && (
                <tr>
                    <td colSpan={columns.length + 2} className="px-4 py-8 text-center text-gray-500">
                        No records found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Footer Pagination Mock */}
       <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex justify-end text-xs text-gray-500 rounded-b">
           Showing 1-{filteredData.length} of {filteredData.length}
       </div>
    </div>
  );
};

export default EntityList;
