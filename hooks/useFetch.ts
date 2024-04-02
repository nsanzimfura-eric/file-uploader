import { useState } from "react";
import { ListBlobResultBlob, list } from "@vercel/blob";

const useFetchData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ListBlobResultBlob[] | null>(null);
  const [error, setError] = useState<any>(null);

  const fetchHandler = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      const options: any = {
        token: "vercel_blob_rw_Zsg6kgSyZrPvqfSJ_erpMZk0f61miVEiexQBpPjXxDPmQFc",
        mode: "no-cors",
      };
      console.log(token);
      const { blobs } = await list(options);
      setData(blobs);
    } catch (err: any) {
      setError(err);
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  };

  return { fetchHandler, data, loading, error };
};

export default useFetchData;
