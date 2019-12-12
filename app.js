
//BUDGET DATA 

let dataController = (function () {

    let Income = function (id, desc, value) {
        this.id = id,
        this.desc = desc,
        this.value = value
    }

    let Expense = function (id, desc, value) {
        this.id = id,
        this.desc = desc,
        this.value = value
    }

    let budgetDATA = {
        month: null,
        year: null,
        budget: 0,
        items: {
            inc: [],
            exp: []
        },
        total: {
            inc: 0,
            exp: 0
        }
    }

    return {
        getData: function() {
            return budgetDATA;
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
        inputBtn: '.input-btn'
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

    return {
        showInfo: function (key, ID) { //function to show what specific menu icon does on mouseover 
            let iconInfo = document.getElementById('header-icon-info');
            let logoInfo = document.getElementById('header-logo-info');

            if (ID === 'header-menu-logo') {
                fadeIn(logoInfo, infoData[key]);
                console.log('true')
            } else {
                fadeIn(iconInfo, infoData[key]);
            }
        },

        hideInfo: function (key, ID) {
            let iconInfo = document.getElementById('header-icon-info');
            let logoInfo = document.getElementById('header-logo-info');

            if (ID === 'header-menu-logo') {
                fadeOut(logoInfo, infoData[key]);
                console.log('false')
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

        stringsDOM: function () {
            return stringsDOM;
        }
    }

})();

//APPLICATION CONTROLLER

let appController = (function (ctrData, ctrUI) {

    let DOM = ctrUI.stringsDOM();

    let navBar = document.querySelector('.header-menu-container');

    let addBtn = document.querySelector(DOM.inputBtn);

    let findKey = (object, value) => Object.keys(object).find(key => object[key] === value ? key : null)

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

    addBtn.addEventListener('click', () => {
        console.log(ctrUI.getInput());
    })
    


})(dataController, UIcontroller);