import { returnFileExtension } from "@/helpers/returnFileExtension";
import { ListBlobResultBlob } from "@vercel/blob";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { TrashIcon } from "@heroicons/react/24/outline";

interface singleFileProps {
    file: ListBlobResultBlob;
}

const SingleFile = (props: singleFileProps) => {
    const { file } = props;
    const fileExtension = returnFileExtension(file.pathname);

    return (
        <div className='h-12 w-full rounded-[5px] flex gap-4 p-[10px] bg-white text-dark'>
            <Avatar>
                <AvatarFallback>.{fileExtension?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <a href={file.downloadUrl}>{file.pathname}</a>
            <button className="p-10px bg-none ms-auto h-full w-[30px] flex items-center justify-center">
                <TrashIcon className="block h-6 w-6 text-error" aria-hidden="true" />
            </button>
        </div>
    );
};

export default SingleFile;