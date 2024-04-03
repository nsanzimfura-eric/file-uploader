import { ListBlobResultBlob } from "@vercel/blob";

export const sortRecentFirst =  (blobs:ListBlobResultBlob[])=>{
    return blobs?blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()):[];

}