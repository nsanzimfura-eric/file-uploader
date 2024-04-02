'use client';

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { initialValues, validationSchema, validateFileSize } from './validationiSchama'
import { useFormik } from "formik";
import FeedbackNotification from "@/components/pageComponents/FeedBackNotification";
import { useFormState, useFormStatus } from "react-dom";
import uploadFile from "@/server-actions/file/UploadFile";
import { returnFileExtension } from "@/helpers/returnFileExtension";


export interface DataFilesProps {
    message: string,
    data?: any
}

const Form = () => {
    const initialState: DataFilesProps = {
        message: ''
    }

    const UploadRef = useRef<HTMLInputElement>(null);
    const [editFileName, setEditFileName] = useState(true);
    const [fileExtension, setFileExtension] = useState<string | null>(null);
    const [state, uploadFileAction] = useFormState(uploadFile, initialState);
    const { pending: uploadLoading } = useFormStatus();


    //use global form to access all the form values
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values, 'test values')
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
                const extension = returnFileExtension(file.name);
                const fileName = fileParts.join('.');
                setFileExtension(extension);
                formik.setFieldValue("fileName", fileName);
            }
        }
    }

    const handleEnableEdit = () => {
        setEditFileName(!editFileName);
    }

    const onlyValidateForm = () => {
        //validate Form first
        formik.validateForm();
    }

    return (
        <form action={uploadFileAction} className='bg-none flex flex-col items-center gap-1' onSubmit={onlyValidateForm}>
            <div className="bg-none flex items-center gap-6 p-0 m-0 max-w-[100%]">
                <input
                    type="file"
                    id="file"
                    name="file"
                    hidden
                    ref={UploadRef}
                    onChange={handleFileChange}
                />
                <div
                    className="flex gap-3 bg-card-foreground h-[40px] sm:h-[50px] min-w-[200px] sm:min-w-[300px] text-white border-none rounded-[5px] items-center p-[10px] pr-0 transition-all"
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
                        <div className="flex p-0 h-[40px] sm:h-[50px] flex-1 gap-2 pr-[0] items-center bg-danger">
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
                <button type="submit" aria-disabled={uploadLoading} className="rounded-[5px] text-white bg-primary h-[40px] sm:h-[50px] flex items-center justify-center p-[0px_20px] hover:bg-card-foreground transition-all">Upload</button>
            </div>
            {formik.errors &&
                <div className="m-0 p-0 w-full flex justify-start items-start flex-col">
                    {formik.errors.file &&
                        <FeedbackNotification title="Error" type="error" message={formik.errors.file} />
                    }
                    {formik.errors.fileName &&
                        <FeedbackNotification title="Error" type="error" message={formik.errors.fileName} />
                    }
                    {state.message !== '' &&
                        <FeedbackNotification title="Upload Feedback" type="info" message={state.message} />
                    }
                </div>}
        </form>
    );
};

export default Form;