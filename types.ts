export interface ShowFormat {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface NavItem {
  label: string;
  path: string;
}

export enum ContactStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}