import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className="flex items-center space-x-4 bg-none">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-12 w-[200px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-[5px]" />
        </div>
    );
};

export default Loading;