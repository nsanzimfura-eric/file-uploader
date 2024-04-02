'use client'
import Loading from "@/components/pageComponents/LoadingFile";
import useFetchData from "@/hooks/useFetch";
import { useEffect } from "react";
import SingleFile from "./SingleFile";
import FeedbackNotification from "@/components/pageComponents/FeedBackNotification";


const ListFiles = () => {
    const { fetchHandler, data, loading, error } = useFetchData();
    useEffect(() => {
        void fetchHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='w-full m-0 p-0'>
            {loading && <Loading />}
            {error && !loading && <FeedbackNotification title="Error With Fetching Files" type="error" message={String(error)} />}
            {!loading && data && data.map((file) => {
                return <SingleFile key={file.url} file={file} />
            })}
        </div>
    );
};

export default ListFiles;