interface IHowToUseItem {
  title: string;
}
const HowToUseItem: React.FC<IHowToUseItem> = (props) => {
  return (
    <li className="text-sm flex items-center gap-3">
      <span className="block w-2 h-2 bg-primary rounded-full" />
      <span>{props.title}</span>
    </li>
  );
};

export default HowToUseItem;
