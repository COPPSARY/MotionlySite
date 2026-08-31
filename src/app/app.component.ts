import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly auth = inject(AuthService);

  constructor() {
    afterNextRender(() => {
      void this.auth.currentUser().then((user) => {
        if (!user) return;
        const returnUrl = this.auth.consumePendingReturnUrl();
        if (!returnUrl || !returnUrl.startsWith('/editor')) return;
        window.location.href = `https://app.motionly.site/${returnUrl.split('?')[1] ? `?${returnUrl.split('?')[1]}` : ''}`;
      });
    });
  }
}
