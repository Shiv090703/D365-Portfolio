import { Account, Activity, ActivityType, Contact, Lead, LeadStatus, Opportunity, OpportunityStage } from './types';

// Using "Contact" Entity Structure for EDUCATION
export const MOCK_EDUCATION: Contact[] = [
  { id: 'edu-1', firstName: 'Masters in', lastName: 'Computer Science', email: 'Graduated: 2023', phone: 'GPA: 3.8', accountId: 'acc-1', jobTitle: 'University of Technology', createdOn: '2023-05-01', ownerId: 'Shivam' },
  { id: 'edu-2', firstName: 'Bachelors in', lastName: 'Information Tech', email: 'Graduated: 2021', phone: 'GPA: 3.9', accountId: 'acc-1', jobTitle: 'State University', createdOn: '2021-05-01', ownerId: 'Shivam' },
  { id: 'cert-1', firstName: 'Microsoft Certified', lastName: 'Power Platform Developer', email: 'Issued: 2023', phone: 'PL-400', accountId: 'acc-1', jobTitle: 'Microsoft', createdOn: '2023-08-15', ownerId: 'Shivam' },
];

// Using "Account" Entity Structure for EXPERIENCE
export const MOCK_EXPERIENCE: Account[] = [
  { id: 'exp-1', name: 'Enterprise Solutions Ltd', industry: 'Dynamics 365 Developer', phone: '2022 - Present', website: 'CRM/Dataverse', address: 'Plugin Dev, Migrations, Automation', createdOn: '2022-01-15', ownerId: 'Shivam' },
  { id: 'exp-2', name: 'Global Tech Systems', industry: 'Software Developer', phone: '2020 - 2022', website: '.NET/Backend', address: 'C# APIs, SQL, System Integration', createdOn: '2020-06-10', ownerId: 'Shivam' },
  { id: 'exp-3', name: 'StartUp Innovators', industry: 'Junior Developer', phone: '2019 - 2020', website: 'Frontend/Web', address: 'JavaScript, UI Customization', createdOn: '2019-05-05', ownerId: 'Shivam' },
];

// Using "Opportunity" Entity Structure for PROJECTS
export const MOCK_PROJECTS: Opportunity[] = [
  { id: 'proj-1', name: 'Dataverse Migration', accountId: 'exp-1', contactId: 'edu-1', stage: OpportunityStage.ClosedWon, estRevenue: 100, closeDate: 'C#, SSIS, Mapping', createdOn: '2023-11-01', ownerId: 'Shivam' },
  { id: 'proj-2', name: 'Banking CRM Automation', accountId: 'exp-1', contactId: 'edu-1', stage: OpportunityStage.ClosedWon, estRevenue: 90, closeDate: 'Power Automate, Plugins', createdOn: '2023-08-20', ownerId: 'Shivam' },
  { id: 'proj-3', name: 'Sales Plugin Suite', accountId: 'exp-2', contactId: 'edu-2', stage: OpportunityStage.ClosedWon, estRevenue: 95, closeDate: '.NET SDK, C#', createdOn: '2023-05-10', ownerId: 'Shivam' },
  { id: 'proj-4', name: 'Customer Portal Sync', accountId: 'exp-2', contactId: 'edu-2', stage: OpportunityStage.Proposal, estRevenue: 60, closeDate: 'Azure Functions, Web API', createdOn: '2024-01-15', ownerId: 'Shivam' },
];

// Using "Lead" for CONTACT ME submissions or similar
export const MOCK_CONTACT_REQS: Lead[] = [
  { id: 'lead-1', fullName: 'Recruiter Name', company: 'Tech Corp', email: 'hiring@techcorp.com', phone: '555-0120', status: LeadStatus.New, source: 'LinkedIn', createdOn: '2024-02-10', ownerId: 'System' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act-1', type: ActivityType.Task, subject: 'Plugin Optimization', description: 'Refactor pre-validation logic for Account entity', dueDate: '2024-02-01', status: 'Open', regardingId: 'proj-1', regardingType: 'Opportunity' as any, createdOn: '2024-01-20', ownerId: 'Shivam' },
];

// Simple In-Memory Store Simulation
class Store {
  accounts = [...MOCK_EXPERIENCE];
  contacts = [...MOCK_EDUCATION];
  leads = [...MOCK_CONTACT_REQS];
  opportunities = [...MOCK_PROJECTS];
  activities = [...MOCK_ACTIVITIES];

  get(entity: string) {
    // Map Portfolio Concepts to CRM Entities internally
    if (entity === 'Experience') return this.accounts;
    if (entity === 'Education') return this.contacts;
    if (entity === 'Projects') return this.opportunities;
    
    return (this as any)[entity.toLowerCase() + 's'] || [];
  }
  
  add(entity: string, item: any) {
    let listName = entity.toLowerCase() + 's';
    if (entity === 'Experience') listName = 'accounts';
    if (entity === 'Education') listName = 'contacts';
    if (entity === 'Projects') listName = 'opportunities';

    const list = (this as any)[listName];
    if(list) list.push(item);
  }

  update(entity: string, id: string, updates: any) {
    let listName = entity.toLowerCase() + 's';
    if (entity === 'Experience') listName = 'accounts';
    if (entity === 'Education') listName = 'contacts';
    if (entity === 'Projects') listName = 'opportunities';

    const list = (this as any)[listName];
    if(list) {
      const idx = list.findIndex((i: any) => i.id === id);
      if(idx > -1) {
        list[idx] = { ...list[idx], ...updates };
      }
    }
  }

  delete(entity: string, id: string) {
    let listName = entity.toLowerCase() + 's';
    if (entity === 'Experience') listName = 'accounts';
    if (entity === 'Education') listName = 'contacts';
    if (entity === 'Projects') listName = 'opportunities';

    const list = (this as any)[listName];
    if(list) {
      const idx = list.findIndex((i: any) => i.id === id);
      if(idx > -1) list.splice(idx, 1);
    }
  }
}

export const appStore = new Store();
