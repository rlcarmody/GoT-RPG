$(document).ready(function () {

    const player = {
        attackMultiplier: 0,
        healthstatus: function () {
            if(this.currentHP/this.baseHP > .6) {
                return 'green';
            }
            else if (this.currentHP/this.baseHP >.2) {
                return 'yellow';
            }
            return 'red';
        }
    };
    const opponent = {
        healthstatus: function () {
            if(this.currentHP/this.baseHP > .6) {
                return 'green';
            }
            else if (this.currentHP/this.baseHP >.2) {
                return 'yellow';
            }
            return 'red';
        }
    };
    var gameStart = false;

    const fighters = {
        fighter1: {
            name: 'Daenarys',
            defeated: false,
            baseHP: 100,
            currentHP: 100,
            attackPower: function () {
                return (10 - (this.baseHP - 100) / 10);
            },
            counterAttackPower: 25,
        },
        fighter2: {
            name: 'The Mountain',
            defeated: false,
            baseHP: 120,
            currentHP: 120,
            attackPower: function () {
                return 10 - (this.baseHP - 100) / 10;
            },
            counterAttackPower: 10
        },
        fighter3: {
            name: 'Jon Snow',
            defeated: false,
            baseHP: 140,
            currentHP: 140,
            attackPower: function () {
                return 10 - (this.baseHP - 100) / 10;
            },
            counterAttackPower: 5
        },
        fighter4: {
            name: 'Khal Drogo',
            defeated: false,
            baseHP: 170,
            currentHP: 170,
            attackPower: function () {
                return 10 - (this.baseHP - 100) / 10;
            },
            counterAttackPower: 20
        }
    }
    const loadFighters = (jObj) => {
        let htmlString = '';
        let keys = Object.keys(fighters);
        for (let prop of keys) {
            htmlString += `<div class="card fighter" value="${prop}"><h2>${fighters[prop].name}</h2><img src="./assets/images/${fighters[prop].name}.gif" alt="${fighters[prop].name}"/><div class="healthbar">${fighters[prop].currentHP}</div></div>`
        }
        $(jObj).html(htmlString);
    }

    loadFighters('.allfighters');

    $('body').on('click', '.fighter', function () {
        let val = $(this).attr('value');
        if (!gameStart) {
            startGame(val);
            return;
        }
        if ($('.opponent').html() !== '') {
            return;
        }
        Object.assign(opponent, fighters[val]);
        delete fighters[val];
        $('.opponent').html(`<h2>${opponent.name}</h2><img src="./assets/images/${opponent.name}.gif" alt="${opponent.name}"/><div class="healthbar">${opponent.currentHP}</div>`);
        $(`.fighter[value="${val}"]`).remove();
        $('button').removeAttr('disabled');
    })

    const startGame = (val) => {
        gameStart = true;
        $('.allfighters').empty();
        $('.player').html(`<h2>${fighters[val].name}</h2><img src="./assets/images/${fighters[val].name}.gif" alt="${fighters[val].name}"/><div class="healthbar">${fighters[val].currentHP}</div>`);
        Object.assign(player, fighters[val]);
        delete fighters[val];
        loadFighters('.enemies');
    }

    $('.attack').on('click', function () {
        $('#attack').trigger('play');
        player.attackMultiplier++;
        let damage = player.attackPower() * player.attackMultiplier;
        opponent.currentHP -= damage;
        $('.opponent div').text(opponent.currentHP).attr('hp',opponent.healthstatus());;
        $('.opponent div').animate({width: ((opponent.currentHP/opponent.baseHP)*100).toString() + '%'})
        //todo check if opponent still has hp
        if (opponent.currentHP <= 0) {
            alert (opponent.name + 'has been defeated');
            $('.opponent').empty();
            $('.attack').attr('disabled',true)
        }
        else {player.currentHP -= opponent.counterAttackPower;
        $('.player div').text(player.currentHP).attr('hp',player.healthstatus());
        $('.player div').animate({width: ((player.currentHP/player.baseHP)*100).toString() + '%'})

        }
         if (player.currentHP <= 0) {
            $('.attack').attr('disabled',true);
            return alert('You lose');
        }
    })



})
