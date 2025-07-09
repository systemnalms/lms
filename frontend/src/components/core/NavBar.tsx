'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { AuthModal } from './AuthForm';
import { useAuthContext } from '@/context/auth-context';

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname?.includes('/dashboard');

  const { user, logout } = useAuthContext();

  const navItems = [
    { name: 'Home', href: '/' },
    ...(user ? [{ name: 'Dashboard', href: '/dashboard' }] : []), // 👈 Show Dashboard only if user is logged in
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 ${isDashboard ? 'bg-black' : ''}`}>
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          className="text-xl text-white font-bold cursor-pointer"
          onClick={() => router.push('/')}
        >
          Dental Office Online Scheduling System
        </h1>

        <div className="space-x-4 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-md flex items-center">
          {!isDashboard && (
            <>
              {navItems.map(({ name, href }) => (
                <span
                  key={name}
                  onClick={() => router.push(href)}
                  className={cn(
                    'cursor-pointer text-sm transition-colors hover:text-black',
                    pathname === href ? 'text-black' : 'text-gray-600'
                  )}
                >
                  {name}
                </span>
              ))}
              <Button
                className="hover:bg-black/20 transition-colors"
                onClick={() => router.push('/booking')}
              >
                Book an Appointment
              </Button>
            </>
          )}

          {/* Auth Section */}
          {user ? (
            <>
              <span className="text-sm text-white">{user.name}</span>
              <Button variant="outline" className="text-black" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <AuthModal />
          )}
        </div>
      </div>
    </nav>
  );
}
