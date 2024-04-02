"use server";

import { DataFilesProps } from "@/app/_homeComponents/form/Form";
import { frontendRoutes } from "@/vendor/frontendRoutes";
import { revalidatePath } from "next/cache";

const deleteFile = async (prevState: DataFilesProps, formData: FormData): Promise<DataFilesProps> => {
    try {


        revalidatePath(frontendRoutes.home);

        prevState.message = 'File deleted Successfully'
        return prevState;
    } catch (error) {
        console.log(error)
        return { message: "Failed to delete file", type: 'error' };
    }
};

export default deleteFile;