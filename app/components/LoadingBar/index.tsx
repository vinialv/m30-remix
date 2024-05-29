interface LoadingBarProps {
  size: number;
}

const LoadingBar = ({ size }: LoadingBarProps) => {
  return (
    <div className="flex h-2 justify-between items-center w-full gap-3">
      <div className="w-full h-2 bg-gray-300 rounded-sm overflow-hidden">
        <span
          className={`block h-full rounded-sm
          ${size != 100 ? "bg-[#AC96E4]" : "bg-[#73b172]"}`}
          style={{ width: `${size}%` }}
        ></span>
      </div>
      <span className="text-xs">{`${size}%`}</span>
    </div>
  );
};

export default LoadingBar;
