import { Gender } from '@/app/prisma/generated/enums';
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { MapPin, Phone, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IDoctorCard {
  id: string;
  email: string;
  gender: Gender;
  imageUrl: string;
  name: string;
  phone: string;
  speciality: string;
  isActive: boolean;
  _count: {
    appointments: number;
  };
  onClick: (doctorId: string) => void;
  isSelected: boolean;
}

const DoctorCard: React.FC<IDoctorCard> = (props) => {
  return (
    <Card
      onClick={() => {
        props.onClick(props.id);
      }}
      className={cn(
        props.isSelected ? 'border-primary' : '',
        'hover:border-primary cursor-pointer'
      )}
    >
      <CardHeader className="flex gap-2">
        <Image
          src={props.imageUrl}
          alt={props.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1 ">
          <h3 className="text-md font-bold text-white">{props.name}</h3>
          <p className="text-primary">{props.speciality}</p>
          <p>
            <Star
              width={15}
              height={15}
              fill="var(--color-amber-300)"
              className="inline text-amber-300"
            />
            <span className="text-sm">({props._count.appointments} appointments)</span>
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <MapPin width={15} height={15} />
          <span>Dental Care</span>
        </div>
        <div className="flex gap-2 items-center">
          <Phone width={15} height={15} />
          <span>{props.phone}</span>
        </div>
        <p>Experienced dental professional providing quality care.</p>
        <span className="bg-teal-600 text-black/70 rounded-md px-2 text-sm w-fit">
          Licenced Professional
        </span>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
