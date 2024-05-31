"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import type { Editor } from "@tiptap/react";
import "ldrs/tailChase";
import Loading from "../shared/Icon/Loading";
import { Separator } from "../ui/separator";
import { SeparatorVerticalIcon } from "lucide-react";

type TTypography = {
  editor: Editor | null;
};

const Typography = ({ editor }: TTypography) => {
  return (
    <div className="flex justify-center items-center gap-4 p-1">
      <div className="space-x-1">
        <Bold editor={editor} />
        <Italic editor={editor} />
        <Underline editor={editor} />
        <Strike editor={editor} />
      </div>
    </div>
  );
};

const Bold = ({ editor }: TTypography) => {
  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const isBoldActive = editor?.isActive("bold") || false;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            variant={"outline"}
            pressed={isBoldActive}
            className="p-4 border-none font-bold"
            onPressedChange={handleBold}
          >
            B
          </Toggle>
        </TooltipTrigger>
        <TooltipContent className="flex gap-2">
          <p>Bold</p>
          <p className="text-slate-500 text-[14px]">Ctrl + B</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Italic = ({ editor }: TTypography) => {
  const handleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const isItalicActive = editor?.isActive("italic") || false;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            variant={"outline"}
            pressed={isItalicActive}
            className="p-4 border-none font-mono italic"
            onPressedChange={handleItalic}
          >
            I
          </Toggle>
        </TooltipTrigger>
        <TooltipContent className="flex gap-2">
          <p>Italic</p>
          <p className="text-slate-500 text-[14px]">Ctrl + I</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Underline = ({ editor }: TTypography) => {
  const handleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  const isUnderlineActive = editor?.isActive("underline") || false;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            variant={"outline"}
            pressed={isUnderlineActive}
            className="p-4 border-none underline"
            onPressedChange={handleUnderline}
          >
            U
          </Toggle>
        </TooltipTrigger>
        <TooltipContent className="flex gap-2">
          <p>Underline</p>
          <p className="text-slate-500 text-[14px]">Ctrl + U</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Strike = ({ editor }: TTypography) => {
  const handleStrike = () => {
    editor?.chain().focus().toggleStrike().run();
  };

  const isStrikeActive = editor?.isActive("strike") || false;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            variant={"outline"}
            pressed={isStrikeActive}
            className="p-4 border-none line-through"
            onPressedChange={handleStrike}
          >
            S
          </Toggle>
        </TooltipTrigger>
        <TooltipContent className="flex gap-2">
          <p>Strike</p>
          <p className="text-slate-500 text-[14px]">Ctrl + Shift + S</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Typography;
