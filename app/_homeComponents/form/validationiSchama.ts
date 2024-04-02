import * as Yup from "yup";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB in bytes

export const validationSchema = Yup.object({
  fileName: Yup.string().required("File name is required"),
  file: Yup.mixed().nullable(),
});

export const initialValues = {
  fileName: "",
  file: null,
};

export const validateFileSize = (file: File | null) => {
  let error: string = "";

  if (file && file.size > FILE_SIZE_LIMIT) {
    error = `File size must be smaller than 5MB`;
  }
  return error;
};
