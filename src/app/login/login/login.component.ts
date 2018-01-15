import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { rootRoutes } from '../../routes';
import { AuthService } from '../../core/auth/auth.service';
import { LoggerService } from '../../core/logger/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isSubmitDisabled = false;
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
  ) {
    this.createLoginForm();
  }

  async handleSubmit() {
    const { valid } = this.loginForm;
    if (!valid) {
      return;
    }
    this.isSubmitDisabled = true;
    try {
      const login$ = this.authService.login(this.loginForm.value);
      await login$.toPromise();

      this.router.navigate([rootRoutes.MAIN]);
    } catch (e) {
      this.logger.error(e);
    }
    this.enableSubmit();
  }

  private enableSubmit() {
    this.isSubmitDisabled = false;
    this.cd.markForCheck();
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
