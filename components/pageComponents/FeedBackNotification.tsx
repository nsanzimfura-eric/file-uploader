'use client'

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { useEffect, useState } from "react";

export type TitleType = 'error' | 'info' | 'success';
interface FeedbackNotificationProps {
    message: string
    type?: TitleType;
    title: string;
}

const FeedbackNotification = (props: FeedbackNotificationProps) => {
    const { message, title, type = 'success' } = props;
    const [classNames, setClassNames] = useState('text-success')
    const [classNamesMaster, setClassNamesMaster] = useState('bg-success-light text-success');


    useEffect(() => {
        switch (type) {
            case 'success':
                break;
            case 'error':
                setClassNamesMaster('bg-error-light text-error');
                setClassNames('text-error');
                break;
            case 'info':
                setClassNamesMaster('bg-info-light text-info');
                setClassNames('text-info');
                break;
            default:
                break;
        }
    }, [type]);


    return (
        <Alert variant="destructive" className={`${classNamesMaster} rounded-[10px] w-full p-[20px] border-none`}>
            <AlertTitle className={`${classNames} bg-none font-bold`}>{title}</AlertTitle>
            <AlertDescription className={`${classNames} bg-none`}>
                {message}
            </AlertDescription>
        </Alert>
    );
};

export default FeedbackNotification;