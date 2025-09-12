// "use client";
// import react, { useRef } from "react";
// import { IKUpload, ImageKitProvider } from "imagekitio-next";
// import { useSession } from "next-auth/react";
// import { Loader2 } from "lucide-react";

// import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

// interface FileUploadProps {
//   onSuccess: (res: IKUploadResponse) => void;
//   onProgess?: (progress: number) => void;
//   fileType: "image" | "video";
// }

// const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY;
// const privateKey = process.env.IMAGE_KIT_PRVATE_KEY;

// const onError = (err) => {
//   console.log("Eror is :", error);
// };

// const onSuccess = (res) => {
//   console.log("Respons is:", res);
// };

// const FileUpload: React.FC<FileUploadProps> = ({
//   onUploadSuccess,
//   onUploadError,
// }) => {
//   const { data: session } = useSession();
//   const uploadRef = useRef<IKUpload | null>(null);
//   const [isUploading, setIsUploading] = react.useState(false);

//   const handleUploadStart = () => {
//     setIsUploading(true);
//   };

//   const handleUploadEnd = () => {
//     setIsUploading(false);
//   };

//   const handleError = (error: Error) => {
//     setIsUploading(false);
//     onUploadError(error);
//   };

//   const handleSuccess = (response: IKUploadResponse) => {
//     setIsUploading(false);
//     onUploadSuccess(response);
//   };

//   if (!session) {
//     return <div>Please log in to upload files.</div>;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <IKUpload
//         ref={uploadRef}
//         onError={handleError}
//         onSuccess={handleSuccess}
//         onUploadStart={handleUploadStart}
//         onUploadEnd={handleUploadEnd}
//         inputProps={{ accept: "image/*" }}
//         style={{
//           padding: "10px 20px",
//           border: "2px dashed #ccc",
//           borderRadius: "8px",
//           cursor: "pointer",
//           textAlign: "center",
//           width: "300px",
//         }}
//       />
//       {isUploading && (
//         <div className="mt-4 flex items-center space-x-2">
//           <Loader2 className="animate-spin h-5 w-5 text-gray-600" />
//           <span className="text-gray-600">Uploading...</span>
//         </div>
//       )}
//     </div>
//   );
// };
// export default FileUpload;