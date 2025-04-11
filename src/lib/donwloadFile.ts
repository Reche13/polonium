export const downloadFile = (
  text: string,
  filename: string,
  type: string = "text/plain"
) => {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};
