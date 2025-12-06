'use client';
import { Card } from '../ui/card';
import { Calendar } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { appointmentQueryOptions } from '@/lib/query-options/appointment';
import { ColumnDef } from '@tanstack/react-table';
import { Appointment, Doctor, Patient, AppointmentStatus } from '@/app/prisma/generated/browser';
import { DataTable } from '../common/data-table';
import { Button } from '../ui/button';

const AppointmentTable = () => {
  const { data } = useSuspenseQuery(appointmentQueryOptions);
  console.log(data);
  const getClassName = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.COMPLETED:
        return 'bg-green-100 text-green-500';
      case AppointmentStatus.SCHEDULED:
        return 'bg-sky-100 text-sky-500 ';
      case AppointmentStatus.CANCELED:
        return 'bg-red-100 text-red-500 ';
      default:
        return '';
    }
  };
  const columns: ColumnDef<Appointment & { patient: Patient } & { doctor: Doctor }>[] = [
    {
      header: 'Patient',
      accessorKey: 'patient.firstName',
      cell({ row }) {
        return (
          <div className="flex flex-col gap-1">
            <h3 className="text-lg">
              {row.original.patient.firstName} {row.original.patient.lastName}
            </h3>
            <span className="text-muted">{row.original.patient.email}</span>
          </div>
        );
      },
    },
    {
      header: 'Doctor',
      accessorKey: 'doctor.name',
      cell({ row }) {
        return <h3 className="text-lg">Dr. {row.original.doctor.name}</h3>;
      },
    },
    {
      header: 'Date & Time',
      accessorKey: 'dateTime',
      cell({ row }) {
        return (
          <div className="flex flex-col gap-1">
            <h3 className="text-lg">{row.original.dateTime.toDateString()}</h3>
            <span className="text-muted">{row.original.dateTime.toTimeString()}</span>
          </div>
        );
      },
    },
    {
      header: 'Reason',
      accessorKey: 'reason',
      cell({ row }) {
        return <h3 className="text-lg">{row.original.reason}</h3>;
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell({ row }) {
        return (
          <Button
            size={'sm'}
            variant={'ghost'}
            className={`${getClassName(row.original.status)}text-xs`}
          >
            {row.original.status}
          </Button>
        );
      },
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell() {
        return <span className="text-muted">Click status to toggle</span>;
      },
    },
  ];
  return (
    <div className="mt-5">
      <Card className="px-5">
        <div>
          <Calendar className="w-5 h-5 inline" color="var(--primary)" />
          <h4 className="font-bold text-sm inline ms-2">Recent Appointments</h4>
          <p className="text-sm mt-1">Monitor and manage all patients appointments</p>
        </div>
        <div className="mt-3">
          <DataTable columns={columns} data={data} />
        </div>
      </Card>
    </div>
  );
};

export default AppointmentTable;
