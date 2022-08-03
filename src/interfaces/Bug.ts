export default interface Bug {
    id: number;
    title: string;
    description?: string | null;
    priority: number;
    status: string; // type in backend ( "open" | "close" );
    start_date?: Date | null;
    end_date?: Date | null;
    due_date?: Date | null;
}