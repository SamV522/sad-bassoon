
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from './shared/ui';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Alloy } from './models/alloy';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, PRIME_NG_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'sad-bassoon';
    alloyOptions: Alloy[] = [];
    selectedAlloy?: Alloy;
    sliderValue = 0; // 0 = min, 1 = max
    metalKeys: string[] = [];
    numIngots=1;

    constructor(private http: HttpClient) {
        this.loadAlloys();
    }

    loadAlloys() {
        this.http.get<Alloy[]>('assets/ingots.json').subscribe((data) => {
            this.alloyOptions = data;
        });

    }

    onAlloyChange() {
        this.metalKeys = Object.keys(this.selectedAlloy!.metals);
        this.sliderValue = 0; // reset slider when alloy changes
    }

    lerp(min: number, max: number, t: number): number {
        return min + (max - min) * t;
    }

    ceil(value: number): number {
        return Math.ceil(value);
    }
}
