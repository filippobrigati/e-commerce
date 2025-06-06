import { Component } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  protected readonly UserIcon = User;
}
