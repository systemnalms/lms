export const SERVICES = {
  USERS: 'USERS',
  AUTH: 'AUTH',
  APPOINTMENTS: 'APPOINTMENTS',
} as const;

export type SERVICES_TYPE = typeof SERVICES;
export type ServiceKey = keyof SERVICES_TYPE; // 'USERS' | 'AUTH' | 'APPOINTMENTS'
export type ServiceName = SERVICES_TYPE[ServiceKey];

// This must match the values of SERVICES (USERS_SERVICEs, etc.)
export const SERVICE_PORTS: Record<ServiceName, number> = {
  USERS: 3001,
  AUTH: 3002,
  APPOINTMENTS: 3201,
};
