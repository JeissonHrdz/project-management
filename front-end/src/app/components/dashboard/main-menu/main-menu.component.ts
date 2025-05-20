import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroSquares2x2, heroRectangleGroup, heroUsers,heroCog6Tooth, heroMagnifyingGlass, heroBell, heroChevronDown} from '@ng-icons/heroicons/outline';
import $ from 'jquery';
@Component({
  selector: 'app-main-menu',
  imports: [ NgIcon,RouterLink, CommonModule],
  providers: [provideIcons( { heroSquares2x2, heroRectangleGroup, heroUsers,heroCog6Tooth, heroMagnifyingGlass, heroBell, heroChevronDown } )],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
}) 
export class MainMenuComponent {

  openMenuProjects(){  
    $('.menu-projects').toggle("fast");
  }

}
