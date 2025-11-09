
export enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
}

export interface Task {
    id: number;
    category: string;
    description: string;
    deadline: string;
    responsible: string;
    status: TaskStatus;
}

export interface LogEntry {
    id: number;
    date: string;
    workedOn: string;
    hours: string;
    blockers: string;
    nextActions: string;
}
