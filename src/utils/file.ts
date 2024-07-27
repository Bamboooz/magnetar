const fileName = (path: string) => {
  const parts = path.split(/[/\\]+/);
  const fileWithExtension = parts.pop();

  const fileName = fileWithExtension!.split(".")[0]; // file dialog only allows files, so the path won't be undefined

  return fileName;
};

export { fileName };
