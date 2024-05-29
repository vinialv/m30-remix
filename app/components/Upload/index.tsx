import { FileIcon, XIcon } from "lucide-react";
import { useEffect, useState, FC } from "react";
import LoadingBar from "../LoadingBar";

interface UploadProps {
  data: {
    name: string;
    size: number;
    type: string;
  };
  onClick: (filename: string) => void;
}

const Upload: FC<UploadProps> = ({ data, onClick }) => {
  const [currentStatus, setCurrentStatus] = useState<string>("sending");
  const [totalSize, setTotalSize] = useState<number | string>(0);
  const [currentSize, setCurrentSize] = useState<number | string>(0);
  const [unit, setUnit] = useState<string>("bytes");
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    let bytes = data.size;
    if (bytes < 1024) {
      setTotalSize(bytes);
    } else if (bytes < 1048576) {
      setTotalSize((bytes / 1024).toFixed(0));
      setUnit("KB");
    } else {
      setTotalSize((bytes / 1048576).toFixed(0));
      setUnit("MB");
    }

    const acceptedFiles = [
      "application/pdf",
      "image/png",
      "image/jpg",
      "image/jpeg",
      "text/plain",
    ];
    if (acceptedFiles.indexOf(data.type) === -1) {
      setCurrentStatus("error");
    } else {
      const interval = setInterval(() => {
        if (percentage >= 100) {
          setPercentage(100);
          clearInterval(interval);
          return;
        }
        const randomIncrement = Math.floor(Math.random() * 10) + 1;
        setPercentage((prevPercentage) =>
          Math.min(prevPercentage + randomIncrement, 100)
        );
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [data.size, data.type, percentage]);

  useEffect(() => {
    setCurrentSize(((Number(totalSize) * percentage) / 100).toFixed(0));
    if (percentage === 100) {
      setCurrentStatus("success");
    }
  }, [percentage, totalSize]);

  return (
    <div
      className={`flex w-full border border-zinc-200 p-2 bg-zinc-50 shadow-sm shadow-zinc-200 rounded-md`}
    >
      <div
        className={`flex justify-center items-center min-w-12 h-12 rounded-sm mr-2 
        ${currentStatus === "sending" && "bg-[#f3f0ff]"}
        ${currentStatus === "success" && "bg-[#daf2d9]"}
        ${currentStatus === "error" && "bg-[#f2d9d9]"}
        
        `}
      >
        {currentStatus === "sending" && <FileIcon color="#AC96E4" size={20} />}
        {currentStatus === "success" && <FileIcon color="#73b172" size={20} />}
        {currentStatus === "error" && <FileIcon color="#e36363" size={20} />}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <p className="text-sm font-semibold md:w-56 w-44 truncate">
          {data.name}
        </p>
        <span className="text-xs font-light">
          {currentSize} {unit} / {totalSize} {unit}
        </span>
        <LoadingBar size={percentage} />
      </div>
      <button className="flex" onClick={() => onClick(data.name)}>
        <>
          {currentStatus === "sending" && <XIcon color="#AC96E4" size={18} />}
          {currentStatus === "success" && <XIcon color="#73b172" size={18} />}
          {currentStatus === "error" && <XIcon color="#e36363" size={18} />}
        </>
      </button>
    </div>
  );
};

export default Upload;
