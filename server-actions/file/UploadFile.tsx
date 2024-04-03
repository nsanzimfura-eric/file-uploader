"use server";

import { put } from '@vercel/blob';
import { frontendRoutes } from "@/vendor/frontendRoutes";
import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';
import { DataFilesProps } from '@/app/_homeComponents/form/Form';

const uploadFile = async (prevState: DataFilesProps, formData: FormData): Promise<DataFilesProps> => {
    const file: File = await formData.get('file') as File;

    try {
        const blob = await put(file.name, file, {
            access: 'public',
        });

        revalidatePath(frontendRoutes.home);
        prevState.data = blob;
        prevState.message = `File: ${file.name} Uploaded Successfully`;
        return prevState;

    } catch (error) {
        console.log(error)
        return { message: "Failed to upload File", type: 'error' };
    }
};

export default uploadFile;