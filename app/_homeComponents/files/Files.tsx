import ListFiles from "../ListFiles/ListFiles";
import Form from "../form/Form";


const Files = async () => {
    return (
        <div className='flex-1 m-0 p-0'>
            <Form />
            <ListFiles />
        </div>
    );
};

export default Files;