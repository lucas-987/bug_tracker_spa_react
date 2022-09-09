import { useTranslation } from "react-i18next";

interface Props {
    isVisible: boolean;
    isExpanded: boolean;
    onClick: () => void;
}

function ReadMoreButton({ isVisible, isExpanded, onClick }: Props) {
    const { t } = useTranslation()

    if(!isVisible) return (<></>);

    let text = isExpanded ? t('buttons.readLess') : t('buttons.readMore')

    return (
        <div className="read-more-button" onClick={() => onClick()}>{text}</div>
    );
}

export default ReadMoreButton