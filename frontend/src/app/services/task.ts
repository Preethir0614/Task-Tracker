import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTask, Task, TaskPriority, TaskStatusFilter } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(status: TaskStatusFilter = 'All', priority: TaskPriority | '' = ''): Observable<Task[]> {
    let params = new HttpParams();

    if (status !== 'All') {
      params = params.set('status', status);
    }

    if (priority) {
      params = params.set('priority', priority);
    }

    return this.http.get<Task[]>(this.apiUrl, { params });
  }

  addTask(task: CreateTask): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/${id}`,
      task
    );
  }
}
