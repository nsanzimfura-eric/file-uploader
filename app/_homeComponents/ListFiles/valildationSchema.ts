import * as Yup from "yup";

export const validationSchema = Yup.object({
  blobName: Yup.string().required("File name is required"),
  file: Yup.mixed().nullable(),
});

export const initialValues = {
    blobName: "",
  file: null,
};
