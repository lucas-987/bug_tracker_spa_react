import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getBugById, selectCurrentBug, updateBug } from "../../features/Project/projectSlice";
import Bug from "../../interfaces/Bug";
import Description from "../common/Description";
import Header from "../Header";
import BugProperties from "./BugProperties";

function BugPage() {
    let { id } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const bugId: number = Number(id);
        dispatch(getBugById(bugId));
    }, [])

    const bug = useAppSelector(selectCurrentBug);

    const onTitleEdited = (newTitle: string) => {
        if(bug != null) {
            const newBug: Bug = {
                id: bug.id,
                title: newTitle,
                status: "",
                priority: -1
            }
            dispatch(updateBug(newBug))
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
            dispatch(updateBug(newBug))
        }
    }

    return (
        <div>
            <Header title={bug?.title} editable={true} onEdited={onTitleEdited} />

            <div className="bugPageWrapper">
                <div className="bugMainSection">
                    <Description text={bug != null ? bug.description : ""}
                        wrapperClassName="bugMainSectionCard descriptionWrapper"
                        descriptionEditedCallback={onDescriptionEdited} />
                </div>
            
                <BugProperties bug={bug} />
            </div>
        </div>
    );
}

export default BugPage;