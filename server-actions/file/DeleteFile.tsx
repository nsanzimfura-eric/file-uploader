import { frontendRoutes } from "@/vendor/frontendRoutes";
import { revalidatePath } from "next/cache";

const deleteFile = async (prevState: { message: string }, formData: FormData): Promise<{ message: string }> => {
    try {


        revalidatePath(frontendRoutes.home);
        return { message: 'File deleted Successfully' };
    } catch (error) {
        console.log(error)
        return { message: "Failed to delete file" };
    }
};

export default deleteFile;