interface Props {
  title: string;
  onClick: () => void;
}

export const HeaderCell = ({ onClick, title }: Props) => {
  return (
    <th
      className="px-3 py-2 text-left cursor-pointer hover:opacity-70 hover:transition-opacity duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between text-size-18">
        {title}
      </div>
    </th>
  );
};
