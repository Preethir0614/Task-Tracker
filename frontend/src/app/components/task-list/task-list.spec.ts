import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TaskListComponent } from './task-list';
import { Task } from '../../models/task';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should count all tasks instead of only filtered tasks', () => {
    const pendingTask: Task = {
      id: 1,
      title: 'Pending task',
      priority: 'Medium',
      is_done: false
    };
    const doneTask: Task = {
      id: 2,
      title: 'Done task',
      priority: 'High',
      is_done: true
    };
    const hiddenPendingTask: Task = {
      id: 3,
      title: 'Hidden pending task',
      priority: 'Low',
      is_done: false
    };

    component.tasks = [pendingTask];
    component.allTasks = [pendingTask, doneTask, hiddenPendingTask];

    expect(component.pendingCount).toBe(2);
    expect(component.doneCount).toBe(1);
  });
});
