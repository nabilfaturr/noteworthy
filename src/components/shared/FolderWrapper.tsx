// // "use client";

// // import React from "react";
// // import Mainbar from "./Mainbar";
// // import { User } from "next-auth";
// // import Sidebar from "./Sidebar";
// // import { TFolderSelect } from "@/types";

// // type TFolderWrapper = {
// //   userInfo: User | undefined;
// //   userId: string;
// //   folderId?: string;
// // };

// // const FolderWrapper = ({ userId, userInfo, folderId }: TFolderWrapper) => {
// //   const [folderTitle, setFolderTitle] = React.useState<string>("");
// //   const [folders, setFolders] = React.useState<TFolderSelect[]>([]);

// //   const fetchFolders = async () => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:3000/api/folder/${userId}`
// //       );

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch folders");
// //       }

// //       console.log(response)

// //       const data = await response.json();

// //       if (!data) {
// //         throw new Error("Invalid response from server");
// //       }

// //       if (data.length === 0) {
// //         throw new Error("No folders found");
// //       }

// //       if (data) {
// //         console.log(data);
// //         setFolders(data);
// //       }

// //       // trigger sonner
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   React.useEffect(() => {
// //     fetchFolders();
// //   }, []);

// //   React.useEffect(() => {
// //     fetchFolders();
// //   }, [folderTitle]);

// //   const handleFoldersChange = (folders: TFolderSelect[]) => {
// //     setFolders(folders);
// //   };

// //   const handleFolderTitle = (newTitle: string) => {
// //     setFolderTitle(newTitle);
// //   };

// //   return (
// //     <div className="sm:flex w-full h-full">
// //       <Sidebar
// //         folders={folders}
// //         handleFoldersChange={handleFoldersChange}
// //         userInfo={userInfo}
// //         userId={userId}
// //       />
// //       <Mainbar
// //         userId={userId}
// //         folderId={folderId}
// //         folderTitle={folderTitle}
// //         handleFolderTitle={handleFolderTitle}
// //       />
// //     </div>
// //   );
// // };

// // export default FolderWrapper;

// "use client";

// import React from "react";
// import Mainbar from "./Mainbar";
// import { User } from "next-auth";
// import Sidebar from "./Sidebar";
// import { TFolderSelect } from "@/types";
// import { useFolderStore } from "@/store/folders.store";

// type TFolderWrapper = {
//   userInfo: User | undefined;
//   userId: string;
//   folderId?: string;
// };

// const FolderWrapper = ({ userId, userInfo, folderId }: TFolderWrapper) => {
//   const [folderTitle, setFolderTitle] = React.useState<string>("");
//   const { fetchFolders, folders, setFolder, setFolders } = useFolderStore(
//     (state) => state
//   );

//   React.useEffect(() => {
//     fetchFolders(userId);
//     console.log("folders", folders);
//   }, []);

//   React.useEffect(() => {
//     fetchFolders(userId);
//   }, [folderTitle]);

//   const handleFoldersChange = (folders: TFolderSelect[]) => {
//     setFolders(folders);
//   };

//   const handleFolderTitle = (newTitle: string) => {
//     setFolderTitle(newTitle);
//   };

//   return (
//     <div className="sm:flex w-full h-full">
//       <Sidebar
//         userInfo={userInfo}
//         userId={userId}
//       />
//       <Mainbar
//         userId={userId}
//         folderId={folderId}
//         folderTitle={folderTitle}
//         handleFolderTitle={handleFolderTitle}
//       />
//     </div>
//   );
// };

// export default FolderWrapper;

// "use client";

// import React from "react";
// import Mainbar from "./Mainbar";
// import { User } from "next-auth";
// import Sidebar from "./Sidebar";
// import { TFolderSelect } from "@/types";

// type TFolderWrapper = {
//   userInfo: User | undefined;
//   userId: string;
//   folderId?: string;
// };

// const FolderWrapper = ({ userId, userInfo, folderId }: TFolderWrapper) => {
//   const [folderTitle, setFolderTitle] = React.useState<string>("");
//   const [folders, setFolders] = React.useState<TFolderSelect[]>([]);

//   const fetchFolders = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/folder/${userId}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch folders");
//       }

//       console.log(response)

//       const data = await response.json();

//       if (!data) {
//         throw new Error("Invalid response from server");
//       }

//       if (data.length === 0) {
//         throw new Error("No folders found");
//       }

//       if (data) {
//         console.log(data);
//         setFolders(data);
//       }

//       // trigger sonner
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   React.useEffect(() => {
//     fetchFolders();
//   }, []);

//   React.useEffect(() => {
//     fetchFolders();
//   }, [folderTitle]);

//   const handleFoldersChange = (folders: TFolderSelect[]) => {
//     setFolders(folders);
//   };

//   const handleFolderTitle = (newTitle: string) => {
//     setFolderTitle(newTitle);
//   };

//   return (
//     <div className="sm:flex w-full h-full">
//       <Sidebar
//         folders={folders}
//         handleFoldersChange={handleFoldersChange}
//         userInfo={userInfo}
//         userId={userId}
//       />
//       <Mainbar
//         userId={userId}
//         folderId={folderId}
//         folderTitle={folderTitle}
//         handleFolderTitle={handleFolderTitle}
//       />
//     </div>
//   );
// };

// export default FolderWrapper;

"use client";

import React from "react";
import Mainbar from "./Mainbar";
import { User } from "next-auth";
import Sidebar from "./Sidebar";
import { useFolderStore } from "@/store/folders.store";

type TFolderWrapper = {
  userInfo: User | undefined;
  userId: string;
  folderId: string;
};

const FolderWrapper = ({ userId, userInfo, folderId }: TFolderWrapper) => {
  const { fetchFolders, fetchFolder, folder } = useFolderStore((state) => ({
    fetchFolders: state.fetchFolders,
    fetchFolder: state.fetchFolder,
    folder: state.folder,
  }));

  React.useEffect(() => {
    fetchFolders(userId);
    fetchFolder(userId, folderId);
  }, []);

  React.useEffect(() => {
    fetchFolders(userId);
  }, [folder]);

  return (
    <div className="sm:flex w-full h-full -">
      <Sidebar userInfo={userInfo} userId={userId} />
      <Mainbar userId={userId} folderId={folderId} />
    </div>
  );
};

export default FolderWrapper;
