import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeadComponent {
    constructor(private dataStorage: DataStorageService, private authservice: AuthService) {}

    onSaveData() {
      this.dataStorage.storeRecipe()
        .subscribe(
          (response: Response) => {
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
  
}