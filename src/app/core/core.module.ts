import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HomeComponent } from "./home/home.component";
import { HeadComponent } from "./header/header.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { AuthInterceptor } from "../shared/auth.interceptor";

@NgModule({
  declarations: [HomeComponent, HeadComponent],
  imports: [SharedModule, AppRoutingModule],
  exports: [AppRoutingModule, HeadComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
