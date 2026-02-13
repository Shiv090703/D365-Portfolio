import React, { useState } from 'react';
import { Drawer, Input, Select, Button } from './UIComponents';
import { appStore } from '../constants';
import { ActivityType, EntityType } from '../types';

interface QuickCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickCreate: React.FC<QuickCreateProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    type: ActivityType.Task,
    dueDate: new Date().toISOString().split('T')[0], // Today YYYY-MM-DD
    description: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
        const newActivity = {
            id: `act-${Date.now()}`,
            type: formData.type,
            subject: formData.subject,
            description: formData.description,
            dueDate: formData.dueDate,
            status: 'Open',
            createdOn: new Date().toISOString(),
            ownerId: 'Shivam', // Current user
            regardingType: EntityType.Account, // Default for generic quick create
        };

        appStore.add(EntityType.Activity, newActivity);
        
        // Reset and close
        setLoading(false);
        setFormData({
            subject: '',
            type: ActivityType.Task,
            dueDate: new Date().toISOString().split('T')[0],
            description: ''
        });
        
        // Notify user (simple alert for MVP)
        alert('Activity created successfully!');
        onClose();
    }, 600);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Quick Create: Activity">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="space-y-6 flex-1">
            <p className="text-sm text-gray-500 mb-4">
                Create a new task, call, or meeting record.
            </p>
            
            <Select 
                label="Activity Type" 
                value={formData.type} 
                onChange={(e) => handleChange('type', e.target.value)}
                required
            >
                {Object.values(ActivityType).map(t => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </Select>

            <Input 
                label="Subject" 
                placeholder="e.g. Follow up on project proposal"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                required
                autoFocus
            />

            <Input 
                label="Due Date" 
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                required
            />

            <Input 
                label="Description" 
                placeholder="Add details..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                multiline
            />
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save and Close'}
            </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default QuickCreate;