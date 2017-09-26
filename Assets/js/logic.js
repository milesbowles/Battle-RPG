// JavaScript function that wraps everything
$(document).ready(function() {

    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "Assets/captainplanet24.mp3");

    var gameViewWidth = $('#gameView').width();
    var coins = 0;
    var level = 1;


    var player = {
        power: 30,
        hitPoints: 100,
        speed: 20,
        weapon: 'none',
        location: document.querySelector('#player'),
        state: {
            forward: 'Assets/media/player/cannon/cannon-forward.gif',
            back: 'Assets/media/player/cannon/cannon-back.gif',
            stationary: 'Assets/media/player/cannon/cannon-stationary.gif',
            attack: 'Assets/media/player/cannon/cannon-attack.gif'
        },
        moveForward: function () {
            var move_forward = '+=' + (gameViewWidth / this.speed) + 'px';
            $('#player-img').attr('src', player.state.forward);
            $('#player').animate({ left: move_forward }, 1800);
            this.stop();
        },
        moveBackward: function () {
            var move_back = '-=' + (gameViewWidth / this.speed) + 'px';
            $('#player-img').attr('src', player.state.back);
            $('#player').animate({ left: move_back }, 1800);
            this.stop();
        },
        stop: function () {
            setTimeout(function() {
                $('#player-img').attr('src', player.state.stationary);
            }, 1800);
            this.endTurn();

        },
        attack: function () {
            $('#player-img').attr('src', this.state.attack);
            if (distanceBetweenElements(enemy.location,player.location) < 800){
                console.log('distance func works!');
                enemy.hitPoints = enemy.hitPoints - roll(player.power);
                console.log(enemy.hitPoints);
                enemy.updateHitPoints();
            }
            player.stop();
        },
        updateHitPoints: function () {
            var percentage = this.hitPoints.toString() + '%';
            $('#player-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
            gameover();
        },
        endTurn: function () {
            $('#controlView').fadeTo('slow', 0.3);
            $('#header-label').fadeTo('slow', 0.0);
            enemy.turn();
        }
    };

    var enemy = {
        power: 20,
        hitPoints: 100,
        speed: 10,
        range: 800,
        location: document.querySelector('#enemy'),
        state: {
            forward: 'Assets/media/enemy/enemy-ufo-forward.gif',
            back: 'Assets/media/enemy/enemy-ufo-back.gif',
            stationary: 'Assets/media/enemy/enemy-ufo-stationary.gif',
            attack: 'Assets/media/enemy/enemy-ufo-lazer-attack.gif'
        },
        moveForward: function () {
            var move_forward = '-=' + (gameViewWidth / this.speed) + 'px';
            $('#enemy-img').attr('src', this.state.forward).css({
                'margin-top' : '35%',
                'height' : '190%',
                'width' : '190%'
            });
            $('#enemy').animate({ left: move_forward }, 1800);
            this.stop();
        },
        moveBackward: function () {
            var move_back = '+=' + (gameViewWidth / this.speed) + 'px';
            $('#enemy-img').attr('src', this.state.back);
            $('#enemy').animate({ left: move_back }, 1800);
            this.stop();
        },
        stop: function () {
            setTimeout(function() {
                $('#enemy-img').attr('src', enemy.state.stationary).css({
                    'margin-top' : '40%',
                    'height' : '170%',
                    'width' : '170%'
                });
                $('#controlView').fadeTo('slow', 1);
                $('#header-label').fadeTo('slow', 1);
                // this.endTurn();
            }, 1800);


        },
        attack: function () {
            $('#enemy-img').attr('src', this.state.attack);
            player.hitPoints = player.hitPoints - roll(enemy.power);
            player.updateHitPoints();
            enemy.stop();
        },
        updateHitPoints: function () {
            var percentage = this.hitPoints.toString() + '%';
            $('#enemy-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
            gameover();
        },
        turn: function () {
            setTimeout(function() {
                if (distanceBetweenElements(enemy.location,player.location) < enemy.range){
                        enemy.attack();
                } else {
                    enemy.moveForward();
                }
            }, 1800);
        },
        endTurn: function () {
            $('#controlView').fadeTo('slow', 1);
            $('#header-label').fadeTo('slow', 1);
        }
    };

    function gameover() {
        if (player.hitPoints <= 0) {
            console.log("you lose")
            roll(100)
        } else if (enemy.hitPoints <= 0) {
            console.log("you win!")
        }
    }

    function roll(max) {
        return Math.floor(Math.random() * max) + 1
    }

    function distanceBetweenElements(element1, element2) {
        var e1Rect = element1.getBoundingClientRect();
        var e2Rect = element2.getBoundingClientRect();
        var dx = (e1Rect.left+(e1Rect.right-e1Rect.left)/2) - (e2Rect.left+(e2Rect.right-e2Rect.left)/2);
        var dy = (e1Rect.top+(e1Rect.bottom-e1Rect.top)/2) - (e2Rect.top+(e2Rect.bottom-e2Rect.top)/2);
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }

    // Move Buttons
    $("#attack-btn").on("click", function() {
        player.attack();
    });

    $(".down-button").on("click", function() {
        $(".captain-planet").animate({ top: "+=200px" }, "normal");
    });

    $(".left-button").on("click", function() {
        player.moveBackward()
    });

    $(".right-button").on("click", function() {
        player.moveForward()
    });

    $(".back-button").on("click", function() {
        $(".captain-planet").animate({ top: "50px", left: "80px" }, "fast");
    });

});