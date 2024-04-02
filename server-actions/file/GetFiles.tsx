"use server";

import { list } from '@vercel/blob';
import { DataFilesProps } from "@/app/_homeComponents/form/Form";

const getFiles = async (prevState: DataFilesProps, formData: FormData): Promise<DataFilesProps> => {

    try {
        const { blobs: data } = await list();
        console.log(data, 'test blobs')

        return { message: 'Files retrieved Successfully', data, };

    } catch (error) {
        console.log(error)
        return { message: "Failed to retrieve files" };
    }
};

export default getFiles;