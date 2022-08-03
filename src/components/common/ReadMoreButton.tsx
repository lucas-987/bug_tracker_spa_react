interface Props {
    isVisible: boolean;
    isExpanded: boolean;
    onClick: () => void;
}

function ReadMoreButton({ isVisible, isExpanded, onClick }: Props) {

    if(!isVisible) return (<></>);

    let text = isExpanded ? "READ LESS ..." : "READ MORE ..."

    return (
        <div className="readMoreButton" onClick={() => onClick()}>{text}</div>
    );
}

export default ReadMoreButton