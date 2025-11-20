import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.css'],
  standalone: true,
  imports: [
    CommonModule,  // for *ngFor, *ngIf, pipes like 'date'
    FormsModule    // for [(ngModel)]
  ],
  providers: [DatePipe] // if you want to inject it, optional
})
export class ProjectComponent implements OnInit {
  name: string = '';
  dueDate: string = '';
  course: string = '';
  _id: string = '';

  projects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data),
      error: (err) => console.log(err),
    });
  }

  addProject() {
    const newProject = {
      name: this.name,
      dueDate: this.dueDate,
      course: this.course,
    };

    this.projectService.addProject(newProject).subscribe(() => {
      this.loadProjects(); // refresh the table
      this.clearForm();
    });
  }

  updateProject() {
    const updatedProject = {
      _id: this._id,
      name: this.name,
      dueDate: this.dueDate,
      course: this.course
    };

    this.projectService.updateProject(updatedProject).subscribe(() => {
      this.loadProjects();
      this.clearForm();
    });
  }

  deleteProject(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  selectProject(project: any) {
    this._id = project._id;
    this.name = project.name;
    this.dueDate = project.dueDate.substring(0, 10);
    this.course = project.course;
  }

  clearForm() {
    this._id = '';
    this.name = '';
    this.dueDate = '';
    this.course = '';
  }
}
