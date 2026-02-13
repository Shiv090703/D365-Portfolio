import React, { useState } from 'react';
import { Drawer, Input, Button } from './UIComponents';
import { appStore } from '../constants';
import { EntityType, LeadStatus } from '../types';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Network/Processing Delay
    setTimeout(() => {
        // 1. Create a Lead record to capture who contacted us
        const newLead = {
            id: `lead-${Date.now()}`,
            fullName: formData.name,
            email: formData.email,
            company: formData.company || 'Private User',
            phone: '',
            status: LeadStatus.New,
            source: 'Portfolio Website',
            createdOn: new Date().toISOString(),
            ownerId: 'System'
        };
        appStore.add(EntityType.Lead, newLead);

        // 2. Create an Activity record to capture the message content
        // Note: In TypeScript ActivityType needs to be cast if using string, or strictly typed. 
        // We'll treat this as an 'Email' activity.
        const newActivity = {
            id: `act-${Date.now()}`,
            type: 'Email' as any, // utilizing the existing ActivityType enum values or string if loose
            subject: `Contact Request from ${formData.name}`,
            description: formData.message,
            dueDate: new Date().toISOString().split('T')[0],
            status: 'Open',
            regardingId: newLead.id,
            regardingType: EntityType.Lead,
            createdOn: new Date().toISOString(),
            ownerId: 'Shivam'
        };
        appStore.add(EntityType.Activity, newActivity);
        
        setLoading(false);
        setFormData({ name: '', email: '', company: '', message: '' });
        
        alert(`Thanks ${formData.name}! Your message has been sent to Shivam's inbox.`);
        onClose();
    }, 1200);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Contact Me">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="space-y-6 flex-1">
            <p className="text-sm text-gray-500 mb-4">
                Fill out the details below. This will simulate sending an email and creating a Lead record in the CRM.
            </p>
            
            <Input 
                label="Your Name" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                autoFocus
            />

            <Input 
                label="Your Email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
            />

            <Input 
                label="Company / Organization (Optional)" 
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
            />

            <Input 
                label="Message" 
                placeholder="How can I help you?"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                multiline
                required
            />
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
            </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default ContactDrawer;