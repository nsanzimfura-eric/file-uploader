import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressProps {
    loading: boolean;
}

const ProgressBar = ({ loading }: ProgressProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer: any;

        if (loading && progress < 100) {
            clearInterval(timer);

            timer = setInterval(() => {
                setProgress((prevProgress) => {
                    const increment = prevProgress < 50 ? 10 : prevProgress < 80 ? 5 : 2;
                    const nextProgress = prevProgress + increment;
                    return nextProgress > 100 ? 100 : nextProgress;
                });
            }, 1000);
        }

        if (!loading) {
            setProgress(100);
            setTimeout(() => setProgress(0), 500);
        }

        return () => {
            clearInterval(timer);
        };
    }, [loading, progress]);

    return <Progress value={progress} className="w-full" />;
};

export default ProgressBar;
