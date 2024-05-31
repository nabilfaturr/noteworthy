import { ScrollArea } from "@/components/ui/scroll-area";
import { useFolderStore } from "@/store/folders.store";
import { Button } from "../ui/button";

type TScrollAreaFolder = {
  folders: {
    id: string;
    title: string;
    userId: string | null;
  }[];
  handleSelectedFolder: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ScrollAreaFolder = ({
  folders,
  handleSelectedFolder,
}: TScrollAreaFolder) => {
  return (
    <ScrollArea className="h-[240px] rounded-md border mt-2">
      <div className="p-3 space-y-2">
        <span className="text-sm font-medium text-slate-900">
          {folders.length > 1 ? "Folders" : "Folder"}
        </span>
        {folders.map((folder) => (
          <Button
            key={folder.id}
            type="submit"
            onClick={() => handleSelectedFolder(folder as any)}
            className="bg-white hover:bg-slate-100 w-full text-slate-700 flex justify-start border rounded"
          >
            {folder.title}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ScrollAreaFolder;
