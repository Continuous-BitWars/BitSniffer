import {Component, ElementRef, ViewChild} from '@angular/core';
import {StyleService} from "../services/styleService/style.service";
import {ColorMode} from "../models/style/colorMode";

@Component({
  selector: 'app-style-button',
  standalone: true,
  imports: [],
  templateUrl: './style-button.component.html',
  styleUrl: './style-button.component.css'
})
export class StyleButtonComponent {

  // a reference to the style switch
  @ViewChild('styleSwitch') styleSwitch!: ElementRef;

  // a reference to the style switch
  @ViewChild('scaleSelect') renderScaleSelect!: ElementRef;

  // constructor with the required services:
      // styleService to update the style
  constructor(protected styleService: StyleService) {};

  // wait for the view init
  ngAfterViewInit(): void {
    // load the current style
    this.styleSwitch.nativeElement.checked = this.styleService.getStyle() === ColorMode.DarkMode;
    this.renderScaleSelect.nativeElement.value = this.styleService.renderScale;
  }

  // switch toggle function
  toggleSwitch(): void {
    // set the new state
    this.styleService.setStyle(this.styleSwitch.nativeElement.checked ? ColorMode.DarkMode : ColorMode.LightMode);
  }

  protected readonly parseInt = parseInt;
}
