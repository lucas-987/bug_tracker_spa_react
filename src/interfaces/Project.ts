import Bug from "./Bug";

export default interface Project {
    id: number;
    title: string;
    description?: string | null;
    bugs?: Bug[] | null;
};