import { useState } from "react";
import { ListBlobResultBlob, list } from "@vercel/blob";

const useFetchData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ListBlobResultBlob[] | null>(null);
  const [error, setError] = useState<any>(null);

  const postHandler = async () => {
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
      }, 2000);
    }
  };

  return { postHandler, data, loading, error };
};

export default useFetchData;
