import { DoctorModel as IDoctor } from '@/app/prisma/generated/models';
import { Card } from '../ui/card';
import Image from 'next/image';
import { MessageSquare, Pencil, Phone } from 'lucide-react';
import { Button } from '../ui/button';

const StatusTableItem: React.FC<
  Pick<IDoctor, 'email' | 'gender' | 'imageUrl' | 'name' | 'phone' | 'specialty'>
> = (props) => {
  return (
    <Card className="px-2 flex flex-row items-center justify-between">
      {/* left part */}
      <div className="flex gap-2 items-center">
        <Image
          src={props.imageUrl}
          alt={props.name}
          className="object-cover w-25 h-25 ring rounded-full"
          width={25}
          height={25}
        />
        <div className="flex flex-col gap-2 justify-center">
          <h2 className="text-md font-bold">{props.name}</h2>
          <p className="text-xs">
            <span>{props.specialty}</span>
            <span className="bg-white/10 px-3 rounded-xs ms-3">{props.gender}</span>
          </p>
          <p className="text-sm">
            <span className="text-xs">
              <MessageSquare className="w-3 h-3 me-1 inline" color="white" />
              {props.email}
            </span>
            <span className="text-xs ms-2">
              <Phone className="w-3 h-3 me-1 inline" color="white" />
              {props.phone}
            </span>
          </p>
        </div>
      </div>
      {/* right part */}
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-md font-bold text-primary">1</h3>
          <span className="text-xs">Appointments</span>
        </div>
        <Button size={'sm'} variant={'ghost'} className="bg-sky-100 text-sky-500 text-xs">
          Active
        </Button>
        <Button size={'sm'} variant={'outline'} className="flex items-center gap-2">
          <Pencil className="w-2 h-2" />
          <span>Edit</span>
        </Button>
      </div>
    </Card>
  );
};

export default StatusTableItem;
