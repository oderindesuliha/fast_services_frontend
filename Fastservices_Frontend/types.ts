
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ORGANIZATION = 'ORGANIZATION',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  code: string;
  createdAt: string;
}

export interface Offering {
  id: string;
  name: string;
  description: string;
  estimatedWaitTime: number;
  duration: number;
  organizationId: string;
  organization?: Organization;
}

export interface Queue {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  organization?: Organization;
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS'
}

export interface Appointment {
  id: string;
  userId: string;
  offeringId: string;
  queueId: string;
  appointmentDate: string;
  status: AppointmentStatus;
  user?: User;
  offering?: Offering;
  queue?: Queue;
}
