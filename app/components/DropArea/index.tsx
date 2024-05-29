/* eslint-disable react/prop-types */
import { useRef } from "react";
import { UploadCloudIcon } from "lucide-react";

interface DropAreaProps {
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropArea = ({
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onChange,
}: DropAreaProps) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputFile.current?.click();
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-48 rounded-lg border-dashed border hover:border-zinc-500 bg-zinc-50 hover:bg-zinc-100 transition-all cursor-pointer"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={handleClick}
    >
      <div className="mb-2">
        <UploadCloudIcon size={48} color="#18181B" />
      </div>
      <p className="font-bold text-lg mt-2">Clique ou arraste para enviar</p>
      <span className="text-gray-500 text-sm text-center px-4 mt-2">
        Envie qualquer arquivo ou imagem que possa facilitar o entendimento,
        exemplo: fotos do apartamento, plantas, etc.
      </span>
      <input
        type="file"
        className="hidden"
        multiple
        ref={inputFile}
        onChange={onChange}
      />
    </div>
  );
};

export default DropArea;
