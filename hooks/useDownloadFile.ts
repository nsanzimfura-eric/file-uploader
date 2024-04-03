import { useState } from "react";

const useDownloadFile = ()=>{
    const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  const downloadHandler = async (file:any, name:string) => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(file.downloadUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.blob();
      const downloadUrl = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadUrl;

      link.download = name;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      setLoading(false);
    } catch (err: any) {
      setError(String(err) ||'Failed to download file');
    } finally {
      setLoading(false);
    }
  };

  return { downloadHandler, loading, error };

}

export default useDownloadFile;