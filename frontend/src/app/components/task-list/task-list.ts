import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TaskForm } from '../task-form/task-form';
import { TaskService } from '../../services/task';
import { Task, TaskPriority, TaskStatusFilter } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskForm],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  loading = false;
  error = '';
  statusFilter: TaskStatusFilter = 'All';
  priorityFilter: TaskPriority | '' = '';
  readonly statuses: TaskStatusFilter[] = ['All', 'Pending', 'Done'];
  readonly priorities: (TaskPriority | '')[] = ['', 'Low', 'Medium', 'High'];

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  get pendingCount(): number {
    return this.tasks.filter(task => !task.is_done).length;
  }

  get doneCount(): number {
    return this.tasks.filter(task => task.is_done).length;
  }

  loadTasks() {
    this.loading = true;
    this.error = '';

    this.taskService
      .getTasks(this.statusFilter, this.priorityFilter)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: data => {
          this.tasks = data;
        },
        error: err => {
          console.error('Failed to load tasks', err);
          this.error = 'Tasks could not be loaded. Make sure the backend API is running on http://localhost:3000.';
        }
      });
  }

  toggleDone(task: Task) {
    const updatedTask: Task = {
      ...task,
      is_done: !task.is_done
    };

    this.taskService
      .updateTask(task.id!, updatedTask)
      .subscribe({
        next: () => {
          this.loadTasks();
        },
        error: () => {
          this.error = 'Task status could not be updated.';
        }
      });
  }

  deleteTask(id: number) {

    if(confirm('Delete this task?')) {

      this.taskService
        .deleteTask(id)
        .subscribe({
          next: () => {
            this.loadTasks();
          },
          error: () => {
            this.error = 'Task could not be deleted.';
          }
        });

    }
  }

}
