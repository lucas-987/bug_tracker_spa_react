import ErrorMessage from "./ErrorMessage";
import Error from "../../../interfaces/Error";
import { useAppSelector } from "../../../app/hooks";
import { selectErrors } from "../../../features/errorsSlice";

function ErrorMessages() {
    const errors = useAppSelector(selectErrors)

    return (
        <>
        {errors.map((error, index) =>
            <ErrorMessage error={error} key={index} />
        )}
        </>
    );
}

export default ErrorMessages