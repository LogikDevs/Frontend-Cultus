import { Component } from '@angular/core';
import { GetInterestsService } from 'src/app/services/get-interests.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {
    ShowCreationComponent: number;

    constructor(private interestService: GetInterestsService) { }

    SelectedTypeOfCreate(type: number) {
        if (type != this.ShowCreationComponent) {
            switch (type) {
                case 1:
                    this.ShowCreationComponent = 1;
                    break;
                case 2:
                    this.ShowCreationComponent = 2;
                    break;
                case 3:
                    this.ShowCreationComponent = 3;
            }
            this.interestService.NewUserInterestsArray = [];
        }
    }
    QuitCreation() {
        this.interestService.NewUserInterestsArray = [];
        this.ShowCreationComponent = 0;
    }
}
