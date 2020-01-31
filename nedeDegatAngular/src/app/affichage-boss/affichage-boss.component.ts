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
    @Output() setNbRelance = new EventEmitter<number>();

    ttArmure = global.ttArmure;
    alertPv: boolean = false;
    nbRelance: number = 0;
    degatParTour: number;
    degatToApply: number;

    constructor() { }

    ngOnInit() {
        console.log(this.modeBoss)
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
            if (!this.boss.name) {
                this.boss.name = 'Boss';
            }
            this.alertPv = false;
            this.boss.saved = true;
            if (!this.boss.bd) this.boss.bd = 0;
            this.addInChat.emit('<strong>' + this.boss.name + '</strong> débarque sur le champ de bataille !<br>');
        } else {
            this.alertPv = true;
        }
    }

    newBoss() {
        this.boss.saved = false;
    }

    applyToBoss(deValue) {
        this.nbRelance = 0;
        let valueUsed = deValue;
        let reste = 0;
        let ttArmeUtilise = global[this.ttArmeInTable[0]]
        let maxValOnArmeTable = ttArmeUtilise[ttArmeUtilise.length - 1].max;
        valueUsed = valueUsed - this.boss.bd;
        valueUsed = valueUsed < 0 ? 0 : valueUsed;
        if (valueUsed && valueUsed > maxValOnArmeTable) {
            reste = valueUsed - maxValOnArmeTable;
            while (reste >= 20) {
                reste -= 20;
                this.nbRelance++
            }
            valueUsed = maxValOnArmeTable;
        }
        this.setNbRelance.emit(this.nbRelance);
        let val = global[this.ttArmeInTable[0]].find(degat => valueUsed >= degat.min && valueUsed <= degat.max);
        let degat = val[this.boss.armure];
        let critique;
        if (typeof degat === 'string') {
            if (degat.length > 1) { //si non ça veut dire que c'est juste E qui veut dire echec
                critique = degat[degat.length - 1];
                degat = +degat.slice(0, degat.length - 1);
                this.applyDegat(degat, critique);
            } else {
                this.applyDegat(null, null, true);
            }
        } else {
            this.applyDegat(degat);
        }
    }

    applyDegat(degat = 0, critique = null, echec = false) {
        let strToReturn = '';
        if (echec) {
            strToReturn += 'Possible maladresse <strong>(t\'es pas très fort)</strong>';
        } else {
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
        }
        strToReturn += '<br><hr>';
        this.addInChat.emit(strToReturn);
    }
}
