export const returnFileExtension = (fileName: string): string => {
  const fileExtension = fileName.split(".").pop() as string;
  return fileExtension;
};
