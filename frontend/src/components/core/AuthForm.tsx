'use client';

import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleUserRound } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '@/context/auth-context';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

type FormValues = LoginForm | RegisterForm;

export function AuthModal() {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const { login, register: registerUser } = useAuthContext();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const formSchema = isRegister ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const toggleForm = () => {
    setError('');
    setIsRegister((prev) => !prev);
  };

  const onSubmit = async (values: FormValues) => {
    setError('');
    try {
      if (isRegister) {
        const { firstName, lastName, email, password } = values as RegisterForm;
        const name = `${firstName} ${lastName}`;
        await registerUser(name, email, password); // auto-login happens here
        toast.success('Welcome! You’re now logged in.');
      } else {
        const { email, password } = values as LoginForm;
        await login(email, password);
        toast.success('Welcome back!');
      }

      reset();
      closeRef.current?.click();
      router.push('/dashboard');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      toast.error(message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <CircleUserRound className="w-[32px] h-[32px] text-white" />
      </DialogTrigger>
      <DialogContent className="max-w-md w-full p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-center text-2xl">
            {isRegister ? 'Create an Account' : 'Login to Your Account'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-0 shadow-none">
            <CardContent className="space-y-4 px-6 pt-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {isRegister && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...register('firstName')} />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...register('lastName')} />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 px-6 pb-6 pt-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isRegister ? 'Register' : 'Login'}
              </Button>
              <Button
                type="button"
                variant="link"
                className="text-sm text-muted-foreground cursor-pointer"
                onClick={toggleForm}
              >
                {isRegister
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </Button>
            </CardFooter>
          </Card>
        </form>
        {/* Hidden programmatic close button */}
        <DialogClose asChild>
          <button ref={closeRef} className="hidden" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
