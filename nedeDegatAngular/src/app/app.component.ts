import { Component } from '@angular/core';
import * as global from '../assets/data/global';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'nedeDegatAngular';

    tableBody: any;
    tableHead: any;
    inputDe: any;
    displayNbRelance: any;
    btnSwitchMod: any;

    btnSaveBoss: any;
    btnNewBoss: any;
    btnApplyToBoss: any;
    inputPvBoss: any;
    inputBdBoss: any;
    containerinputDegatImmediat: any;
    inputDegatImmediat: any;
    selectBossArmor: any;
    alertPv: any
    modeBoss: any;
    boss: any;
    nbBoss: any = 1;

    switchTranchante: any;
    switchContondante: any;
    switch2Mains: any;
    switchPerfo: any;
    switchToutArme: any;

    switchPlates: any;
    switchCuirasse: any;
    switchEcailles: any;
    switchMaille: any;
    switchCuirRigide: any;
    switchCuirSouple: any;
    switchSansArmure: any;
    switchToutArmor: any;

    zoneClassique: any;
    zoneBoss: any;

    chat: any;

    ttValInTable: any[] = [];
    ttArmeInTable: any[] = [];

    ngAfterViewInit() {
        this.tableBody = document.getElementById('tableBody');
        this.tableHead = document.getElementById('tableHead');
        this.inputDe = document.getElementById('inputDe');
        this.displayNbRelance = document.getElementById('displayNbRelance');
        this.btnSwitchMod = document.getElementById('btnSwitchMod');
        this.btnSaveBoss = document.getElementById('btnSaveBoss');
        this.btnNewBoss = document.getElementById('btnNewBoss');
        this.btnApplyToBoss = document.getElementById('btnApplyToBoss');
        this.inputPvBoss = document.getElementById('inputPvBoss');
        this.inputBdBoss = document.getElementById('inputBdBoss');
        this.containerinputDegatImmediat = document.getElementById('containerinputDegatImmediat');
        this.inputDegatImmediat = document.getElementById('inputDegatImmediat');
        this.selectBossArmor = document.getElementById('selectBossArmor');
        this.alertPv = document.getElementById('alertPv');
        this.switchTranchante = document.getElementById('switchTranchante');
        this.switchContondante = document.getElementById('switchContondante');
        this.switch2Mains = document.getElementById('switch2Mains');
        this.switchPerfo = document.getElementById('switchPerfo');
        this.switchToutArme = document.getElementById('switchToutArme');
        this.switchPlates = document.getElementById('switchPlates');
        this.switchCuirasse = document.getElementById('switchCuirasse');
        this.switchEcailles = document.getElementById('switchEcailles');
        this.switchMaille = document.getElementById('switchMaille');
        this.switchCuirRigide = document.getElementById('switchCuirRigide');
        this.switchCuirSouple = document.getElementById('switchCuirSouple');
        this.switchSansArmure = document.getElementById('switchSansArmure');
        this.switchToutArmor = document.getElementById('switchToutArmor');
        this.zoneClassique = document.getElementById('zoneClassique');
        this.zoneBoss = document.getElementById('zoneBoss');
        this.chat = document.getElementById('chat');
        this.lancer();
    }

    lancer() {
        this.ttArmeInTable = [];
        this.generateHeader();
        this.tableBody.innerHTML = '';
        if (this.switchTranchante.checked) {
            this.generateTable(global.ttTranchante, 'Tranchante à une main');
            this.ttArmeInTable.push('ttTranchante');
        }
        if (this.switchContondante.checked) {
            this.generateTable(global.ttTranchante, 'Contondante à un main');
            this.ttArmeInTable.push('ttContondante');
        }
        if (this.switch2Mains.checked) {
            this.generateTable(global.tt2main, 'Arme à 2 mains');
            this.ttArmeInTable.push('tt2main');
        }
        if (this.switchPerfo.checked) {
            this.generateTable(global.ttPerforation, 'Perforations');
            this.ttArmeInTable.push('ttPerforation');
        }
        this.checkApplyToBoss();
    }

    checkApplyToBoss = () => {
        if (this.ttArmeInTable.length === 1 && this.boss && this.inputDe.value) {
            this.btnApplyToBoss.style.display = 'inline-block';
        } else {
            this.btnApplyToBoss.style.display = 'none';
        }
    }

    testEnter = (event, type) => {
        if (event.key === 'Enter') {
            switch (type) {
                case 'inputDe':
                    this.lancer();
                    break;
                case 'degatImmediat':
                    if (this.inputDegatImmediat.value && this.inputDegatImmediat.value > 0) {
                        this.applyDegat(this.inputDegatImmediat.value);
                    }
                    break;
                case 'saveBoss':
                    this.saveBoss();
                    break;
            }
        }
    }

    generateHeader = () => {
        this.ttValInTable = [];
        this.tableHead.innerHTML = '';
        let str = '<tr class="text-center"><th scope="col">Jet</th>';
        if (this.switchPlates.checked) {
            str += '<th scope="col">Plates</th>';
            this.ttValInTable.push('plate');
        }
        if (this.switchCuirasse.checked) {
            str += '<th scope="col">Cuirasse</th>';
            this.ttValInTable.push('cuirrasse');
        }
        if (this.switchEcailles.checked) {
            str += '<th scope="col">Ecailles</th>';
            this.ttValInTable.push('ecaille');
        }
        if (this.switchMaille.checked) {
            str += '<th scope="col">Maille</th>';
            this.ttValInTable.push('maille');
        }
        if (this.switchCuirRigide.checked) {
            str += '<th scope="col">Cuir Rigide</th>';
            this.ttValInTable.push('cuirR');
        }
        if (this.switchCuirSouple.checked) {
            str += '<th scope="col">Cuir Souple</th>';
            this.ttValInTable.push('cuirS');
        }
        if (this.switchSansArmure.checked) {
            str += '<th scope="col">Sans Armure</th>';
            this.ttValInTable.push('sa');
        }
        str += '</tr>';
        this.tableHead.innerHTML = str;
    }

    generateTable = (ttValue, titre) => {
        let valueUsed;
        if (this.inputDe.value && this.inputDe.value > 150) {
            valueUsed = 150;
        } else {
            valueUsed = this.inputDe.value;
        }
        let str = '';
        this.tableBody.innerHTML += '<tr><td colspan="' + this.ttValInTable.length + 1 + '"><h5 class="text-center">' + titre + '</h5></td></tr>';
        if (valueUsed && valueUsed <= 35) {
            str += '<tr><td colspan="' + this.ttValInTable.length + 1 + '"><h6 class="text-center alert alert-danger">Possible maladresse</h6></td></tr>';
        }
        ttValue.forEach(val => {
            if (!valueUsed || (valueUsed >= val.min && valueUsed <= val.max)) {
                str += '<tr class="text-center">';
                for (let k in val) {
                    if (k === 'min') {
                        str += '<td>' + val[k] + ' à ' + val.max + '</td>';
                    }
                    if (this.ttValInTable.find(val => val === k)) {
                        if (k !== 'min' && k !== 'max') {
                            str += '<td>' + val[k] + '</td>';
                        }
                    }
                }
                str += '</tr>';
            }
        });
        this.tableBody.innerHTML += str;
    }

    checkAllWeapon = () => {
        this.switchTranchante.checked = this.switchToutArme.checked;
        this.switchContondante.checked = this.switchToutArme.checked;
        this.switch2Mains.checked = this.switchToutArme.checked;
        this.switchPerfo.checked = this.switchToutArme.checked;
        this.lancer();
    }

    checkAllArmor = () => {
        this.switchPlates.checked = this.switchToutArmor.checked;
        this.switchCuirasse.checked = this.switchToutArmor.checked;
        this.switchEcailles.checked = this.switchToutArmor.checked;
        this.switchMaille.checked = this.switchToutArmor.checked;
        this.switchCuirRigide.checked = this.switchToutArmor.checked;
        this.switchCuirSouple.checked = this.switchToutArmor.checked;
        this.switchSansArmure.checked = this.switchToutArmor.checked;
        this.lancer();
    }

    switchBossMod = () => {
        this.modeBoss = !this.modeBoss;
        this.zoneBoss.style.display = this.modeBoss ? 'block' : 'none';
        this.zoneClassique.style.display = this.modeBoss ? 'none' : 'block';
        this.btnSwitchMod.innerHTML = this.modeBoss ? 'Mode classique' : 'Mode BOSS';
        this.checkApplyToBoss();
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

