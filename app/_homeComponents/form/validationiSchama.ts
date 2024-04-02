import * as Yup from "yup";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB in bytes

export const validationSchema = Yup.object({
  fileName: Yup.string().required("File name is required"),
  file: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File too large",
      (value: any) => value && value.size <= FILE_SIZE_LIMIT
    ),
});

export const initialValues = {
  fileName: "",
  file: null,
};

export const validateFileSize = (file: File | null) => {
  let error: string = "";

  if (file && file.size > FILE_SIZE_LIMIT) {
    error = `File size must be smaller than ${FILE_SIZE_LIMIT / 1024 / 1024}MB`;
  }
  return error;
};
