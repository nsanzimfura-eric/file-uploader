import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

type TitleType = 'error' | 'info' | 'success';
interface FeedbackNotificationProps {
    message: string
    type?: TitleType;
    title: string;
}

const FeedbackNotification = (props: FeedbackNotificationProps) => {
    const { message, title, type = 'success' } = props;

    return (
        <Alert variant="destructive" className="rounded-[10px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    );
};

export default FeedbackNotification;