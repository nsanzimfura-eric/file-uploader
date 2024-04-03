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

interface singleFileProps {
    file: ListBlobResultBlob;
}

const SingleFile = (props: singleFileProps) => {
    const { file } = props;
    const fileExtension = returnFileExtension(file.pathname);
    const [loading, sestLoading] = useState(true);

    const handleDeleteFile = () => {

    }

    useEffect(() => {
        setTimeout(() => {
            sestLoading(false);
        }, 3000)
    }, [])

    return (loading ? <Loading /> :
        <form className='h-14 w-full rounded-[5px] items-center flex gap-4 p-[10px] bg-white text-dark'>
            <Avatar className="bg-gray h-full p-0 m-0">
                <AvatarFallback className="border border-success h-full font-sm">.{fileExtension?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <a href={file.url} target="_blank" rel="noreferrer" className="flex-1">{file.pathname}</a>
            <button type="button" className="p-10px bg-none ms-auto h-full w-[30px] rounded-[5px] bg-success flex items-center justify-center">
                <a href={file.downloadUrl}>
                    <ArrowLongDownIcon className="block h-6 w-6 text-white" aria-hidden="true" />
                </a>
            </button>
            <button className="bg-none ms-auto h-full w-[30px] flex items-center justify-center" onClick={handleDeleteFile} >
                <TrashIcon className="block h-6 w-6 text-error" aria-hidden="true" />
            </button>
        </form>
    );
};

export default SingleFile;