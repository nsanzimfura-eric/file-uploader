import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {

    return (
        <div className='h-auto sm:h-[70px] w-full rounded-[5px] items-center flex flex-col sm:flex-row gap-4 p-[10px] bg-slate-100'>
            <Skeleton className="rounded-full w-auto bg-slate-300 h-full aspect-square m-0 hidden sm:flex" />
            <div className="flex-1 flex flex-col gap-1 bg-transparent w-full sm:w-auto">
                <Skeleton className=" h-[10px] bg-slate-300" />
                <div className="flex-1 flex gap-3 items-center justify-center bg-transparent">
                    <Skeleton className="h-[20px] bg-slate-300" />
                    <div
                        className="outline-none flex-1 bg-transparent gap-8 text-xs transition-all flex justify-center items-center mt-auto"
                    >
                        <Skeleton className="h-3 w-full bg-slate-300 rounded-[5px]" />
                        <Skeleton className="h-3 w-full bg-slate-300 rounded-[5px]" />
                    </div>
                </div>
            </div>

            <div className="w-full sm:w-auto flex justify-between  sm:gap-6 bg-transparent">
                <div className="p-10px bg-none sm:ms-auto h-full w-[30px] rounded-[5px] flex items-center justify-center bg-transparent">
                    <Skeleton className="block h-6 w-6 bg-slate-300" aria-hidden="true" />
                </div>
                <div className="bg-transparent ms-auto h-full w-[30px] flex items-center justify-center" >
                    <Skeleton className="block h-6 w-6 bg-slate-300" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

export default Loading;