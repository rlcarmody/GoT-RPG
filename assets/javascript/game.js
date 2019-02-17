$(document).ready(function () {
    const theme = new Audio('./assets/sounds/theme.mp3');
    const attackSound = new Audio('./assets/sounds/attack.wav')
    const player = {
        attackMultiplier: 0,
        healthstatus: function () {
            if (this.currentHP / this.baseHP > .6) {
                return 'green';
            }
            else if (this.currentHP / this.baseHP > .2) {
                return 'yellow';
            }
            return 'red';
        }
    };
    const opponent = {
        healthstatus: function () {
            if (this.currentHP / this.baseHP > .6) {
                return 'green';
            }
            else if (this.currentHP / this.baseHP > .2) {
                return 'yellow';
            }
            return 'red';
        }
    };
    var gameStart = false;

    const fighters = {
        fighter1: {
            name: 'Daenerys',
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
    const loadFighters = (cls) => {
        let htmlString = '';
        let keys = Object.keys(fighters);
        for (let prop of keys) {
            htmlString += `<div class="card fighter" value="${prop}">
                                <h2>${fighters[prop].name}</h2>
                                <img src="./assets/images/${fighters[prop].name}.gif" alt="${fighters[prop].name}"/>
                                <div class="healthbar">${fighters[prop].currentHP}</div>
                            </div>`
        }
        $(cls).html(htmlString);
    }

    loadFighters('.allfighters');

    $('body').on('click', '.fighter', function () {
        let val = $(this).attr('value');
        if (!gameStart) {
            startGame($(this));
            return;
        }
        if (opponent.defeated === false) {
            return;
        }
        Object.assign(opponent, fighters[val]);
        delete fighters[val];
        $('.opponent').html($(this).html());
        $(`.fighter[value="${val}"]`).remove();
        $('button').removeAttr('disabled');
        $('.instructions').text('Fight to the death')
    })

    const startGame = (obj) => {
        $('#theme').trigger('play');
        let val = obj.attr('value');
        gameStart = true;
        $('.allfighters').empty();
        $('.player').html(obj.html());
        theme.play();
        Object.assign(player, fighters[val]);
        delete fighters[val];
        loadFighters('.enemies');
        $('.instructions').text('Choose your opponent')
    }

    $('.attack').on('click', function () {
        attackSound.play();
        player.attackMultiplier++;
        let damage = player.attackPower() * player.attackMultiplier;
        opponent.currentHP -= damage;
        $('.opponent div').text(opponent.currentHP).attr('hp', opponent.healthstatus());
        $('.opponent div').animate({ width: ((opponent.currentHP / opponent.baseHP) * 100).toString() + '%' });
        if (opponent.currentHP <= 0) {
            $('.opponent').text(opponent.name + ' is defeated!');
            opponent.defeated = true;
            $('.attack').attr('disabled', true)
            if ($('.enemies').html() === '') {
                $('.instructions').html('<p>All enemies are defeated.</p><p> Take your seat on the Iron Throne</p>')
            } else { $('.instructions').text('Choose your next opponent') }
        }
        else {
            player.currentHP -= opponent.counterAttackPower;
            $('.player .healthbar').text(player.currentHP).attr('hp', player.healthstatus());
            $('.player .healthbar').animate({ width: ((player.currentHP / player.baseHP) * 100).toString() + '%' });
        }
        if (player.currentHP <= 0) {
            $('.attack').attr('disabled', true);
            $('.player').text('You are defeated');
            $('.instructions').text('Game Over')
        }
    })

})
