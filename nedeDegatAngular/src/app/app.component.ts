import { Component, ViewChildren, OnInit, OnDestroy, QueryList, ChangeDetectorRef } from '@angular/core';

import { AffichageBossComponent } from './affichage-boss/affichage-boss.component';

import { Boss } from './model/app.model';

import * as global from '../assets/data/global';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChildren(AffichageBossComponent) affichageBossComponent: QueryList<AffichageBossComponent>;

    corps: any;
    valueDe: any;
    mode: any = {
        value: 'c'
    };
    tableBody: string;
    tableHead: string;

    switchTranchante: boolean = true;
    switchContondante: boolean = true;
    switch2Mains: boolean = true;
    switchPerfo: boolean = true;
    switchEclair: boolean = true;
    switchBoule: boolean = true;
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
    nbRound: number = 1;
    nbRelance: number = 0;

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.lancer();
    }

    ngAfterViewInit() {
        this.initChat();
        this.corps = document.getElementsByClassName('corps')[0];
        this.onResize()
    }

    ngOnDestroy() {
        this._changeDetectorRef.detach()
    }

    onResize() {
        document.getElementById('globalContent').style.height = window.innerHeight.toString() + 'px';
        this.corps.style.height = (window.innerHeight * 0.8) + 'px';
    }

    lancer(event = null) {
        this.ttArmeInTable = [];
        this.generateHeader();
        this.tableBody = '';
        if (this.switchTranchante) {
            this.generateTable(global.ttTranchante, 'Tranchante à une main');
            this.ttArmeInTable.push('ttTranchante');
            this.uncheckedSwitch(event, 'switchTranchante')
        }
        if (this.switchContondante) {
            this.generateTable(global.ttTranchante, 'Contondante à un main');
            this.ttArmeInTable.push('ttContondante');
            this.uncheckedSwitch(event, 'switchContondante')
        }
        if (this.switch2Mains) {
            this.generateTable(global.tt2main, 'Arme à 2 mains');
            this.ttArmeInTable.push('tt2main');
            this.uncheckedSwitch(event, 'switch2Mains')
        }
        if (this.switchPerfo) {
            this.generateTable(global.ttPerforation, 'Perforations');
            this.ttArmeInTable.push('ttPerforation');
            this.uncheckedSwitch(event, 'switchPerfo')
        }
        if (this.switchEclair) {
            this.generateTable(global.ttSortEclair, 'Sort eclair');
            this.ttArmeInTable.push('ttSortEclair');
            this.uncheckedSwitch(event, 'switchEclair')
        }
        if (this.switchBoule) {
            this.generateTable(global.ttSortBoule, 'Sort boule');
            this.ttArmeInTable.push('ttSortBoule');
            this.uncheckedSwitch(event, 'switchBoule')
        }
    }

    checkFirstComponent() {
        this._changeDetectorRef.markForCheck();
        return this.affichageBossComponent && this.affichageBossComponent.first
    }

    uncheckedSwitch(event, actual: string) {
        if (event && this.mode.value === 'b' && event.target.id !== actual) {
            this[actual] = false;
            this.lancer();
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

    updateNbRelance(nbRelance) {
        this.nbRelance = nbRelance;
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
        if (this.valueDe && this.valueDe > ttValue[ttValue.length - 1].max) {
            valueUsed = ttValue[ttValue.length - 1].max;
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
        this.switchEclair = this.switchToutArme;
        this.switchBoule = this.switchToutArme;
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
        this.mode.value = this.mode.value === 'c' ? 'b' : 'c';
        this.initSwitchs();
        this.initChat()
    }

    initSwitchs() {
        this.ttArmeInTable = [];
        this.ttArmeInTable.push('ttTranchante');
        this.switchTranchante = true;
        this.switchContondante = false;
        this.switch2Mains = false;
        this.switchPerfo = false;
        this.switchEclair = false;
        this.switchBoule = false;
    }

    addBoss() {
        this.ttBoss.push({ name: '', pv: 0, bd: 0, armure: 'sa', saved: false });
    }

    applyToBoss(boss: Boss) {
        if (this.valueDe) {
            let bossComponent = this.affichageBossComponent.find(bc => bc.boss === boss);
            bossComponent.applyToBoss(this.valueDe);
        }
    }

    nextRound() {
        this.nbRound++;
        this.updateChat('<span style="color: red;">On passe au Round <strong>'+ this.nbRound +'</strong> !</span><hr>');
        if (this.affichageBossComponent)
            this.affichageBossComponent.forEach(bc => {
                if (bc.degatParTour > 0 && bc.boss.saved) {
                    bc.applyDegat(bc.degatParTour);
                }
            });
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

    deleteBoss(boss: Boss) {
        let id = this.ttBoss.indexOf(boss);
        this.ttBoss.splice(id, 1);
    }
}

