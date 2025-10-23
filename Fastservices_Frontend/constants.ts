import { UserRole } from './types';
// @ts-ignore
import FSL from './image/FSL.png';

export const ROLES = {
    CUSTOMER: UserRole.CUSTOMER,
    ORGANIZATION: UserRole.ORGANIZATION,
    ADMIN: UserRole.ADMIN,
};

// Replaced placeholder with the correct high-quality logo
export const LOGO_SRC = FSL;


export const API_BASE_URL = '/api'; // Replace with actual API base URL
