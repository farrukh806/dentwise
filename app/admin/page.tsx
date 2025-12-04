import Badge from '@/components/common/badge';
import { Card } from '@/components/ui/card';
import { currentUser } from '@clerk/nextjs/server';
import { Settings } from 'lucide-react';
import { redirect } from 'next/navigation';

const AdminPage = async () => {
  const user = await currentUser();
  if (!user) redirect('/');
  if (user.emailAddresses[0].emailAddress !== process.env.ADMIN_EMAIL) redirect('/');
  return (
    <section className="container mt-4 mx-auto px-4">
      {/* Header */}
      <Card className="px-4">
        <div className="flex justify-between items-center">
          {/* left */}
          <div className="flex flex-col items-start gap-3">
            <Badge>
              <span className="animate-pulse w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm text-primary">Admin Dashboard</span>
            </Badge>
            <h1 className="text-xl md:text-3xl font-bold">Welcome back, {user.firstName}!</h1>
            <p className="text-muted-foreground text-sm md:text-md lg:text-lg">
              Manage doctors, oversee appointments, and monitor your dental practice performance.
            </p>
          </div>
          {/* right */}
          <div className="bg-primary/20 rounded-full p-4">
            <Settings className="w-10 h-10 md:w-20 md:h-20" color="var(--primary)" />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AdminPage;
