'use client';

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { initialValues, validationSchema, validateFileSize } from './validationiSchama'
import { useFormik } from "formik";
import FeedbackNotification, { TitleType } from "@/components/pageComponents/FeedBackNotification";
import { useFormState, useFormStatus } from "react-dom";
import uploadFile from "@/server-actions/file/UploadFile";
import ProgressBar from "@/components/pageComponents/ProgressBar";
import { returnNameWithNoSpaces } from "@/helpers/returnNameWithNoSpaces";

export interface DataFilesProps {
    message: string,
    data?: any,
    type: TitleType;
}

const Form = () => {
    const initialState: DataFilesProps = {
        message: '',
        type: 'success',
    }

    const UploadRef = useRef<HTMLInputElement>(null);
    const [editFileName, setEditFileName] = useState(true);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [fileExtension, setFileExtension] = useState<string | null>(null);
    const [state, uploadFileAction] = useFormState(uploadFile, initialState);
    const { pending } = useFormStatus();



    //use global form to access all the form values
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const { fileName } = values;
            const file: File = values.file!;
            let fileNameWithNoSpaces = returnNameWithNoSpaces(fileName);
            const fullFileName = `${fileNameWithNoSpaces}.${fileExtension}`;
            const newFile = new File([file], fullFileName, {
                type: file.type,
                lastModified: file.lastModified,
            });
            const formData = new FormData();
            formData.append('file', newFile);
            //call server actions with form data
            uploadFileAction(formData)
            //set loading
            setUploadLoading(true);
        },
    });

    const handleFileUpload = () => {
        UploadRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
        if (file) {
            const fileSizeError = validateFileSize(file);
            if (fileSizeError !== '') {// error
                formik.setFieldError("file", fileSizeError);
            } else {//no error
                formik.setFieldValue("file", file);
                //set file name
                const fileParts = file.name.split('.');
                const extension = fileParts.pop() as string;
                const fileName = fileParts.join('.');
                setFileExtension(extension);
                formik.setFieldValue("fileName", fileName);
            }
        }
    }

    const handleEnableEdit = () => {
        setEditFileName(!editFileName);
    }

    useEffect(() => {
        if (state.message !== '') {
            setUploadLoading(false);
        }
        //    const timer = setTimeout(() => {}, 400)

    }, [state.message])

    return (
        // NOTE:  @@ I am calling server actions from form submission functions!! This is because from nre GitHub Vercel/next.js discussion: https://github.com/vercel/next.js/discussions/50358
        //App Router: File Upload File objects are not supported #50358, we firstly need to imbed file object in formData then we call server actions
        <form className='bg-none flex flex-col items-center gap-1' onSubmit={formik.handleSubmit}>
            <div className="bg-none flex flex-col sm:flex-row flex-wrap items-center gap-6 p-0 m-0 max-w-[100%]">
                <input
                    type="file"
                    id="file"
                    name="file"
                    hidden
                    ref={UploadRef}
                    onChange={handleFileChange}
                />
                <div
                    className="flex flex-col sm:flex-row gap-3 bg-card-foreground h-auto  sm:h-[50px] min-w-[200px] sm:min-w-[300px] text-white border-none rounded-[5px] items-center p-[10px] pr-0 transition-all"
                >
                    <div
                        onClick={handleFileUpload}
                        className={`flex cursor-pointer gap-1 h-full items-center justify-start ${!formik.values.file ? "flex-1" : ""}`}
                    >
                        <Image
                            src="/logo.svg"
                            width={25}
                            height={30}
                            alt="Upload logo"
                        />
                        {!formik.values.file && "Upload File"}
                    </div>
                    {formik.values.file &&
                        <div className="flex flex-col sm:flex-row p-0 h-auto sm:h-[50px] flex-1 gap-2 pr-[0] items-center bg-danger">
                            <Input
                                disabled={editFileName}
                                type="text"
                                value={formik.values.fileName}
                                onChange={formik.handleChange}
                                id="fileName" name="fileName"
                                className="border-none text-white rounded-[5px] outline-none focus:outline-none focus:border-none shadow-none h-full bg-transparent d-flex items-start justify-start"
                            />
                            {fileExtension && <span>.{fileExtension}</span>}
                            <button
                                type="button"
                                className="outline-none bg-success-light hover:bg-success transition-all border-none focus:outline-none min-w-[60px] px-[10px] h-full flex justify-center items-center cursor-pointer text-white rounded-[5px]"
                                onClick={handleEnableEdit}
                            >
                                {editFileName ? <Image src="/edit.svg" alt="Edit icon" width={20} height={20} />
                                    : "Save"
                                }
                            </button>
                        </div>
                    }
                </div>
                <button type="submit" aria-disabled={uploadLoading} disabled={(formik.values.file === null || uploadLoading)} className="rounded-[5px] text-white bg-primary h-[40px] sm:h-[50px] flex items-center justify-center p-[0px_20px] hover:bg-card-foreground transition-all">Upload</button>
            </div>
            {uploadLoading && <ProgressBar loading={uploadLoading} />}
            {formik.errors &&
                <div className="m-0 p-0 w-full flex justify-start items-start flex-col">
                    {formik.errors.file &&
                        <FeedbackNotification title="Error" type="error" message={formik.errors.file} />
                    }
                    {formik.errors.fileName &&
                        <FeedbackNotification title="Error" type="error" message={formik.errors.fileName} />
                    }
                    {state.message !== '' &&
                        <FeedbackNotification title="Upload Feedback" type={state.type} message={state.message} />
                    }
                </div>}
        </form>
    );
};

export default Form;