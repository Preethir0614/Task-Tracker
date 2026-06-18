import { Component, EventEmitter, OnDestroy, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnDestroy {
  @Output() taskCreated = new EventEmitter<void>();

  saving = false;
  error = '';
  success = '';
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private successTimer?: ReturnType<typeof setTimeout>;

  taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', Validators.required],
    due_date: ['', Validators.required],
    priority: ['Medium' as const, Validators.required]
  });

  submit() {
    this.error = '';
    this.success = '';

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.getRawValue();

    this.saving = true;
    this.taskService
      .addTask({
        title: formValue.title.trim(),
        description: formValue.description.trim(),
        due_date: formValue.due_date,
        priority: formValue.priority
      })
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe({
        next: () => {
          this.taskForm.reset({
            title: '',
            description: '',
            due_date: '',
            priority: 'Medium'
          });
          this.success = 'Task added.';
          if (this.successTimer) {
            clearTimeout(this.successTimer);
          }
          this.successTimer = setTimeout(() => {
            this.success = '';
          }, 2500);
          this.taskCreated.emit();
        },
        error: () => {
          this.error = 'Task could not be saved. Please check the backend connection.';
        }
      });
  }

  ngOnDestroy(): void {
    if (this.successTimer) {
      clearTimeout(this.successTimer);
    }
  }
}
