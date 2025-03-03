import createTheme from "@uiw/codemirror-themes";
import { EditorView } from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";

export function createBodyTheme(theme: string, type: ResponseDataType) {
  return createTheme({
    theme: "light",
    settings: {
      background: theme === "dark" ? "#181818" : "#fefefe",
      foreground: theme === "dark" ? "#fcfcfc" : "#202020",
      caret: "#5d00ff",
      selection: "#036dd626",
      selectionMatch: "#036dd626",
      lineHighlight: theme === "dark" ? "#252525" : "#f1f1f1",
      gutterBackground: theme === "dark" ? "#181818" : "#fefefe",
      gutterForeground: theme === "dark" ? "#a0a0a0" : "#5f5f5f",
      gutterBorder: theme === "dark" ? "#333333" : "#ececec",
    },
    styles:
      type === "JSON"
        ? [
            {
              tag: t.propertyName,
              color: theme === "dark" ? "#60a5fa" : "#dc2626",
            },
            { tag: t.string, color: theme === "dark" ? "#e879f9" : "#2563eb" },
            { tag: t.number, color: theme === "dark" ? "#a78bfa" : "#7c3aed" },
            { tag: t.bool, color: theme === "dark" ? "#a78bfa" : "#c026d3" },
            { tag: t.null, color: theme === "dark" ? "#f472b6" : "#db2777" },
            { tag: t.brace, color: theme === "dark" ? "#fcfcfc" : "#202020" },
            {
              tag: t.squareBracket,
              color: theme === "dark" ? "#fcfcfc" : "#202020",
            },
            {
              tag: t.punctuation,
              color: theme === "dark" ? "#fcfcfc" : "#202020",
            },
          ]
        : type === "HTML" || type === "XML"
        ? [
            { tag: t.tagName, color: theme === "dark" ? "#60a5fa" : "#dc2626" }, // Tag names
            {
              tag: t.attributeName,
              color: theme === "dark" ? "#e879f9" : "#2563eb",
            }, // Attributes
            { tag: t.string, color: theme === "dark" ? "#a78bfa" : "#7c3aed" }, // Attribute values
            {
              tag: t.angleBracket,
              color: theme === "dark" ? "#fcfcfc" : "#202020",
            }, // < and >
            { tag: t.comment, color: theme === "dark" ? "#6b7280" : "#9ca3af" }, // Comments
            {
              tag: t.punctuation,
              color: theme === "dark" ? "#fcfcfc" : "#202020",
            }, // Punctuation
          ]
        : [],
  });
}

export const customTheme = EditorView.theme({
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
