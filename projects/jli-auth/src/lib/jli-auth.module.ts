import { NgModule } from '@angular/core';
import { CallbackComponent } from './components/callback/callback.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [CallbackComponent, LogoutComponent],
  imports: [
  ],
  exports: [CallbackComponent]
})
export class JliAuthModule { }
