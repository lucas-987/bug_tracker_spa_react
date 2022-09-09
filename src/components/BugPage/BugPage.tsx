import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import Bug from "../../interfaces/Bug";
import bugService from "../../services/bugService";
import Description from "../common/Description";
import Header from "../common/header/Header";
import BugProperties from "./BugProperties";
import Error from "../../interfaces/Error";
import { addError } from "../../features/errorsSlice";
import ErrorMessages from "../common/errors/ErrorMessages";
import { useTranslation } from "react-i18next";

function BugPage() {
    const dispatch = useAppDispatch()

    let { id } = useParams();
    const [bug, setBug] = useState<Bug>()

    useEffect(() => {
        const bugId: number = Number(id);
        getBug(bugId)
    }, [])

    const { t } = useTranslation()

    const NETWORK_ERROR_TITLE = t('errors.global.networkErrorTitle')
    const NETWORK_ERROR_MESSAGE = t('errors.global.networkErrorMessage')
    const NETWORK_ERROR_MESSAGE_ACTION = t('errors.global.networkErrorMessageAction')
    const REQUEST_ERROR_TITLE = t('errors.global.requestErrorTitle')
    const INTERNAL_ERROR_TITLE = t('errors.global.internalErrorTitle')
    const SOMETHING_WENT_WRONG_MESSAGE = t('errors.global.somethingWentWrong')

    const getBug = (id: number) => {
        bugService.getById(id)
            .then(result => {
                if(result.success) setBug(result.data)
                else {
                    const err: Error = {
                        id: "",
                        type: "ERROR",
                        message: result.message!
                    }

                    dispatch(addError(err))
                }
            })
            .catch(err => {
                const error: Error = {
                    id: "",
                    title: NETWORK_ERROR_TITLE,
                    type: "ERROR",
                    message: NETWORK_ERROR_MESSAGE
                }

                dispatch(addError(error))
            })
    }

    const onBugUpdated = (updatedBug: Bug) => {
        bugService.update(updatedBug)
            .then(result => {
                if(result.success) {
                    const data = result.data as any

                    if(bug != null && bug.id == data.id) {
                        let bugCopy = {...bug} as Bug

                        if("title" in data && data.title != undefined) bugCopy.title = data.title
                        if("description" in data && data.description != undefined) bugCopy.description = data.description
                        if("priority" in data && data.priority != undefined) bugCopy.priority = data.priority
                        if("status" in data && data.status != undefined) bugCopy.status = data.status
                        if("due_date" in data && data.due_date != undefined) bugCopy.due_date = data.due_date
                        if("end_date" in data && data.end_date != undefined) bugCopy.end_date = data.end_date

                        setBug(bugCopy)
                    }
                    else {
                        const error: Error = {
                            id: "",
                            title: INTERNAL_ERROR_TITLE,
                            type: "ERROR",
                            message: SOMETHING_WENT_WRONG_MESSAGE
                        }
    
                        dispatch(addError(error))
                    }
                }
                else {
                    const error: Error = {
                        id: "",
                        title: REQUEST_ERROR_TITLE,
                        type: "ERROR",
                        message: result.message!
                    }

                    dispatch(addError(error))
                }
            })
            .catch(err => {
                const error: Error = {
                    id: "",
                    title: NETWORK_ERROR_TITLE,
                    type: "ERROR",
                    message: NETWORK_ERROR_MESSAGE_ACTION
                }

                dispatch(addError(error))
            })
    }

    const onTitleEdited = (newTitle: string) => {
        if(bug != null) {
            const newBug: Bug = {
                id: bug.id,
                title: newTitle,
                status: "",
                priority: -1
            }
            onBugUpdated(newBug)
        }
    }

    const onDescriptionEdited = (newDescription: string) => {
        if(bug != null) {
            const newBug: Bug = {
                id: bug.id,
                title: "",
                status: "",
                priority: -1,
                description: newDescription
            }
            onBugUpdated(newBug)
        }
    }

    return (
        <div>
            <Header title={bug?.title} editable={true} onEdited={onTitleEdited} />
            <ErrorMessages />

            <div className="bug-page-wrapper">
                <div className="bug-main-section">
                    <Description text={bug != null ? bug.description : ""}
                        wrapperClassName="bug-main-section__card description-wrapper"
                        descriptionEditedCallback={onDescriptionEdited} />
                </div>
            
                <BugProperties bug={bug} onBugUpdated={onBugUpdated} />
            </div>
        </div>
    );
}

export default BugPage;