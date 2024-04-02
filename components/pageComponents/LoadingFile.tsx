import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className="flex items-center w-full space-x-4 bg-none rounded-[5px]">
            <Skeleton className="h-12 w-12 rounded-full bg-slate-300" />
            <div className=" h-full flex-1">
                <Skeleton className="h-12 w-full bg-slate-300 rounded-[5px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-[5px] bg-slate-300" />
        </div>
    );
};

export default Loading;