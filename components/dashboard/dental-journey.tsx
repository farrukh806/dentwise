import { Card } from '../ui/card';

const DentalJourney = () => {
  return (
    <div className="flex flex-row flex-wrap justify-between gap-2">
      <Card className="flex flex-col items-center gap-2 grow">
        <h3 className="font-bold text-md text-primary">3</h3>
        <span className="text-muted-foreground text-sm">Completed Visits</span>
      </Card>
      <Card className="flex flex-col items-center gap-2 grow">
        <h3 className="font-bold text-md text-primary">6</h3>
        <span className="text-muted-foreground text-sm">Total appointments</span>
      </Card>
      <Card className="flex flex-col items-center gap-2 grow">
        <h3 className="font-bold text-md text-primary">December 2025</h3>
        <span className="text-muted-foreground text-sm">Member Since</span>
      </Card>
    </div>
  );
};

export default DentalJourney;
