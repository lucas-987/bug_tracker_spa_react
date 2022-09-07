export type ErrorType = "ERROR" | "SUCCESS" | "WARNING"

export default interface Error {
    id: string,
    title?: string,
    message: string,
    type: ErrorType,
    occuredAt?: Date,
}