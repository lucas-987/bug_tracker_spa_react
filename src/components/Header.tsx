import { useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
    title?: string;
    editable?: boolean;
    onEdited?: (newTitle:string) => void;
}

const DEFAULT_TITLE = "Bug Tracker"

function Header({ title = DEFAULT_TITLE, editable = false, onEdited }: Props) {
    const [editing, setEditing] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title);

    const toggleEditing = () => {
        setEditing(!editing);
    }

    const editingValidated = () => {
        onEdited != undefined && onEdited(newTitle)
        setEditing(false)
    }
    
    return (
        <header className="top-bar">
            <span className="top-bar__title-wrapper">
                {editing ?
                    <>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <img src="assets/close.svg" onClick={() => toggleEditing()} />
                        <img src="assets/ok.svg" onClick={() => editingValidated()} />
                    </>
                :
                    <>
                        <h1>{title}</h1>
                        {editable && (<img src="assets/edit.svg" onClick={() => toggleEditing()} />)}
                    </>
                }
            </span>
        </header>
    );
}

export default Header;