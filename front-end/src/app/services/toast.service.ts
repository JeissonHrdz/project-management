import { Injectable } from '@angular/core';
import $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toast(message: string, type: string) {
    const toast ='.toast-' + type + '-container';  
    if (!$(toast).hasClass('active')) {
      $(toast).show(() => {
        $(toast).animate({
          right: '0px',
        }, "fast");
        $(toast + ' .toast-content').text(message);
        $(toast).addClass('active');
        setTimeout(() => {
          $(toast).animate({
            right: '-400px',
          }, "fast");
          $(toast).removeClass('active');
        }, 5000, () => {
          $(toast).hide();

        });
      });
    } 
  }
}
