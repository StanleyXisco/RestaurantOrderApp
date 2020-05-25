import { Component, OnInit } from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeadComponent implements OnInit {
  authState: Observable<fromAuth.State>;
   
    constructor(private dataStorage: DataStorageService, 
                private authservice: AuthService,
                private store: Store<fromApp.AppState>) {}

    ngOnInit() {
      this.authState = this.store.select('auth');
    }

    onSaveData() {
      this.dataStorage.storeRecipe()
        .subscribe(
          (response) => {
            console.log(response);
          }
        );
    }

    onFetchData() {
      this.dataStorage.getRecipe();
    }

    onLogout() {
      this.authservice.logOut();
    }

    // isAuthenticated () {
    //   return this.authservice.isAuthenticated();
    // }
  
}