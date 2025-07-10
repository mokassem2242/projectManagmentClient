import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.models';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    private readonly baseUrl = `${environment.apiUrl}/project`; // Adjust base URL as needed

    constructor(private readonly http: HttpClient) { }

    createProject(project: any): Observable<any> {
        return this.http.post<any>(this.baseUrl, project);
    }

    updateProject(id: string, project: Partial<Project>): Observable<Project> {
        return this.http.put<Project>(`${this.baseUrl}/${id}`, project);
    }

    listProjects(): Observable<any> {
        return this.http.get<any>(this.baseUrl);
    }

    deleteProject(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
} 