import SingleFile from "./SingleFile";
import { ListBlobResultBlob, list } from "@vercel/blob";

const ListFiles = async () => {
    const { blobs } = await list();

    return (
        <div className='w-full m-0 p-0 flex flex-col gap-4 mt-[40px]'>

            {blobs && blobs.map((file: ListBlobResultBlob) => {
                return <SingleFile key={file.url} file={file} />
            })}
        </div>
    );
};

export default ListFiles;