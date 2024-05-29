import { useState, DragEvent, ChangeEvent, FC, useEffect } from "react";

import Upload from "@/components/Upload";
import DropArea from "@/components/DropArea";

interface FileWithName extends File {
  name: string;
}

interface InputDropAreaProps {
  onFilesChange: (files: FileWithName[]) => void;
}
const InputDropArea: FC<InputDropAreaProps> = ({ onFilesChange }) => {
  const [files, setFiles] = useState<FileWithName[]>([]);

  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const newFiles = Array.from(event.dataTransfer.files) as FileWithName[];
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(event.target.files || []) as FileWithName[];
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleCloseClick = (filename: string) => {
    const filteredFiles = files.filter((file) => file.name !== filename);
    setFiles(filteredFiles);
  };

  return (
    <div className="flexflex-col justify-center items-center">
      <DropArea
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onChange={handleInputChange}
      />
      <div className="flex gap-2 mt-2 w-full flex-col justify-center items-center">
        {files.map((file, index) => (
          <Upload data={file} key={index} onClick={handleCloseClick} />
        ))}
      </div>
    </div>
  );
};

export default InputDropArea;
