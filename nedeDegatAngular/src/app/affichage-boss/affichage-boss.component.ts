import { Component, OnInit, Input } from '@angular/core';

import * as global from '../../assets/data/global';

@Component({
    selector: 'app-affichage-boss',
    templateUrl: './affichage-boss.component.html',
    styleUrls: ['./affichage-boss.component.css']
})
export class AffichageBossComponent implements OnInit {
    @Input() ttArmeInTable;

    boss: any = { pv: null, bd: null, armure: 'plate' };
    bossExist: boolean = false;
    alertPv: boolean = false;
    chat: HTMLElement;
    nbBoss: number = 1;
    nbRelance: number = 0;
    degatToApply: number;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.chat = document.getElementById('chat')
    }

    testEnter = (event, type) => {
        if (event.key === 'Enter') {
            switch (type) {
                case 'degatImmediat':
                    this.applyDegat(this.degatToApply);
                    break;
                case 'saveBoss':
                    this.saveBoss();
                    break;
            }
        }
    }

    saveBoss = () => {
        if (this.boss.pv && this.boss.pv > 0) {
            console.log('"oui')
            this.alertPv = false;
            this.bossExist = true;
            if (!this.boss.bd) this.boss.bd = 0;
        } else {
            this.alertPv = true;
        }
    }

    newBoss = () => {
        this.nbBoss++;
        this.boss = null;
        this.bossExist = false;
        this.boss = { pv: 0, bd: 0, armure: 'plate' };
    }

    applyToBoss = (deValue) => {
        this.nbRelance = 0;
        let valueUsed = deValue;
        let reste = 0;
        valueUsed = valueUsed - this.boss.bd;
        valueUsed = valueUsed < 0 ? 0 : valueUsed;
        if (valueUsed && valueUsed > 150) {
            reste = valueUsed - 150;
            while (reste >= 20) {
                reste -= 20;
                this.nbRelance++
            }
            valueUsed = 150;
        }
        let val = global[this.ttArmeInTable[0]].find(degat => valueUsed >= degat.min && valueUsed <= degat.max);
        let degat = val[this.boss.armure];
        console.log(degat)
        let critique;
        if (typeof degat === 'string') {
            critique = degat[degat.length - 1];
            degat = +degat.slice(0, degat.length - 1);
        }
        this.applyDegat(degat, critique);
    }

    applyDegat = (degat, critique = null) => {
        if (this.boss.pv > 0) {
            this.boss.pv -= degat;
            if (this.boss.pv <= 0) {
                this.boss.pv = 0;
                this.chat.innerHTML += '<strong>Boss ' + this.nbBoss + '</strong> a prit <span style="color: red">-' + degat + ' PV</span> dans la tronche ';
                this.chat.innerHTML += '<strong><span style="color: red">IL EST MORT SA RACE !</span></strong>';
            } else {
                this.chat.innerHTML += '<strong>Boss ' + this.nbBoss + '</strong> a prit <span style="color: red">-' + degat + ' PV</span> dans la tronche' + (critique ? ' et un <strong>critique ' + critique + '</strong> ' : ' ');
                this.chat.innerHTML += 'il lui reste <span style="color: red">' + this.boss.pv + ' PV.</span>';
            }
        } else {
            this.chat.innerHTML += '<strong>Boss ' + this.nbBoss + '</strong> est mort, fais en un nouveau';
        }
        this.chat.innerHTML += '<br>';
        this.chat.scrollTop = this.chat.scrollHeight;
    }

}
