// JavaScript function that wraps everything
$(document).ready(function() {

    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "Assets/captainplanet24.mp3");

    var gameViewWidth = $('#gameView').width();


    var player = {
        turn: true,
        power: 30,
        defence: 100,
        hitPoints: 100,
        speed: 20,
        weapon: 'none',
        location: document.querySelector('#player'),
        moveForward: function () {
            var move_forward = '+=' + (gameViewWidth / this.speed) + 'px';
            $('#player-img').attr('src', 'Assets/media/basic-tank/move-forward.gif');
            $('#player').animate({ left: move_forward }, 1800);
            this.stop();
        },
        moveBackward: function () {
            var move_back = '-=' + (gameViewWidth / this.speed) + 'px';
            $('#player-img').attr('src', 'Assets/media/basic-tank/move-backward.gif');
            $('#player').animate({ left: move_back }, 1800);
            this.stop();
        },
        stop: function () {
            setTimeout(function() {
                $('#player-img').attr('src', 'Assets/media/basic-tank/stationary.gif');
            }, 1800);
            this.endTurn();
        },
        attack: function () {
            if (distanceBetweenElements(enemy.location,player.location) < 500){
                console.log('distance func works!');
                enemy.hitPoints = enemy.hitPoints - roll(player.power);
                console.log(enemy.hitPoints);
                enemy.updateHitPoints();
            }
            player.endTurn();
        },
        updateHitPoints: function () {
            var percentage = this.hitPoints.toString() + '%';
            $('#player-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
        },
        endTurn: function () {
            $('#controlView').hide();
            enemy.turn();
        }
    };

    var enemy = {
        power: 30,
        defence: 100,
        hitPoints: 100,
        speed: 10,
        weapon: 'none',
        location: document.querySelector('#enemy'),
        moveForward: function () {
            var move_forward = '-=' + (gameViewWidth / this.speed) + 'px';
            $('#enemy-img').attr('src', 'Assets/media/basic-tank/move-forward.gif');
            $('#enemy').animate({ left: move_forward }, 1800);
            this.stop();
        },
        moveBackward: function () {
            var move_back = '+=' + (gameViewWidth / this.speed) + 'px';
            $('#player-img').attr('src', 'Assets/media/basic-tank/move-backward.gif');
            $('#player').animate({ left: move_back }, 1800);
            this.stop();
        },
        stop: function () {
            setTimeout(function() {
                $('#player-img').attr('src', 'Assets/media/basic-tank/stationary.gif');
            }, 1800);
            this.endTurn();
        },
        attack: function () {
            player.hitPoints = player.hitPoints - roll(enemy.power);
            player.updateHitPoints();
            this.endTurn();
        },
        block: function () {
            this.endTurn();
        },
        updateHitPoints: function () {
            var percentage = this.hitPoints.toString() + '%';
            $('#enemy-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
        },
        turn: function () {
            var randomNumber = Math.random();
            setTimeout(function() {
                if (distanceBetweenElements(enemy.location,player.location) < 500){
                    if (randomNumber >= 0.3) {
                        enemy.attack();
                    } else {
                        enemy.block();
                    }

                } else {
                    enemy.moveForward();
                }
            }, 1800);
        },
        endTurn: function () {
            $('#controlView').show()
        }
    };

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