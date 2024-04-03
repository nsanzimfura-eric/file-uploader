'use client'
import { returnFileExtension } from "@/helpers/returnFileExtension";
import { ListBlobResultBlob } from "@vercel/blob";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { ArrowLongDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Loading from "@/components/pageComponents/LoadingFile";
import { getTimeAgo } from "@/helpers/returnTimeAgo";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { initialValues, validationSchema } from './valildationSchema'


interface singleFileProps {
    file: ListBlobResultBlob;
}

const SingleFile = (props: singleFileProps) => {
    const { file } = props;
    const fileExtension = returnFileExtension(file.pathname);
    const [loading, sestLoading] = useState(true);
    const [editFileName, setEditFileName] = useState(false);

    const handleDeleteFile = () => {

    }

    useEffect(() => {
        setTimeout(() => {
            sestLoading(false);
        }, 3000)
    }, [])

    const handleEnableEdit = () => {
        setEditFileName(prev => !prev)
    }
    //formik for form edit

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
        },
    });

    useEffect(() => {
        if (editFileName) {
            // now we can edit
            formik.setFieldValue('blobName', file.pathname);
        }
    }, [editFileName])

    return (loading ? <Loading /> :
        <form className='h-auto sm:h-[70px] w-full rounded-[5px] items-center flex flex-col sm:flex-row gap-4 p-[10px] bg-white text-dark' onSubmit={formik.handleSubmit}>
            <Avatar className="bg-gray h-full  m-0 hidden sm:flex">
                <AvatarFallback className="border border-success h-full aspect-square w-auto font-sm">.{fileExtension?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col gap-1">
                {!editFileName && <a href={file.url} target="_blank" rel="noreferrer" className="flex-1 text-center">{file.pathname}</a>}
                {editFileName &&
                    <Input
                        type="text"
                        value={formik.values.blobName}
                        onChange={formik.handleChange}
                        id="blobName" name="blobName"
                        className="text-primary bg-transparent focused h-[20px] border border-red-200"
                    />
                }
                <div className="flex-1 flex gap-8 items-center justify-center">
                    <small className="text-xs text-center">{getTimeAgo(`${file.uploadedAt}`)}</small>
                    <button
                        type="button"
                        className="outline-none bg-card p-1 text-xs hover:bg-primary transition-all border-none focus:outline-none aspect-square w-auto flex justify-center items-center cursor-pointer text-white rounded-[3px]"
                        onClick={handleEnableEdit}
                    >
                        {!editFileName ? <Image src="/edit.svg" alt="Edit icon" width={16} height={16} />
                            : "Save"
                        }
                    </button>
                </div>
            </div>

            <div className="w-full sm:w-auto flex justify-between  sm:gap-6">
                <button type="button" className="p-10px bg-none sm:ms-auto h-full w-[30px] rounded-[5px] bg-success flex items-center justify-center">
                    <a href={file.downloadUrl}>
                        <ArrowLongDownIcon className="block h-6 w-6 text-white" aria-hidden="true" />
                    </a>
                </button>
                <button className="bg-none ms-auto h-full w-[30px] flex items-center justify-center" onClick={handleDeleteFile} >
                    <TrashIcon className="block h-6 w-6 text-error" aria-hidden="true" />
                </button>
            </div>
        </form>
    );
};

export default SingleFile;