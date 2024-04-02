"use server";

import { put } from '@vercel/blob';
import { frontendRoutes } from "@/vendor/frontendRoutes";
import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';
import { DataFilesProps } from '@/app/_homeComponents/form/Form';

const uploadFile = async (prevState: DataFilesProps, formData: FormData): Promise<DataFilesProps> => {
    const file: File = await formData.get('file') as File;
    const fileName: string = await formData.get('fileName') as string;
    const fileNameParts = file.name.split('.');
    const extension = fileNameParts.pop() as string;
    const fullName = `${fileName}.${extension}`;
    const newFile = { ...file, name: fullName, }

    try {
        const blob = await put(fileName, newFile, {
            access: 'public',
        });

        revalidatePath(frontendRoutes.home);

        return { message: `File: ${fullName} Uploaded Successfully`, data: NextResponse.json(blob) };

    } catch (error) {
        console.log(error)
        return { message: "Failed to upload File" };
    }
};

export default uploadFile;