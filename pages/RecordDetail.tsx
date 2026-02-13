import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { appStore } from '../constants';
import { Button, Card, Input, Select, StatusBadge } from '../components/UIComponents';
import { Activity, ActivityType, EntityType, Lead, LeadStatus, Opportunity, OpportunityStage } from '../types';

interface RecordDetailProps {
  entityType: EntityType;
}

const RecordDetail: React.FC<RecordDetailProps> = ({ entityType }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [record, setRecord] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (id) {
      const allRecords = appStore.get(entityType);
      const found = allRecords.find((r: any) => r.id === id);
      setRecord(found);
      
      // Load related activities
      const allActivities = appStore.get('Activity') as Activity[];
      setActivities(allActivities.filter(a => a.regardingId === id));
    }
  }, [id, entityType]);

  const handleSave = () => {
    if(id && record) {
        appStore.update(entityType, id, record);
        alert('Record saved successfully');
    }
  };

  const handleQualifyLead = () => {
      if(entityType === EntityType.Lead && record) {
          // 1. Create Contact
          const newContact = {
              id: `con-${Date.now()}`,
              firstName: record.fullName.split(' ')[0],
              lastName: record.fullName.split(' ').slice(1).join(' '),
              email: record.email,
              phone: record.phone,
              createdOn: new Date().toISOString(),
              ownerId: record.ownerId
          };
          appStore.add('Contact', newContact);

          // 2. Create Opportunity
          const newOpp = {
              id: `opp-${Date.now()}`,
              name: `${record.company} - Potential Deal`,
              contactId: newContact.id,
              stage: OpportunityStage.Prospecting,
              estRevenue: 0,
              closeDate: new Date().toISOString(),
              createdOn: new Date().toISOString(),
              ownerId: record.ownerId
          };
          appStore.add('Opportunity', newOpp);

          // 3. Update Lead Status
          appStore.update('Lead', id!, { status: LeadStatus.Qualified });

          alert('Lead Qualified! Created Contact and Opportunity.');
          navigate(`/opportunities/${newOpp.id}`);
      }
  }

  if (!record) return <div className="p-8 text-center">Loading record...</div>;

  const renderFields = () => {
    const keys = Object.keys(record).filter(k => k !== 'id' && k !== 'createdOn' && k !== 'ownerId');
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keys.map(key => {
                if (key === 'status' && entityType === EntityType.Lead) {
                   return (
                       <Select 
                            key={key}
                            label="Status"
                            value={record[key]}
                            onChange={(e) => setRecord({...record, [key]: e.target.value})}
                       >
                           {Object.values(LeadStatus).map(s => <option key={s} value={s}>{s}</option>)}
                       </Select>
                   ) 
                }
                if (key === 'stage' && entityType === EntityType.Opportunity) {
                     return (
                       <Select 
                            key={key}
                            label="Pipeline Phase"
                            value={record[key]}
                            onChange={(e) => setRecord({...record, [key]: e.target.value})}
                       >
                           {Object.values(OpportunityStage).map(s => <option key={s} value={s}>{s}</option>)}
                       </Select>
                   )
                }
                return (
                    <Input 
                        key={key} 
                        label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} 
                        value={record[key] || ''} 
                        onChange={(e) => setRecord({...record, [key]: e.target.value})} 
                    />
                )
            })}
        </div>
    )
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm flex justify-between items-start">
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
                {record.name || record.fullName || record.subject}
                {(record.status || record.stage) && <StatusBadge status={record.status || record.stage} />}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{entityType} • Created on {record.createdOn}</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={handleSave} icon={<span className="material-icons text-sm">save</span>}>Save</Button>
            {entityType === EntityType.Lead && record.status === LeadStatus.New && (
                <Button variant="secondary" onClick={handleQualifyLead} icon={<span className="material-icons text-sm">check_circle</span>}>Qualify</Button>
            )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex gap-6">
              {['summary', 'details', 'related'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#0078d4] text-[#0078d4]' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                  >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
              ))}
          </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
          {activeTab === 'summary' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Form Info */}
                  <div className="lg:col-span-2 space-y-6">
                      <Card title="General Information">
                          {renderFields()}
                      </Card>
                      
                      {/* Subgrids for specific entities */}
                      {entityType === EntityType.Account && (
                          <Card title="Contacts">
                              <p className="text-sm text-gray-500">Subgrid implementation pending...</p>
                          </Card>
                      )}
                  </div>

                  {/* Timeline / Activities */}
                  <div className="lg:col-span-1">
                      <Card title="Timeline" className="h-full bg-gray-50/50">
                          <div className="flex gap-2 mb-4">
                              <Button variant="secondary" className="text-xs px-2" icon={<span className="material-icons text-xs">add</span>}>Note</Button>
                              <Button variant="secondary" className="text-xs px-2" icon={<span className="material-icons text-xs">add</span>}>Call</Button>
                              <Button variant="secondary" className="text-xs px-2" icon={<span className="material-icons text-xs">add</span>}>Task</Button>
                          </div>
                          <div className="space-y-4">
                              {activities.length === 0 && <p className="text-sm text-gray-400 italic">No activities found.</p>}
                              {activities.map(act => (
                                  <div key={act.id} className="bg-white p-3 rounded border border-gray-200 shadow-sm relative pl-8">
                                      <div className="absolute left-3 top-3 w-2 h-2 rounded-full bg-blue-500"></div>
                                      <h5 className="font-semibold text-sm">{act.subject}</h5>
                                      <p className="text-xs text-gray-500 mt-1">{act.description}</p>
                                      <div className="mt-2 text-xs text-gray-400 flex justify-between">
                                          <span>{act.type}</span>
                                          <span>{act.dueDate}</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </Card>
                  </div>
              </div>
          )}
          {activeTab === 'details' && (
              <Card title="Additional Details">
                  <div className="grid grid-cols-2 gap-6">
                    <Input label="Owner" value={record.ownerId} readOnly className="bg-gray-50" />
                    <Input label="Modified On" value={new Date().toISOString()} readOnly className="bg-gray-50" />
                  </div>
              </Card>
          )}
      </div>
    </div>
  );
};

export default RecordDetail;
