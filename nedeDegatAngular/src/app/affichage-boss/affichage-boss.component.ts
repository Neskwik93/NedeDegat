import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-affichage-boss',
    templateUrl: './affichage-boss.component.html',
    styleUrls: ['./affichage-boss.component.css']
})
export class AffichageBossComponent implements OnInit {
    constructor() { }
    boss: any = {};

    ngOnInit() {
    }

    saveBoss = () => {
        if (this.inputPvBoss.value && this.inputPvBoss.value > 0) {
            if (!this.inputBdBoss.value) this.inputBdBoss.value = 0;
            this.boss = { pv: this.inputPvBoss.value, armor: this.selectBossArmor.value, bd: this.inputBdBoss.value };
            this.inputPvBoss.disabled = true;
            this.inputBdBoss.disabled = true;
            this.selectBossArmor.disabled = true;
            this.alertPv.style.display = 'none';
            this.btnNewBoss.style.display = 'inline-block';
            this.containerinputDegatImmediat.style.display = 'flex';
            this.btnSaveBoss.style.display = 'none';
        } else {
            this.alertPv.style.display = 'block';
        }
        this.checkApplyToBoss();
    }

    newBoss = () => {
        this.nbBoss++;
        this.boss = null;
        this.inputPvBoss.value = null;
        this.inputPvBoss.disabled = false;
        this.inputBdBoss.value = null;
        this.inputBdBoss.disabled = false;
        this.selectBossArmor.disabled = false;
        this.btnNewBoss.style.display = 'none';
        this.btnSaveBoss.style.display = 'inline-block';
        this.checkApplyToBoss();
    }

    applyToBoss = () => {
        let valueUsed = this.inputDe.value;
        let reste = 0, nbRelance = 0;
        valueUsed = valueUsed - this.boss.bd;
        valueUsed = valueUsed < 0 ? 0 : valueUsed;
        if (valueUsed && valueUsed > 150) {
            reste = valueUsed - 150;
            while (reste >= 20) {
                reste -= 20;
                nbRelance++
            }
            valueUsed = 150;
        }
        if (nbRelance > 0) {
            this.displayNbRelance.innerHTML = nbRelance + ' relance(s) possible(s)';
            this.displayNbRelance.style.display = 'block';
        } else {
            this.displayNbRelance.innerHTML = '';
            this.displayNbRelance.style.display = 'none';
        }
        let val = global[this.ttArmeInTable[0]].find(degat => valueUsed >= degat.min && valueUsed <= degat.max);
        let degat = val[this.boss.armor];
        let critique;
        if (typeof degat === 'string') {
            critique = degat[degat.length - 1];
            degat = +degat.slice(0, degat.length - 1);
        }
        this.applyDegat(degat, critique = null);
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
            this.inputPvBoss.value = this.boss.pv;
        } else {
            this.chat.innerHTML += '<strong>Boss ' + this.nbBoss + '</strong> est mort, fais en un nouveau';
        }
        this.chat.innerHTML += '<br>';
        this.chat.scrollTop = this.chat.scrollHeight;
    }

}
