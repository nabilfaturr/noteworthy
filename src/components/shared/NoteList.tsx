import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { timeAgo } from "@/lib/utils";
import { TNoteSelect } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import NoteDropdown from "./NoteDropdown";
import { useNoteStore } from "@/store/note.store";

export interface NoteListProps {
  userId: string;
  folderId?: string;
}

const NoteList = ({ userId, folderId }: NoteListProps) => {
  const notes = useNoteStore((state) => state.notes);

  const router = useRouter();

  const handlePageNavigate = (noteId: string) => {
    router.push(`/workspace/${noteId}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.map((note) => (
          <TableRow
            key={note.id}
            onClick={() => handlePageNavigate(note.id)}
            className="relative group cursor-pointer"
          >
            <TableCell className="font-medium">{note.title}</TableCell>
            <TableCell className="text-slate-600">
              {timeAgo(note.createdAt as string)}
            </TableCell>
            <TableCell className="text-slate-600">
              {timeAgo(note.updatedAt as string)}
            </TableCell>
            <TableCell>
              <NoteDropdown userId={userId} note={note} folderId={folderId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NoteList;
