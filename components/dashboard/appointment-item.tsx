import { ReactNode } from 'react';

interface IAppointmentItem {
  icon: ReactNode;
  title: string;
  description: string;
}
const AppointmentItem: React.FC<IAppointmentItem> = (props) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="bg-primary/5 p-2 rounded-sm">{props.icon}</div>
      <div>
        <h4 className="text-sm">{props.title}</h4>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </div>
    </div>
  );
};

export default AppointmentItem;
