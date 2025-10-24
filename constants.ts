import { UserRole } from './types';
// @ts-ignore
import FSL from './image/FSL.png';

export const ROLES = {
    CUSTOMER: UserRole.CUSTOMER,
    ORGANIZATION: UserRole.ORG_ADMIN,  // Updated from UserRole.ORGANIZATION
    ADMIN: UserRole.SUPER_ADMIN,      // Updated from UserRole.ADMIN
};

// Replaced placeholder with the correct high-quality logo
export const LOGO_SRC = FSL;


export const API_BASE_URL = 'http://localhost:3000'; // Updated to match your backend port

// Development toggle: set to true to force mock mode (skip real backend).
// Change to false to require the real backend for auth flows.
// For quick development you can enable mock mode so the frontend will not call
// the real backend and will use in-memory test accounts instead.
export const USE_MOCK = true;

// When true (and USE_MOCK is false) the frontend will surface backend error
// messages. For development with mock mode enabled we hide backend messages.
export const SHOW_BACKEND_ERRORS = false;