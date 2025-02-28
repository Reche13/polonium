import React from "react";
import { useTheme } from "next-themes";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/cn";

import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import { foldGutter } from "@codemirror/language";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "variable",
});

const myFoldGutter = foldGutter({
  openText: "▾",
  closedText: "▸",
});

const customTheme = EditorView.theme({
  "&": {
    fontFamily: `"Roboto Mono", monospace !important`,
    height: "100% !important",
  },
  ".cm-scroller": {
    fontFamily: `"Roboto Mono", monospace !important`,
  },
  ".cm-lineNumbers .cm-gutterElement": {
    paddingLeft: "20px",
  },
  ".cm-foldGutter span": {
    cursor: "pointer",
    color: "#888",
    fontSize: "12px",
    padding: "0 8px",
  },
});

const BodyEditor = ({ value, onChange }: Props) => {
  const { theme } = useTheme();

  const myTheme = createTheme({
    theme: "light",
    settings: {
      background: theme === "dark" ? "#181818" : "#fefefe",
      foreground: "#75baff",
      caret: "#5d00ff",
      selection: "#036dd626",
      selectionMatch: "#036dd626",
      lineHighlight: theme === "dark" ? "#252525" : "#f1f1f1",
      gutterBackground: theme === "dark" ? "#181818" : "#fefefe",
      gutterForeground: theme === "dark" ? "#a0a0a0" : "#5f5f5f",
      gutterBorder: theme === "dark" ? "#333333" : "#ececec",
    },
    styles: [
      { tag: t.propertyName, color: theme === "dark" ? "#60a5fa" : "#dc2626" },
      { tag: t.string, color: theme === "dark" ? "#e879f9" : "#2563eb" },
      { tag: t.number, color: theme === "dark" ? "#a78bfa" : "#7c3aed" },
      { tag: t.bool, color: theme === "dark" ? "#a78bfa" : "#c026d3" },
      { tag: t.null, color: theme === "dark" ? "#f472b6" : "#db2777" },
      { tag: t.brace, color: theme === "dark" ? "#fcfcfc" : "#202020" },
      { tag: t.squareBracket, color: theme === "dark" ? "#fcfcfc" : "#202020" },
      { tag: t.punctuation, color: theme === "dark" ? "#fcfcfc" : "#202020" },
    ],
  });

  return (
    <ReactCodeMirror
      value={value}
      extensions={[json(), myFoldGutter, EditorView.lineWrapping]}
      onChange={onChange}
      minHeight="10px"
      className={cn(
        "text-[12px] font-medium text-text-w-pri",
        robotoMono.className
      )}
      theme={[myTheme, customTheme]}
      basicSetup={{
        foldGutter: false,
      }}
    />
  );
};

export default BodyEditor;
