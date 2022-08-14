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
        <header className="topBar">
            <span className="titleWrapper">
                {editing ?
                    <>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <img src="assets/ok.svg" onClick={() => editingValidated()} />
                        <img src="assets/close.svg" onClick={() => toggleEditing()} />
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