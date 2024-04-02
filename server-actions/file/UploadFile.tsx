import { frontendRoutes } from "@/vendor/frontendRoutes";
import { revalidatePath } from "next/cache";

const uploadFile = async (prevState: { message: string }, formData: FormData): Promise<{ message: string }> => {
    const file: File = await formData.get('file') as File;
    const fileName: string = await formData.get('fileName') as string;
    const fileNameParts = file.name.split('.');
    const extension = fileNameParts.pop() as string;
    const fullName = `${fileName}.${extension}`
    console.log(file, fullName);

    try {


        revalidatePath(frontendRoutes.home);
        return { message: `File: ${fullName} Uploaded Successfully` };
    } catch (error) {
        console.log(error)
        return { message: "Failed to delete todo" };
    }
};

export default uploadFile;