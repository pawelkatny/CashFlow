
//BUDGET DATA 

let dataController = (function () {

    let Income = function (id, desc, value) {
        this.id = id,
            this.desc = desc,
            this.value = value
    };

    let Expense = function (id, desc, value) {
        this.id = id,
            this.desc = desc,
            this.value = value
    };

    let budgetDATA = {
        month: null,
        year: null,
        balance: 0,
        items: {
            inc: [],
            exp: []
        },
        total: {
            inc: 0,
            exp: 0
        }
    };

    let calcTotal = function (type) {
        let total = 0;
        budgetDATA.items[type].forEach((ele) => {
            total += Number(ele.value);
        })

        budgetDATA.total[type] = total;
    }

    return {
        getData: function () {
            return {
                balance: budgetDATA.balance,
                inc: budgetDATA.total['inc'],
                exp: budgetDATA.total['exp']
            };
        },

        addItem: function (type, object) {
            let ID, newItem, budget;
            budget = budgetDATA.items[type];

            if (budget.length == -1) {
                ID = 0;
            } else {
                ID = budget.length;
            }

            if (type === 'inc') {
                newItem = new Income(ID, object.desc, object.value);
            } else if (type === 'exp') {
                newItem = new Expense(ID, object.desc, object.value);
            }

            budget.push(newItem);

            return newItem;

        },

        calcBudget: function () {
            calcTotal('inc');
            calcTotal('exp');
            budgetDATA.balance = budgetDATA.total['inc'] - budgetDATA.total['exp']
        },

        clearBudget: function () {
            budgetDATA.balance = 0;
            budgetDATA.items = {
                inc: [],
                exp: []
            };
            budgetDATA.total = {
                inc: 0,
                exp: 0
            };
        },

        test: function () {
            console.log(budgetDATA);
        }
    }

})();
//UI CONTROLLER

let UIcontroller = (function () {

    let infoData = {
        newBudget: 'Create new budget',
        loadBudget: 'Load budget file',
        saveBudget: 'Save your current work',
        clearData: 'Clear all data',
        showCharts: 'Show charts',
        showHelp: 'Display help page',
        logo: 'About'
    };

    let stringsDOM = {
        newBudget: 'new-budget',
        loadBudget: 'load-budget',
        saveBudget: 'save-budget',
        clearData: 'clear-data',
        showCharts: 'show-charts',
        showHelp: 'show-help',
        logo: 'header-menu-logo',
        iconInfo: 'header-icon-info',
        logoInfo: 'header-logo-info',
        inputType: '.input-type',
        inputDesc: '.add-desc',
        inputValue: '.add-value',
        inputBtn: '.input-btn',
        incList: '.inc-list',
        expList: '.exp-list',
        balance: '.balance-total',
        incTotal: '.income-total',
        expTotal: '.expenses-total'
    };


    let fadeIn = function (target, text) {
        target.classList.add('fadeOut');
        setTimeout(() => {
            target.textContent = text;
        }, 300);

        setTimeout(() => {
            target.classList.remove('fadeOut');
        }, 300);
    };

    let fadeOut = function (target) {
        target.classList.add('fadeOut');
        setTimeout(() => {
            target.textContent = '';
        }, 300)
    };

    let clearList = function (type) {
        let string = '.' + type + '-list';
        let parent = document.querySelector(string);
        let children = parent.children;

        var arrayHTML = Array.from(children);

        arrayHTML.forEach((ele) => {
            parent.removeChild(ele);
        })
    };

    return {
        showInfo: function (key, ID) { //function to show what specific menu icon does on mouseover 
            let iconInfo = document.getElementById('header-icon-info');
            let logoInfo = document.getElementById('header-logo-info');

            if (ID === 'header-menu-logo') {
                fadeIn(logoInfo, infoData[key]);
            } else {
                fadeIn(iconInfo, infoData[key]);
            }
        },

        hideInfo: function (key, ID) {
            let iconInfo = document.getElementById('header-icon-info');
            let logoInfo = document.getElementById('header-logo-info');

            if (ID === 'header-menu-logo') {
                fadeOut(logoInfo, infoData[key]);
            } else {
                fadeOut(iconInfo, infoData[key]);
            }
        },

        getInput: function () {
            return {
                type: document.querySelector(stringsDOM.inputType).value,
                desc: document.querySelector(stringsDOM.inputDesc).value,
                value: document.querySelector(stringsDOM.inputValue).value
            }
        },

        addItemUI: function (type, object) {
            let html, newHtml, selector;

            html = '<div class="list-border" id="' + type + '-%id"><div class="item-desc">%desc</div><div class="item-val">%val</div><div class="item-del"><img class="icon-del" src="images/icons/delete.png"></div></div>';

            if (type === 'inc') {
                selector = document.querySelector(stringsDOM.incList);
            } else if (type === 'exp') {
                selector = document.querySelector(stringsDOM.expList);
            }

            newHtml = html.replace('%id', object.id);
            newHtml = newHtml.replace('%desc', object.desc);
            if (type === 'inc') {
                newHtml = newHtml.replace('%val', "+ " + object.value);
            } else if (type === 'exp') {
                newHtml = newHtml.replace('%val', "- " + object.value);
            };

            selector.insertAdjacentHTML('beforeend', newHtml);

        },

        clearInput: function () {
            let input, inputArray;

            input = document.querySelectorAll(stringsDOM.inputDesc + ', ' + stringsDOM.inputValue);

            inputArray = Array.prototype.slice.call(input);

            inputArray.forEach((current) => {
                current.value = "";
            });
        },

        updateUI: function (objData) {
            document.querySelector(stringsDOM.balance).textContent = objData.balance < 0 ? objData.balance : (objData.balance == 0 ?
                objData.balance : '+' + objData.balance);
            document.querySelector(stringsDOM.incTotal).textContent = objData.inc == 0 ? '- - -' : '+' + objData.inc;
            document.querySelector(stringsDOM.expTotal).textContent = objData.exp == 0 ? '- - -' : '-' + objData.exp;
        },

        clearUI: function () {
            clearList('inc');
            clearList('exp');
        },

        stringsDOM: function () {
            return stringsDOM;
        }
    }

})();

//APPLICATION CONTROLLER

let appController = (function (ctrData, ctrUI) {

    let addItem = function () {

        //get input
        let input = ctrUI.getInput();

        if (input.desc !== '' && !isNaN(input.value) && input.value > 0) {
            //add item to data structure
            let newItem = ctrData.addItem(input.type, input);
            //add item to ui
            ctrUI.addItemUI(input.type, newItem);
            //update budget
            updateBudget();
            //clear fields
            ctrUI.clearInput();
        }
    }

    let updateBudget = function () {
        ctrData.calcBudget();
        let budgetInfo = ctrData.getData();
        ctrUI.updateUI(budgetInfo);
    }

    let findKey = (object, value) => Object.keys(object).find(key => object[key] === value ? key : null);

    // Functions - navigation bar
    let startMenu = function (key) {
        menuFunctions[key]();
    }



    let menuFunctions = {
        newBudget: function () {
            console.log('New budget!');
        },

        clearData: function () {
            ctrData.clearBudget();
            ctrUI.clearUI()
            updateBudget();
        }
    }
    // Event listeners initialization
    let setupEvents = function () {


        let DOM = ctrUI.stringsDOM();

        let navBar = document.querySelector('.header-menu-container');

        let addBtn = document.querySelector(DOM.inputBtn);



        navBar.addEventListener('mouseover', (event) => {
            let key = findKey(DOM, event.target.id);
            if (key) {
                ctrUI.showInfo(key, event.target.id);
            };
        });

        navBar.addEventListener('mouseout', (event) => {
            let key = findKey(DOM, event.target.id);
            if (key) {
                ctrUI.hideInfo(key, event.target.id);
            };
        });

        navBar.addEventListener('click', (event) => {
            let key = findKey(DOM, event.target.id);
            if (key) {
                startMenu(key);
            };
        })
        addBtn.addEventListener('click', addItem);
    }

    return {
        start: function () {
            setupEvents();
            menuFunctions.clearData();
            console.log('Application started.')
        },

        test: function () {
            ctrUI.clearUI();
        }
    }


})(dataController, UIcontroller);

appController.start();