import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/hooks";
import { removeError } from "../../../features/errorsSlice";
import Error, { ErrorType } from "../../../interfaces/Error";

interface Props {
    error: Error
}

const errorColor: Record<ErrorType, String> = {
    "ERROR": "background-error",
    "SUCCESS": "background-success",
    "WARNING": "background-warning",
}

function ErrorMessage ({ error }: Props) {
    const dispatch = useAppDispatch()
    
    const { t } = useTranslation()

    const errorTitles: Record<ErrorType, String> = {
        "ERROR": t('errors.error'),
        "SUCCESS": t('errors.success'),
        "WARNING": t('errors.error'),
    }

    const deleteIconClicked = () => {
        dispatch(removeError(error.id))
    }

    return (
        <div className="error-message-wrapper">
            <div className="error-message">
                <div className={"color-border " + errorColor[error.type]}></div>
                <div className="error-message__content">
                    <span className="error-message__title">{error.title != null ? error.title : errorTitles[error.type]}</span>
                    <span className="error-message__text">{error.message}</span>
                </div>
                <div className="error-message__close-icon-wrapper">
                    <img className="error-message__close-icon" draggable="false" src="assets/close.svg"
                        onClick={() => deleteIconClicked()} />
                </div>
            </div>
        </div>
    );
}

export default ErrorMessage