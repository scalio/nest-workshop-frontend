import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Building } from '../interfaces/building.interface';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingComponent {
  @Input() data: Building;
  @Input() isDisabled: boolean;
  @Input() isBuilt: boolean;
  @Output() build = new EventEmitter();

  get thumbnail(): string {
    return `/assets/images/buildings/${this.data.id}.jpg`;
  }

  getResourceIconPath(name: string): string {
    return name ? `/assets/images/resources/${name.toLowerCase()}.png` : '';
  }
}
