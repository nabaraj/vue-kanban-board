import { STATUS } from "./types";
import type { StatusColumn } from "./types"

export const STATUS_COLUMNS: StatusColumn[] = [
    { title: "To-Do", type: STATUS.TODO, color: "#eafaff", theme: "blue" },
    { title: "In-Progress", type: STATUS.IN_PROGRESS, color: "#ffdfa4", theme: "orange" },
    { title: "Done", type: STATUS.DONE, color: "#abf2ab", theme: "green" },
];

export const LOCAL_TASK = "LOCAL_TASK"