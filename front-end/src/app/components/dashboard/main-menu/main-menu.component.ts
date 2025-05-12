import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroSquares2x2, heroRectangleGroup, heroUsers,heroCog6Tooth, heroMagnifyingGlass, heroBell } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-main-menu',
  imports: [ NgIcon,RouterLink ],
  providers: [provideIcons( { heroSquares2x2, heroRectangleGroup, heroUsers,heroCog6Tooth, heroMagnifyingGlass, heroBell } )],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
}) 
export class MainMenuComponent {

}
