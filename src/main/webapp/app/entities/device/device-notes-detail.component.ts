import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { DeviceNotes } from './device-notes.model';
import { DeviceNotesService } from './device-notes.service';

@Component({
    selector: 'jhi-device-notes-detail',
    templateUrl: './device-notes-detail.component.html'
})
export class DeviceNotesDetailComponent implements OnInit, OnDestroy {

    device: DeviceNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deviceService: DeviceNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['device', 'deviceType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.deviceService.find(id).subscribe(device => {
            this.device = device;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
