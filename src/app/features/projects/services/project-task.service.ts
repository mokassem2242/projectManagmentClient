// ProjectTaskService: Handles CRUD for project tasks
// API endpoints based on ProjectTaskController (see Postman collection)
// POST   /projecttask
// GET    /projecttask/{id}
// GET    /projecttask
// PUT    /projecttask/{id}
// DELETE /projecttask/{id}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/project.models';

@Injectable({
    providedIn: 'root',
})
export class ProjectTaskService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = '/projecttask'; // Adjust base URL as needed

    createTask(task: Omit<Task, 'id' | 'isCompleted'> & { projectId: string }): Observable<Task> {
        return this.http.post<Task>(`${this.baseUrl}`, task);
    }

    getTaskById(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.baseUrl}/${id}`);
    }

    getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.baseUrl}`);
    }

    updateTask(id: string, task: Partial<Omit<Task, 'id' | 'isCompleted'>> & { projectId: string }): Observable<Task> {
        return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
    }

    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
} 