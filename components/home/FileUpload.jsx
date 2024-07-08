import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "../svg/FileUploadIcon";

const FileUpload = ({ onFileAccepted }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileAccepted(acceptedFiles[0]);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const dropText = isDragActive
    ? "Drop it like it’s hot…"
    : "Drag‘n’drop your file here, or click to select files";

  return (
    <div
      className="p-6 cursor-pointer my-8 w-full bg-gray-100 border-2 border-gray-300 rounded-lg hover:bg-gray-200 transition-all"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <FileUploadIcon />
      <p>{dropText}</p>
    </div>
  );
};

export default FileUpload;
