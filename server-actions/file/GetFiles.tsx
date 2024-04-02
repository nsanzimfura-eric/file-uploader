"use server";

import { frontendRoutes } from "@/vendor/frontendRoutes";
import { revalidatePath } from "next/cache";

const getFiles = async (prevState: { message: string }, formData: FormData): Promise<{ message: string }> => {

    try {


        revalidatePath(frontendRoutes.home);
        return { message: 'Files retrieved Successfully' };
    } catch (error) {
        console.log(error)
        return { message: "Failed to retrieve files" };
    }
};

export default getFiles;