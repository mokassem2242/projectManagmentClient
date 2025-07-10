export interface Task {
    readonly id: string;
    readonly projectId: string;
    readonly name: string;
    readonly description: string;
    readonly isCompleted?: boolean;
    readonly dueDate: string;
}

export interface Project {
    readonly id: string;
    name: string;
    dueDate: string | Date;
    isCompleted: boolean;
    description: string;
    tasks: Task[];
} 