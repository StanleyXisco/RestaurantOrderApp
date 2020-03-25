import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeadComponent {
    constructor(private dataStorage: DataStorageService) {}

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
  
}