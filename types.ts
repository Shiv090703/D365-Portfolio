export enum EntityType {
  Account = 'Account',
  Contact = 'Contact',
  Lead = 'Lead',
  Opportunity = 'Opportunity',
  Activity = 'Activity'
}

export interface BaseModel {
  id: string;
  createdOn: string;
  ownerId: string;
}

export interface Account extends BaseModel {
  name: string;
  industry: string;
  phone: string;
  website: string;
  address: string;
}

export interface Contact extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountId?: string;
  jobTitle: string;
}

export enum LeadStatus {
  New = 'New',
  Contacted = 'Contacted',
  Qualified = 'Qualified',
  Disqualified = 'Disqualified'
}

export interface Lead extends BaseModel {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
}

export enum OpportunityStage {
  Prospecting = 'Prospecting',
  Proposal = 'Proposal',
  Negotiation = 'Negotiation',
  ClosedWon = 'Closed Won',
  ClosedLost = 'Closed Lost'
}

export interface Opportunity extends BaseModel {
  name: string;
  accountId?: string;
  contactId?: string;
  stage: OpportunityStage;
  estRevenue: number;
  closeDate: string;
}

export enum ActivityType {
  Task = 'Task',
  Call = 'Call',
  Meeting = 'Meeting',
  Email = 'Email'
}

export interface Activity extends BaseModel {
  type: ActivityType;
  subject: string;
  description: string;
  dueDate: string;
  status: 'Open' | 'Completed';
  regardingId?: string;
  regardingType?: EntityType;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string; // Material Icon name
  children?: NavItem[];
}

export type ViewMode = 'list' | 'grid';
