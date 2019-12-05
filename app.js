
//BUDGET DATA 

let dataController = (function () {

})();
//UI CONTROLLER

let UIcontroller = (function () {

    let infoData = {
        newBudget: 'Create new budget',
        lodBudget: 'Load budget file',
        saveBudget: 'Save your current work',
        clearData: 'Clear all data',
        showCharts: 'Show charts',
        showHelp: 'Display help page',
        logo: 'About'
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
        }
    }

})();

//APPLICATION CONTROLLER

let appController = (function (ctrData, ctrUI) {
    let menuDom = {
        newBudget: 'new-budget',
        lodBudget: 'load-budget',
        saveBudget: 'save-budget',
        clearData: 'clear-data',
        showCharts: 'show-charts',
        showHelp: 'show-help',
        logo: 'header-menu-logo',
        iconInfo: 'header-icon-info',
        logoInfo: 'header-logo-info'
    }

    var findKey = (object, value) => {
        return Object.keys(object).find(key => object[key] === value ? key : null)
    }

    document.addEventListener('mouseover', (event) => {
        let key = findKey(menuDom, event.target.id);
        if (key) {
            ctrUI.showInfo(key, event.target.id);
        };
    });

    document.addEventListener('mouseout', (event) => {
        let key = findKey(menuDom, event.target.id);
        if (key) {
            ctrUI.hideInfo(key, event.target.id);
        };
    });

})(dataController, UIcontroller);