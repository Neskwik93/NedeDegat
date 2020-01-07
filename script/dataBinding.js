const inputElements = document.querySelectorAll('[ngBind]');
const inputBinds = document.querySelectorAll('[ngView]');
let scope = { };
console.log(scope)
function twoWayDataBinding() {
    for (let elem of inputElements) {
        if (elem.type === 'text') {
            let propName = elem.getAttribute('ngBind');
            elem.addEventListener('keyup', e => {
                scope[propName] = elem.value;
            })
            updateDom(propName);
        }
    }
}
function updateDom(propName) {
    if (!scope.hasOwnProperty(propName)) {
        let value;
        Object.defineProperty(scope, propName, {
            set: (newValue) => {
                value = newValue;
                for (let e1 of inputElements) {
                    if (e1.getAttribute('ngBind') === propName) {
                        e1.value = newValue;
                    }
                }
                for (let e2 of inputBinds) {
                    if (e2.getAttribute('ngView') === propName) {
                        if (!e2.type) {
                            e2.innerHTML = newValue;
                        }
                    }
                }
            },
            get() {
                return value;
            }
        })
    }
}
twoWayDataBinding();