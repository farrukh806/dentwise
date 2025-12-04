import StatusCard from '@/components/admin/status-card';
import StatusTableItem from '@/components/admin/status-table-item';
import Badge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { currentUser } from '@clerk/nextjs/server';
import { Settings, Users, UserRoundCheck, Calendar, Clock, Stethoscope } from 'lucide-react';
import { redirect } from 'next/navigation';

const STATUS_CARDS = [
  {
    count: 2,
    icon: <Users className="w-15 h-15 rounded-md bg-primary/5 p-4" color="white" />,
    description: 'Total Doctors',
  },
  {
    count: 2,
    icon: <UserRoundCheck className="w-15 h-15 bg-white/5 rounded-md p-4" color="white" />,
    description: 'Active Doctors',
  },
  {
    count: 7,
    icon: <Calendar className="w-15 h-15 bg-white/5 rounded-md p-4" color="white" />,
    description: 'Total Appointments',
  },
  {
    count: 2,
    icon: <Clock className="w-15 h-15 rounded-md bg-primary/5 p-4" color="white" />,
    description: 'Completed Appointments',
  },
];

const STATUS_TABLE_ITEMS = [
  {
    imageUrl: 'https://avatar.iran.liara.run/public/boy',
    name: 'John Doe',
    specialty: 'Cardiology',
    gender: 'MALE' as 'MALE' | 'FEMALE',
    email: 'john@example.com',
    phone: '(555)-123-345',
  },
];

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
      {/* Status section */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10 mt-5">
        {STATUS_CARDS.map((card) => (
          <StatusCard {...card} key={card.description} />
        ))}
      </div>

      {/* Datatable */}
      <div className="mt-5">
        <Card className="px-5">
          <div className="flex justify-between items-center">
            <div>
              <Stethoscope className="w-5 h-5 inline" color="var(--primary)" />
              <h4 className="font-bold text-sm inline ms-2">Doctors Management</h4>
              <p className="text-sm mt-1">Manage and oversee all doctors in your practice</p>
            </div>
            <Button className="flex items-center gap-2">
              <span>+</span>
              <span>Add Doctor</span>
            </Button>
          </div>
          {STATUS_TABLE_ITEMS.map((item) => (
            <StatusTableItem {...item} key={item.email} />
          ))}
        </Card>
      </div>
    </section>
  );
};

export default AdminPage;
