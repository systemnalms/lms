'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardCore() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Manage your appointments below.
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 space-y-6">
          <div className="bg-muted p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            <p className="text-sm text-muted-foreground mb-4">
              You have 2 appointments scheduled today.
            </p>
            <Button asChild>
              <Link href="/dashboard/appointments">View All Appointments</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
