import React from "react";
import { useTheme } from "next-themes";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/cn";

import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { html as cmHTML } from "@codemirror/lang-html";
import { autocompletion } from "@codemirror/autocomplete";
import { foldGutter } from "@codemirror/language";
import { createBodyTheme, customTheme } from "./bodyTheme";

import { linter } from "@codemirror/lint";

interface Props {
  value: string;
  onChange: (value: string) => void;
  type?: BodyType;
}

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "variable",
});

const myFoldGutter = foldGutter({
  openText: "▾",
  closedText: "▸",
});

const BodyEditor = ({ value, onChange, type = "application/json" }: Props) => {
  const { theme } = useTheme();

  const bodyTheme = createBodyTheme(theme ?? "light", type);

  return (
    <ReactCodeMirror
      value={value}
      extensions={[
        ...(type === "application/json"
          ? [json(), linter(jsonParseLinter())]
          : []),
        ...(type === "application/xml"
          ? [cmHTML({ autoCloseTags: true })]
          : []),
        autocompletion({
          override: [],
        }),
        myFoldGutter,
        EditorView.lineWrapping,
      ]}
      onChange={onChange}
      minHeight="10px"
      className={cn(
        "text-[12px] font-medium text-text-w-pri",
        robotoMono.className
      )}
      theme={[bodyTheme, customTheme(theme)]}
      basicSetup={{
        foldGutter: false,
      }}
    />
  );
};

export default BodyEditor;
