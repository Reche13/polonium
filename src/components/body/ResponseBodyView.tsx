import React from "react";
import { useTheme } from "next-themes";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/cn";

import ReactCodeMirror, {
  EditorState,
  EditorView,
} from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { html as cmHTML } from "@codemirror/lang-html";
import { foldGutter } from "@codemirror/language";
import { createBodyTheme, customTheme } from "./bodyTheme";

import { formatBodyContent } from "./formatBody";

interface Props {
  value: string;
  type: ResponseDataType;
}

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "variable",
});

const myFoldGutter = foldGutter({
  openText: "▾",
  closedText: "▸",
});

const ResponseBodyView = ({ value, type = "JSON" }: Props) => {
  const { theme } = useTheme();

  const bodyTheme = createBodyTheme(theme ?? "light", type);

  return (
    <ReactCodeMirror
      value={formatBodyContent(value, type)}
      extensions={[
        ...(type === "JSON" ? [json()] : []),
        ...(type === "XML" || type === "HTML" ? [cmHTML()] : []),
        myFoldGutter,
        EditorView.lineWrapping,
        EditorState.readOnly.of(true),
      ]}
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

export default ResponseBodyView;
