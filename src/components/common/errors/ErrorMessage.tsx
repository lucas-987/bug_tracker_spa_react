import { Dictionary } from "@reduxjs/toolkit";

type ErrorType = "ERROR" | "SUCCESS" | "WARNING"

interface Props {
    message: string;
    errorType: ErrorType;
}

const errorTitles: Record<ErrorType, String> = {
    "ERROR": "Error",
    "SUCCESS": "Success",
    "WARNING": "Warning",
}

const errorIcon: Record<ErrorType, String> = {
    "ERROR": "close.svg",
    "SUCCESS": "ok.svg",
    "WARNING": "",
}

const errorColor: Record<ErrorType, String> = {
    "ERROR": "background-error",
    "SUCCESS": "background-success",
    "WARNING": "background-warning",
}

function ErrorMessage ({ message, errorType }: Props) {
    return (
        <div className="error-message-wrapper">
            <div className="error-message">
                <div className={"color-border " + errorColor[errorType]}></div>
                {/*<img className="error-message__main-icon" draggable="false" src={"assets/" + errorIcon[errorType]} />*/}
                <div className="error-message__content">
                    <span className="error-message__title">{errorTitles[errorType]}</span>
                    <span className="error-message__text">{message}</span>
                </div>
                <div className="error-message__close-icon-wrapper">
                    <img className="error-message__close-icon" draggable="false" src="assets/close.svg" />
                </div>
            </div>
        </div>
    );
}

export default ErrorMessage