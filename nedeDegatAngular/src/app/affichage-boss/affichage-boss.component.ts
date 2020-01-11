import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Boss } from '../model/app.model';

import * as global from '../../assets/data/global';

@Component({
    selector: 'app-affichage-boss',
    templateUrl: './affichage-boss.component.html',
    styleUrls: ['./affichage-boss.component.css']
})
export class AffichageBossComponent implements OnInit {
    @Input() ttArmeInTable;
    @Input() boss: Boss;
    @Input() modeBoss: boolean;
    @Output() addInChat = new EventEmitter<string>();

    ttArmure = global.ttArmure;
    alertPv: boolean = false;
    nbBoss: number = 1;
    nbRelance: number = 0;
    degatToApply: number;

    constructor() { }

    ngOnInit() {
    }

    testEnter(event, type) {
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

    saveBoss() {
        if (this.boss.pv && this.boss.pv > 0) {
            if(!this.boss.name) {
                this.boss.name = 'Boss';
            }
            this.alertPv = false;
            this.boss.saved = true;
            if (!this.boss.bd) this.boss.bd = 0;
            this.addInChat.emit('<strong>' + this.boss.name + '</strong> débarque sur le champ de bataille !');
        } else {
            this.alertPv = true;
        }
    }

    newBoss() {
        this.nbBoss++;
        this.boss.saved = false;
    }

    applyToBoss(deValue) {
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
        let critique;
        if (typeof degat === 'string') {
            critique = degat[degat.length - 1];
            degat = +degat.slice(0, degat.length - 1);
        }
        this.applyDegat(degat, critique);
    }

    applyDegat(degat, critique = null) {
        let strToReturn = '';
        if (this.boss.pv > 0) {
            this.boss.pv -= degat;
            if (this.boss.pv <= 0) {
                this.boss.pv = 0;
                strToReturn += '<strong>' + this.boss.name + '</strong> a prit <span style="color: red">-' + degat + ' PV</span> dans la tronche ';
                strToReturn += '<strong><span style="color: red">IL EST MORT SA RACE !</span></strong>';
            } else {
                strToReturn += '<strong>' + this.boss.name + '</strong> a prit <span style="color: red">-' + degat + ' PV</span> dans la tronche' + (critique ? ' et un <strong>critique ' + critique + '</strong> ' : ' ');
                strToReturn += 'il lui reste <span style="color: red">' + this.boss.pv + ' PV.</span>';
            }
        } else {
            strToReturn += '<strong>' + this.boss.name + '</strong> est mort, fais en un nouveau';
        }
        strToReturn += '<br>';
        this.addInChat.emit(strToReturn);
    }
}
