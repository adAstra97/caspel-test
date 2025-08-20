interface Props {
  onClose: () => void;
}

export const Modal = ({ onClose }: Props) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-background/90 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-2xl max-w-[500px] w-full transform transition-all duration-300 scale-100 p-6 border-2 border-border"
      >
        <h2 className="text-size-24 text-center">Modal Window</h2>
        <div className="p-6 space-y-4">
          <div className="flex flex-col gap-1">
            <input type="text" placeholder="Enter name" />
            <p className="text-size-14 text-remove">Error Name</p>
          </div>
          <div className="flex flex-col gap-1">
            <input type="date" placeholder="Enter date" />
            <p className="text-size-14 text-remove">Error Date</p>
          </div>
          <div className="flex flex-col gap-1">
            <input type="number" placeholder="Enter value" />
            <p className="text-size-14 text-remove">Error Value</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onClose}>Cancel</button>
          <button>Add</button>
        </div>
      </div>
    </div>
  );
};
