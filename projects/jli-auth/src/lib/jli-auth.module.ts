import { NgModule } from '@angular/core';
import { JliCallbackComponent } from './components/jli-callback/jli-callback.component';
import { JliLogoutComponent } from './components/jli-logout/jli-logout.component';

@NgModule({
  declarations: [JliCallbackComponent, JliLogoutComponent],
  imports: [
  ],
  exports: [JliCallbackComponent, JliLogoutComponent]
})
export class JliAuthModule { }
