interface Props {
    isVisible: boolean;
    isExpanded: boolean;
    onClick: () => void;
}

const EXPANDED_TEXT = "READ LESS ..."
const REDUCED_TEXT = "READ MORE ..."

function ReadMoreButton({ isVisible, isExpanded, onClick }: Props) {

    if(!isVisible) return (<></>);

    let text = isExpanded ? EXPANDED_TEXT : REDUCED_TEXT

    return (
        <div className="read-more-button" onClick={() => onClick()}>{text}</div>
    );
}

export default ReadMoreButton