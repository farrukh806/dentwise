import { ReactNode } from 'react';

interface IFeatureItem {
  icon: ReactNode;
  title: string;
}
const FeatureItem: React.FC<IFeatureItem> = (props) => {
  return (
    <div className="flex gap-3 items-center bg-white/10 rounded-sm p-2">
      {props.icon}
      <span className="text-sm">{props.title}</span>
    </div>
  );
};

export default FeatureItem;
