import { cn } from '@/lib/utils';

interface IStep {
  stepNumber: number;
  stepName: string;
  isActive?: boolean;
}
const Step: React.FC<IStep> = (props) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          props.isActive ? 'bg-primary text-black' : 'bg-white/10',
          'px-2 rounded-full font-semibold'
        )}
      >
        {props.stepNumber}
      </span>
      <span className={cn(props.isActive ? 'text-white' : '')}>{props.stepName}</span>
    </div>
  );
};

export default Step;
