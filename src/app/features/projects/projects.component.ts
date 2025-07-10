import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { Project, Task } from './models/project.models';
import { DrawerModule } from 'primeng/drawer';
import { ProjectsService } from './services/projects.service';
import { HttpClientModule } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';


@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, TableModule, DrawerModule, ButtonModule, InputTextModule, CalendarModule, FormsModule, HttpClientModule, ConfirmDialogModule, ToastModule],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    providers: [ConfirmationService, MessageService],
})
export class ProjectsComponent implements OnInit {
    // Signals for state
    readonly projects = signal<Project[]>([]);
    readonly selectedProject = signal<Project | null>(null);
    readonly sidebarVisible = signal<boolean>(false);
    readonly isEditMode = signal<boolean>(false);

    private readonly projectsService = inject(ProjectsService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly messageService = inject(MessageService);
    readonly loading = signal<boolean>(false);
    readonly error = signal<string | null>(null);

    formProject: Project = this.getEmptyProject();

    tasksSidebarVisible = signal(false);
    selectedProjectTasks = signal<Task[] | null>(null);

    openTasksSidebar(project: { tasks: Task[] }) {
        this.selectedProjectTasks.set(project.tasks ?? []);
        this.tasksSidebarVisible.set(true);
    }

    closeTasksSidebar() {
        this.tasksSidebarVisible.set(false);
        this.selectedProjectTasks.set(null);
    }

    // Task management state for sidebar
    addTaskMode = false;
    editTaskIndex: number | null = null;
    newTask: Partial<Task> = { name: '', description: '', dueDate: '', isCompleted: false };
    editTask: Partial<Task> = {};

    onShowAddTask() {
        this.addTaskMode = true;
        this.newTask = { name: '', description: '', dueDate: '', isCompleted: false };
        this.editTaskIndex = null;
    }
    onCancelAddTask() {
        this.addTaskMode = false;
        this.newTask = { name: '', description: '', dueDate: '', isCompleted: false };
    }
    onAddTask() {
        if (!this.newTask.name || !this.newTask.dueDate) return;
        const task: Task = {
            id: this.generateId(),
            projectId: this.selectedProject()?.id ?? '',
            name: this.newTask.name!,
            description: this.newTask.description ?? '',
            dueDate: typeof this.newTask.dueDate === 'string' ? this.newTask.dueDate : (this.newTask.dueDate as Date).toISOString(),
            isCompleted: !!this.newTask.isCompleted,
        };
        this.formProject.tasks.push(task);
        this.selectedProjectTasks.set([...this.formProject.tasks]);
        this.addTaskMode = false;
        this.newTask = { name: '', description: '', dueDate: '', isCompleted: false };
    }
    onEditTask(index: number) {
        this.editTaskIndex = index;
        const task = this.selectedProjectTasks()?.[index];
        if (task) {
            this.editTask = { ...task };
        }
        this.addTaskMode = false;
    }
    onCancelEditTask() {
        this.editTaskIndex = null;
        this.editTask = {};
    }
    onSaveTask(index: number) {
        if (!this.editTask.name || !this.editTask.dueDate) return;
        const updatedTask: Task = {
            id: this.editTask.id!,
            projectId: this.selectedProject()?.id ?? '',
            name: this.editTask.name!,
            description: this.editTask.description ?? '',
            dueDate: typeof this.editTask.dueDate === 'string' ? this.editTask.dueDate : (this.editTask.dueDate as Date).toISOString(),
            isCompleted: !!this.editTask.isCompleted,
        };
        this.formProject.tasks[index] = updatedTask;
        this.selectedProjectTasks.set([...this.formProject.tasks]);
        this.editTaskIndex = null;
        this.editTask = {};
    }
    onDeleteTask(index: number) {
        this.formProject.tasks.splice(index, 1);
        this.selectedProjectTasks.set([...this.formProject.tasks]);
        if (this.editTaskIndex === index) {
            this.editTaskIndex = null;
            this.editTask = {};
        }
    }


    private getEmptyProject(): Project {
        return {
            id: '',
            name: '',
            dueDate: '',
            isCompleted: false,
            description: '',
            tasks: []
        };
    }

    openCreateSidebar() {
        this.formProject = this.getEmptyProject();
        this.selectedProject.set(null);
        this.isEditMode.set(false);
        this.sidebarVisible.set(true);
    }

    openEditSidebar(project: Project) {
        let dateValue: Date | string = '';
        if (project.dueDate) {
            // Try to parse as ISO string or fallback to Date constructor
            const parsed = Date.parse(project.dueDate as string);
            dateValue = isNaN(parsed) ? '' : new Date(parsed);
        }
        this.formProject = {
            ...project,
            dueDate: dateValue,
            tasks: [...project.tasks]
        };
        this.selectedProject.set({ ...project });
        this.isEditMode.set(true);
        this.sidebarVisible.set(true);
    }

    closeSidebar() {
        this.sidebarVisible.set(false);
        this.selectedProject.set(null);
        this.isEditMode.set(false);
        this.formProject = this.getEmptyProject();
    }

    onSubmit() {
        this.loading.set(true);
        this.error.set(null);
        if (this.isEditMode()) {
            this.projectsService.updateProject(this.formProject.id, this.formProject)
                .pipe(finalize(() => this.loading.set(false)))
                .subscribe({
                    next: () => {
                        // Optionally update local list using formProject
                        this.projects.update(projects =>
                            projects.map(p => p.id === this.formProject.id ? { ...this.formProject } : p)
                        );
                        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم التحديث بنجاح' });
                        this.closeSidebar();
                    },
                    error: (err) => {
                        this.error.set('فشل تحديث المشروع');
                        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل التحديث' });
                    }
                });
        } else {
            const { id, ...projectData } = this.formProject;
            this.projectsService.createProject(projectData as Omit<Project, 'id'>)
                .pipe(finalize(() => this.loading.set(false)))
                .subscribe({
                    next: (response) => {
                        const createdProject = {
                            ...this.formProject,
                            id: response.projectId // Use the ID from backend
                        };
                        this.projects.update(projects => [...projects, createdProject]);
                        this.closeSidebar();
                        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت الإضافة بنجاح' });
                    },
                    error: (err) => {
                        this.error.set('فشل إضافة المشروع');
                        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل الإضافة' });
                    }
                });
        }
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 10);
    }

    ngOnInit(): void {
        this.fetchProjects();
    }

    fetchProjects(): void {
        this.loading.set(true);
        this.error.set(null);
        this.projectsService.listProjects()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (projects) => {

                    this.projects.set(projects.projects);
                },
                error: (err) => {
                    this.error.set('فشل تحميل المشاريع');
                }
            });
    }

    // Add CRUD methods here (fetch, create, update, delete)

    onDeleteProject(project: Project): void {
        if (!project?.id) return;
        this.confirmationService.confirm({
            message: 'هل أنت متأكد أنك تريد حذف هذا المشروع؟',
            header: 'تأكيد الحذف',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'نعم',
            rejectLabel: 'لا',
            accept: () => this.deleteProjectConfirmed(project),
        });
    }

    private deleteProjectConfirmed(project: Project): void {
        this.loading.set(true);
        this.error.set(null);
        this.projectsService.deleteProject(project.id)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: () => {
                    this.projects.update(projects => projects.filter(p => p.id !== project.id));
                    this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم الحذف بنجاح' });
                },
                error: () => {
                    this.error.set('فشل حذف المشروع');
                    this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل الحذف' });
                }
            });
    }
} 