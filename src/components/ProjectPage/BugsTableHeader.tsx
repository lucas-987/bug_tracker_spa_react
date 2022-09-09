import { useTranslation } from "react-i18next";
import { Filters } from "./BugsTable"

interface Props {
    filter: Filters;
    changeFilter: (newFilter: Filters) => void;
    addNewBug: () => void;
}

function BugsTableHeader({ addNewBug, filter, changeFilter }: Props) {
    const { t } = useTranslation()

    return (
        <header className="bugs-table__header">
            <span className="bugs-table__header__title">{t('projectPage.bugsTableHeaders.title')}</span>
            <span className="bugs-table__header__priority">{t('projectPage.bugsTableHeaders.priority')}</span>
            <span className="bugs-table__header__start-date">{t('projectPage.bugsTableHeaders.startDate')}</span>
            <span className="bugs-table__header__due-date">{t('projectPage.bugsTableHeaders.dueDate')}</span>
            <span className="bugs-table__header__actions">
                <a className={filter == "open" ? "filterSelected" : "filter"}
                    onClick={() => changeFilter("open")}>{t('projectPage.bugsTableHeaders.open')}</a>
                <a className={filter == "close" ? "filterSelected" : "filter"}
                    onClick={() => changeFilter("close")}>{t('projectPage.bugsTableHeaders.close')}</a>
                <img className="addIcon" draggable="false" src="assets/plus.svg"
                    onClick={addNewBug} />
            </span>
        </header>
    );
}

export default BugsTableHeader