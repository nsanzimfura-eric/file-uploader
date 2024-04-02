import ListFiles from "../ListFiles/ListFiles";
import Form from "../form/Form";

interface FilesProps { }

const Files = async (props: FilesProps) => {
    const { } = props;
    return (
        <div className='flex-1 m-0 p-0'>
            <Form />
            <ListFiles />
        </div>
    );
};

export default Files;