import { Component, ViewChild, OnInit } from '@angular/core';

import { AffichageBossComponent } from './affichage-boss/affichage-boss.component';

import { Boss } from './model/app.model';

import * as global from '../assets/data/global';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild(AffichageBossComponent, { static: false }) affichageBossComponent: AffichageBossComponent;

    valueDe: any;
    mode: any = {
        value: 'c', libelleBtn: 'Mode BOSS'
    };
    tableBody: string;
    tableHead: string;

    switchTranchante: boolean = true;
    switchContondante: boolean = true;
    switch2Mains: boolean = true;
    switchPerfo: boolean = true;
    switchToutArme: boolean = true;

    switchPlates: boolean = true;
    switchCuirasse: boolean = true;
    switchEcailles: boolean = true;
    switchMaille: boolean = true;
    switchCuirRigide: boolean = true;
    switchCuirSouple: boolean = true;
    switchSansArmure: boolean = true;
    switchToutArmor: boolean = true;

    ttValInTable: string[] = [];
    ttArmeInTable: string[] = [];
    boss: Boss = { name: 'boss', armure: 'plate', pv: 0, bd: 0, saved: false };
    ttBoss: Boss[] = [];
    strChat: string = '';
    htmlElementChat: HTMLElement;

    constructor() { }

    ngOnInit() {
        this.lancer();
    }

    ngAfterViewInit() {
        this.initChat();
    }

    lancer() {
        this.ttArmeInTable = [];
        this.generateHeader();
        this.tableBody = '';
        if (this.switchTranchante) {
            this.generateTable(global.ttTranchante, 'Tranchante à une main');
            this.ttArmeInTable.push('ttTranchante');
        }
        if (this.switchContondante) {
            this.generateTable(global.ttTranchante, 'Contondante à un main');
            this.ttArmeInTable.push('ttContondante');
        }
        if (this.switch2Mains) {
            this.generateTable(global.tt2main, 'Arme à 2 mains');
            this.ttArmeInTable.push('tt2main');
        }
        if (this.switchPerfo) {
            this.generateTable(global.ttPerforation, 'Perforations');
            this.ttArmeInTable.push('ttPerforation');
        }
    }

    testEnter(event, type) {
        if (event.key === 'Enter') {
            switch (type) {
                case 'inputDe':
                    this.lancer();
                    break;
            }
        }
    }

    generateHeader() {
        this.ttValInTable = [];
        this.tableHead = '';
        let str = '<tr class="text-center"><th scope="col">Jet</th>';
        if (this.switchPlates) {
            str += '<th scope="col">Plates</th>';
            this.ttValInTable.push('plate');
        }
        if (this.switchCuirasse) {
            str += '<th scope="col">Cuirasse</th>';
            this.ttValInTable.push('cuirrasse');
        }
        if (this.switchEcailles) {
            str += '<th scope="col">Ecailles</th>';
            this.ttValInTable.push('ecaille');
        }
        if (this.switchMaille) {
            str += '<th scope="col">Maille</th>';
            this.ttValInTable.push('maille');
        }
        if (this.switchCuirRigide) {
            str += '<th scope="col">Cuir Rigide</th>';
            this.ttValInTable.push('cuirR');
        }
        if (this.switchCuirSouple) {
            str += '<th scope="col">Cuir Souple</th>';
            this.ttValInTable.push('cuirS');
        }
        if (this.switchSansArmure) {
            str += '<th scope="col">Sans Armure</th>';
            this.ttValInTable.push('sa');
        }
        str += '</tr>';
        this.tableHead = str;
    }

    generateTable(ttValue, titre) {
        let valueUsed;
        if (this.valueDe && this.valueDe > 150) {
            valueUsed = 150;
        } else {
            valueUsed = this.valueDe;
        }
        let str = '';
        this.tableBody += '<tr><td colspan="' + this.ttValInTable.length + 1 + '"><h5 class="text-center">' + titre + '</h5></td></tr>';
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
        this.tableBody += str;
    }

    checkAllWeapon() {
        this.switchTranchante = this.switchToutArme;
        this.switchContondante = this.switchToutArme;
        this.switch2Mains = this.switchToutArme;
        this.switchPerfo = this.switchToutArme;
        this.lancer();
    }

    checkAllArmor() {
        this.switchPlates = this.switchToutArmor;
        this.switchCuirasse = this.switchToutArmor;
        this.switchEcailles = this.switchToutArmor;
        this.switchMaille = this.switchToutArmor;
        this.switchCuirRigide = this.switchToutArmor;
        this.switchCuirSouple = this.switchToutArmor;
        this.switchSansArmure = this.switchToutArmor;
        this.lancer();
    }

    switchBossMod() {
        this.mode = this.mode.value === 'c' ? { value: 'b', libelleBtn: 'Mode classique' } : { value: 'c', libelleBtn: 'Mode BOSS' };
        this.initChat()
    }

    addBoss() {
        this.ttBoss.push({ name: 'oui', pv: 200, bd: 50, armure: 'sa', saved: false })
    }

    initChat() {
        this.htmlElementChat = document.getElementById('chat');
        this.updateChat();
    }

    updateChat(str = '') {
        this.strChat += str;
        this.htmlElementChat.innerHTML = this.strChat;
        this.htmlElementChat.scrollTop = this.htmlElementChat.scrollHeight;
    }
}

