import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'app-topbar',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class Topbar {
  protected readonly CartIcon = ShoppingCart;
}
