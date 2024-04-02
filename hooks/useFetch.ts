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
      const { blobs } = await list();
      setData(blobs);
    } catch (err: any) {
      setError(err);
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  return { fetchHandler, data, loading, error };
};

export default useFetchData;
