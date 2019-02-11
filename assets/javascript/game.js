$(document).ready(function () {

    const player = {
        remainingOpponents: 0,
        attackMultiplier: 0
    };
    const opponent = {};
    var gameStart = false;

    const fighters = {
        fighter1: {
            name: 'fighter1',
            defeated: false,
            baseHP: 100,
            currentHP: 100,
            attackPower: function () {
                return (10 - (this.baseHP - 100) / 10);
            },
            counterAttackPower: function () {
                return this.attackPower() * 2;
            },
        },
        fighter2: {
            name: 'fighter2',
            defeated: false,
            baseHP: 110,
            currentHP: 110,
            attackPower: function () {
                return 10 - (this.baseHP - 100) / 10;
            },
            counterAttackPower: function () {
                return this.attackPower() * 2;
            },
        },
        fighter3: {
            name: 'fighter3',
            defeated: false,
            baseHP: 140,
            currentHP: 140,
            attackPower: function () {
                return 10 - (this.baseHP - 100) / 10;
            },
            counterAttackPower: function () {
                return this.attackPower() * 2;
            },
        },
        fighter4: {
            name: 'fighter4',
            defeated: false,
            baseHP: 170,
            currentHP: 170,
            attackPower: function () {
                return 10 - (this.baseHP - 100) / 10;
            },
            counterAttackPower: function () {
                return this.attackPower() * 2;
            },
        }
    }
    //console.log(Object.keys(fighters).length)

    const loadFighters = () => {
        let htmlString = '';
        for (let prop in fighters) {
            htmlString += `<img src="./assets/images/${fighters[prop].name}.png" alt="${fighters[prop].name}" class="fighter" value="${fighters[prop].name}"/><div class="healthbar">${fighters[prop].currentHP}</div>`
        }
        $('.allfighters').html(htmlString);
    }

    loadFighters();

    $('body').on('click', '.fighter', function () {
        let val = $(this).attr('value');
        if (!gameStart) {
            startGame(val);
            return;
        }
        if ($('.opponent').html() !== ''){
            return;
        }
        Object.assign(opponent,fighters[val]);
        delete fighters[val];
        $('.opponent').html(`<img src="./assets/images/${val}.png" alt="${val}"/><div class="healthbar">${opponent.currentHP}</div>`);
        $(`.fighter[value="${val}"]+div`).remove();
        $(`.fighter[value="${val}"]`).remove();
        $('button').removeAttr('disabled');
    })

    const startGame = (val) => {
        gameStart = true;
        $('.allfighters').empty();
        $('.player').html(`<img src="./assets/images/${val}.png" alt="${val}"/><div class="healthbar">${fighters[val].currentHP}</div>`);
        Object.assign(player, fighters[val]);
        delete fighters[val];
        let htmlString = '';
        for (let prop in fighters) {
            htmlString += `<img src="./assets/images/${fighters[prop].name}.png" alt="${fighters[prop].name}" class="fighter" value="${fighters[prop].name}"/><div class="healthbar">${fighters[prop].currentHP}</div>`
        }
        $('.enemies').html(htmlString);
    }

    $('.attack').on('click', function () {
        player.attackMultiplier++;
        opponent.currentHP -= player.attackPower() * player.attackMultiplier;
        $('.opponent div').text(opponent.currentHP);
        //todo check if opponent still has hp
        player.currentHP -= opponent.counterAttackPower();
        $('.player div').text(player.currentHP);
    })

    

})
// listener for class of all fighters
// if the game is not started, start the game and the selected character becomes the player
//if the game is started and there is no current enemy, the selected character becomes the current enemy