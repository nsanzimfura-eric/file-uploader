'use client'
import Loading from "@/components/pageComponents/LoadingFile";
import useFetchData from "@/hooks/useFetch";
import { useEffect } from "react";
import SingleFile from "./SingleFile";
import FeedbackNotification from "@/components/pageComponents/FeedBackNotification";
import { ListBlobResultBlob } from "@vercel/blob";


const ListFiles = () => {
    const { fetchHandler, data, loading, error } = useFetchData();
    useEffect(() => {
        void fetchHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='w-full m-0 p-0 flex flex-col gap-4 mt-[40px]'>
            {data && !loading && <h4 className="font-bold text-primary">Uploaded Files: </h4>}
            {loading && Array.from({ length: 5 }, (_, index) => index).map((load) => <Loading key={load} />)}
            {error && !loading && <FeedbackNotification title="Error With Fetching Files" type="error" message={String(error)} />}
            {!loading && data && data.map((file: ListBlobResultBlob) => {
                return <SingleFile key={file.url} file={file} />
            })}
        </div>
    );
};

export default ListFiles;