let tableBody = document.getElementById('tableBody');
let tableHead = document.getElementById('tableHead');
let inputDe = document.getElementById('inputDe');
let displayNbRelance = document.getElementById('displayNbRelance');
let btnSwitchMod = document.getElementById('btnSwitchMod');

let btnSaveBoss = document.getElementById('btnSaveBoss');
let btnNewBoss = document.getElementById('btnNewBoss');
let btnApplyToBoss = document.getElementById('btnApplyToBoss');
let inputPvBoss = document.getElementById('inputPvBoss');
let inputBdBoss = document.getElementById('inputBdBoss');
let containerinputDegatImmediat = document.getElementById('containerinputDegatImmediat');
let inputDegatImmediat = document.getElementById('inputDegatImmediat');
let selectBossArmor = document.getElementById('selectBossArmor');
let alertPv = document.getElementById('alertPv');
let modeBoss = false;
let boss, nbBoss = 1;

let switchTranchante = document.getElementById('switchTranchante');
let switchContondante = document.getElementById('switchContondante');
let switch2Mains = document.getElementById('switch2Mains');
let switchPerfo = document.getElementById('switchPerfo');
let switchToutArme = document.getElementById('switchToutArme');

let switchPlates = document.getElementById('switchPlates');
let switchCuirasse = document.getElementById('switchCuirasse');
let switchEcailles = document.getElementById('switchEcailles');
let switchMaille = document.getElementById('switchMaille');
let switchCuirRigide = document.getElementById('switchCuirRigide');
let switchCuirSouple = document.getElementById('switchCuirSouple');
let switchSansArmure = document.getElementById('switchSansArmure');
let switchToutArmor = document.getElementById('switchToutArmor');

let zoneClassique = document.getElementById('zoneClassique');
let zoneBoss = document.getElementById('zoneBoss');

let chat = document.getElementById('chat');

let ttValInTable = [];
let ttArmeInTable = [];

lancer = () => {
    ttArmeInTable = [];
    generateHeader();
    tableBody.innerHTML = '';
    if (switchTranchante.checked) {
        generateTable(global.ttTranchante, 'Tranchante à une main');
        ttArmeInTable.push('ttTranchante');
    }
    if (switchContondante.checked) {
        generateTable(global.ttContondante, 'Contondante à un main');
        ttArmeInTable.push('ttContondante');
    }
    if (switch2Mains.checked) {
        generateTable(global.tt2main, 'Arme à 2 mains');
        ttArmeInTable.push('tt2main');
    }
    if (switchPerfo.checked) {
        generateTable(global.ttPerforation, 'Perforations');
        ttArmeInTable.push('ttPerforation');
    }
    checkApplyToBoss();
}

checkApplyToBoss = () => {
    if (ttArmeInTable.length === 1 && boss && inputDe.value) {
        btnApplyToBoss.style.display = 'inline-block';
    } else {
        btnApplyToBoss.style.display = 'none';
    }
}

testEnter = (event, type) => {
    if (event.key === 'Enter') {
        switch (type) {
            case 'inputDe':
                lancer();
                break;
            case 'degatImmediat':
                if (inputDegatImmediat.value && inputDegatImmediat.value > 0) {
                    applyDegat(inputDegatImmediat.value);
                }
                break;
            case 'saveBoss':
                saveBoss();
                break;
        }
    }
}

generateHeader = () => {
    ttValInTable = [];
    tableHead.innerHTML = '';
    let str = '<tr class="text-center"><th scope="col">Jet</th>';
    if (switchPlates.checked) {
        str += '<th scope="col">Plates</th>';
        ttValInTable.push('plate');
    }
    if (switchCuirasse.checked) {
        str += '<th scope="col">Cuirasse</th>';
        ttValInTable.push('cuirrasse');
    }
    if (switchEcailles.checked) {
        str += '<th scope="col">Ecailles</th>';
        ttValInTable.push('ecaille');
    }
    if (switchMaille.checked) {
        str += '<th scope="col">Maille</th>';
        ttValInTable.push('maille');
    }
    if (switchCuirRigide.checked) {
        str += '<th scope="col">Cuir Rigide</th>';
        ttValInTable.push('cuirR');
    }
    if (switchCuirSouple.checked) {
        str += '<th scope="col">Cuir Souple</th>';
        ttValInTable.push('cuirS');
    }
    if (switchSansArmure.checked) {
        str += '<th scope="col">Sans Armure</th>';
        ttValInTable.push('sa');
    }
    str += '</tr>';
    tableHead.innerHTML = str;
}

generateTable = (ttValue, titre) => {
    let valueUsed;
    if (inputDe.value && inputDe.value > 150) {
        valueUsed = 150;
    } else {
        valueUsed = inputDe.value;
    }
    let str = '';
    tableBody.innerHTML += '<tr><td colspan="' + ttValInTable.length + 1 + '"><h5 class="text-center">' + titre + '</h5></td></tr>';
    if (valueUsed && valueUsed <= 35) {
        str += '<tr><td colspan="' + ttValInTable.length + 1 + '"><h6 class="text-center alert alert-danger">Possible maladresse</h6></td></tr>';
    }
    ttValue.forEach(val => {
        if (!valueUsed || (valueUsed >= val.min && valueUsed <= val.max)) {
            str += '<tr class="text-center">';
            for (let k in val) {
                if (k === 'min') {
                    str += '<td>' + val[k] + ' à ' + val.max + '</td>';
                }
                if (ttValInTable.find(val => val === k)) {
                    if (k !== 'min' && k !== 'max') {
                        str += '<td>' + val[k] + '</td>';
                    }
                }
            }
            str += '</tr>';
        }
    });
    tableBody.innerHTML += str;
}

checkAllWeapon = () => {
    switchTranchante.checked = switchToutArme.checked;
    switchContondante.checked = switchToutArme.checked;
    switch2Mains.checked = switchToutArme.checked;
    switchPerfo.checked = switchToutArme.checked;
    lancer();
}

checkAllArmor = () => {
    switchPlates.checked = switchToutArmor.checked;
    switchCuirasse.checked = switchToutArmor.checked;
    switchEcailles.checked = switchToutArmor.checked;
    switchMaille.checked = switchToutArmor.checked;
    switchCuirRigide.checked = switchToutArmor.checked;
    switchCuirSouple.checked = switchToutArmor.checked;
    switchSansArmure.checked = switchToutArmor.checked;
    lancer();
}

switchBossMod = () => {
    modeBoss = !modeBoss;
    zoneBoss.style.display = modeBoss ? 'block' : 'none';
    zoneClassique.style.display = modeBoss ? 'none' : 'block';
    btnSwitchMod.innerHTML = modeBoss ? 'Mode classique' : 'Mode BOSS';
    checkApplyToBoss();
}

saveBoss = () => {
    if (inputPvBoss.value && inputPvBoss.value > 0) {
        if (!inputBdBoss.value) inputBdBoss.value = 0;
        boss = { pv: inputPvBoss.value, armor: selectBossArmor.value, bd: inputBdBoss.value };
        inputPvBoss.disabled = true;
        inputBdBoss.disabled = true;
        selectBossArmor.disabled = true;
        alertPv.style.display = 'none';
        btnNewBoss.style.display = 'inline-block';
        containerinputDegatImmediat.style.display = 'flex';
        btnSaveBoss.style.display = 'none';
    } else {
        alertPv.style.display = 'block';
    }
    checkApplyToBoss();
}

newBoss = () => {
    nbBoss++;
    boss = null;
    inputPvBoss.value = null;
    inputPvBoss.disabled = false;
    inputBdBoss.value = null;
    inputBdBoss.disabled = false;
    selectBossArmor.disabled = false;
    btnNewBoss.style.display = 'none';
    btnSaveBoss.style.display = 'inline-block';
    checkApplyToBoss();
}

applyToBoss = () => {
    let valueUsed = inputDe.value;
    let reste = 0, nbRelance = 0;
    valueUsed = valueUsed - boss.bd;
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
        displayNbRelance.innerHTML = nbRelance + ' relance(s) possible(s)';
        displayNbRelance.style.display = 'block';
    } else {
        displayNbRelance.innerHTML = '';
        displayNbRelance.style.display = 'none';
    }
    let val = global[ttArmeInTable[0]].find(degat => valueUsed >= degat.min && valueUsed <= degat.max);
    let degat = val[boss.armor];
    let critique;
    if (typeof degat === 'string') {
        critique = degat[degat.length - 1];
        degat = +degat.slice(0, degat.length - 1);
    }
    applyDegat(degat, critique = null);
}

applyDegat = (degat, critique) => {
    if (boss.pv > 0) {
        boss.pv -= degat;
        if (boss.pv <= 0) {
            boss.pv = 0;
            chat.innerHTML += '<strong>Boss ' + nbBoss + '</strong> a prit <span style="color: red">-' + degat + ' PV</span> dans la tronche ';
            chat.innerHTML += '<strong><span style="color: red">IL EST MORT SA RACE !</span></strong>';
        } else {
            chat.innerHTML += '<strong>Boss ' + nbBoss + '</strong> a prit <span style="color: red">-' + degat + ' PV</span> dans la tronche' + (critique ? ' et un <strong>critique ' + critique + '</strong> ' : ' ');
            chat.innerHTML += 'il lui reste <span style="color: red">' + boss.pv + ' PV.</span>';
        }
        inputPvBoss.value = boss.pv;
    } else {
        chat.innerHTML += '<strong>Boss ' + nbBoss + '</strong> est mort, fais en un nouveau';
    }
    chat.innerHTML += '<br>';
    chat.scrollTop = chat.scrollHeight;
}

init = () => {
    lancer();
}

init();