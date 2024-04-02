'use client';

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useRef } from "react";
import { initialValues, validationSchema, validateFileSize } from './validationiSchama'
import { useFormik } from "formik";
import FeedbackNotification from "@/components/pageComponents/FeedBackNotification";


const Form = () => {
    const UploadRef = useRef<HTMLInputElement>(null);


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

    const saveFile = async (formData: FormData) => {
        //validate form first
        formik.handleSubmit();
        const file: File = await formData.get('file') as File;
        const fileName: string = await formData.get('fileName') as string;
        console.log(file, fileName);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
        formik.setFieldValue("file", file);
        //set file name
        formik.setFieldValue("fileName", file?.name);
        const fileSizeError = validateFileSize(file);
        if (fileSizeError !== '') {
            formik.setFieldError("file", fileSizeError);
        }
    }


    return (
        <form action={saveFile} className='bg-none flex flex-col items-center gap-1'>
            <div className="bg-none flex items-center gap-6 p-0 m-0">
                <input
                    type="file"
                    id="file"
                    name="file"
                    hidden
                    ref={UploadRef}
                    onChange={handleFileChange}
                />
                <div
                    onClick={handleFileUpload}
                    className="flex cursor-pointer gap-1 bg-card-foreground h-[60px] sm:h-[40px] min-w-[200px] sm:min-w-[300px] text-white border-none rounded-[5px] items-center p-[10px] transition-all hover:bg-primary"
                >
                    <Image
                        src="/logo.svg"
                        width={25}
                        height={30}
                        alt="Upload logo"
                    />
                    {!formik.values.file && "Upload File"}
                    {formik.values.file && <Input type="text" value={formik.values.fileName} onChange={formik.handleChange} id="fileName" name="fileName" className="border-none bg-none text-white rounded-sm outline-none focus:outline-none" />}
                </div>
                <button type="submit" className="rounded-[5px] text-white bg-primary h-[60px] sm:h-[40px] flex items-center justify-center p-[0px_20px] hover:bg-card-foreground transition-all">save</button>
            </div>
            {formik.errors &&
                <div className="m-0 p-0 w-full flex justify-start items-start flex-col">
                    {formik.errors.file &&
                        <FeedbackNotification title="Error" type="error" message={formik.errors.file} />
                    }
                    {formik.errors.fileName &&
                        <FeedbackNotification title="Error" type="error" message={formik.errors.fileName} />
                    }
                </div>}
        </form>
    );
};

export default Form;