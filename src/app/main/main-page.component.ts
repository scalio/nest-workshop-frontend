import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../core/auth/auth.service';
import { Building } from './interfaces/building.interface';
import { Resource } from './interfaces/resource.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../store/common/interfaces/app-state.interface';
import { Observable } from 'rxjs/Observable';
import { mergeBuildingsAndAvailability } from './store/selectors/buildings.selectors';
import { selectUserResources } from './store/selectors/resources.selectors';
import { Subscription } from 'rxjs/Subscription';
import { BuildingState } from './interfaces/building-state.interface';
import { BuildingsService } from './services/buildings.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  displayedColumns = ['icon', 'name', 'amount'];
  subscription = new Subscription();
  buildings: Observable<Building & BuildingState[]>;
  dataSource: MatTableDataSource<Partial<Resource[]>>;

  private isPurchaseDisabled = false;

  constructor(
    private readonly store: Store<AppState>,
    private readonly authService: AuthService,
    private readonly buildingsService: BuildingsService,
    private readonly cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.buildings = this.store.select(mergeBuildingsAndAvailability as any);
    this.subscription.add(
      this.store
        .select(selectUserResources)
        .subscribe(
          resources => (this.dataSource = new MatTableDataSource(resources)),
        ),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  getResourceIconPath(name: string): string {
    return `/assets/images/resources/${name.toLowerCase()}.png`;
  }

  handleBuild(buildingId: number) {
    if (this.isPurchaseDisabled) {
      return;
    }
    this.isPurchaseDisabled = true;
    this.buildingsService
      .buildById(buildingId)
      .subscribe(
        () => this.enablePurchase(),
        () => this.enablePurchase(),
      );
  }

  enablePurchase() {
    this.isPurchaseDisabled = false;
    this.cd.markForCheck();
  }
}
