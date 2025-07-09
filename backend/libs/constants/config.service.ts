import { Transport, TcpOptions } from '@nestjs/microservices';
import { SERVICE_PORTS, SERVICES } from './service-map';

const isDocker =
  process.env.NODE_ENV === 'production' || process.env.DOCKER === 'true';

const SERVICE_HOSTS: Record<keyof typeof SERVICES, string> = {
  USERS: isDocker ? 'users' : 'localhost',
  AUTH: isDocker ? 'auth' : 'localhost',
  APPOINTMENTS: isDocker ? 'appointments' : 'localhost',
};

// For connecting to other microservices
export const getTCPClientConfig = (
  serviceName: keyof typeof SERVICES,
): TcpOptions => ({
  transport: Transport.TCP,
  options: {
    host: SERVICE_HOSTS[serviceName],
    port: SERVICE_PORTS[SERVICES[serviceName]],
  },
});

// For listening as a microservice
export const getTCPServerConfig = (
  serviceName: keyof typeof SERVICES,
): TcpOptions => ({
  transport: Transport.TCP,
  options: {
    port: SERVICE_PORTS[SERVICES[serviceName]],
  },
});
