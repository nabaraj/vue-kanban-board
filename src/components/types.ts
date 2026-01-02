export const STATUS = {
    TODO: "todo",
    IN_PROGRESS: "in-progress",
    DONE: "done",
} as const;

export type StatusType = typeof STATUS[keyof typeof STATUS];

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: StatusType;
};
export type StatusColumn = {
    title: string;
    type: StatusType;
    theme: string;
    color: string;
};