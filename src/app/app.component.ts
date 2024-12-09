import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports:[CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  router = inject(Router);


  navTo(url: string) {
    this.router.navigate([url])
  }

}
