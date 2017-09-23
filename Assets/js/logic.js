// JavaScript function that wraps everything
$(document).ready(function() {

    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "Assets/captainplanet24.mp3");

    var gameViewWidth = $('#gameView').width();
    var move_back = '-=' + (gameViewWidth / 20) + 'px';
    var move_forward = '+=' + (gameViewWidth / 20) + 'px';


    var player = {
        power: 30,
        defence: 100,
        hitPoints: 100,
        speed: 10,
        weapon: 'none',
        moveForward: function () {
            $('#player-img').attr('src', 'Assets/media/basic-tank/move-forward.gif');
            $('#player').animate({ left: move_forward }, 1800);
            this.stop();
        },
        moveBackward: function () {
            $('#player-img').attr('src', 'Assets/media/basic-tank/move-backward.gif');
            $('#player').animate({ left: move_back }, 1800);
            this.stop();
        },
        stop: function () {
            setTimeout(function() {
                $('#player-img').attr('src', 'Assets/media/basic-tank/stationary.gif');
            }, 1800)
        },
        attack: function () {
            
        }
    };

    var enemy = {
        power: 30,
        defence: 100,
        hitPoints: 100,
        speed: 10,
        weapon: 'none',
        moveForward: function () {
            $('#player-img').attr('src', 'Assets/media/basic-tank/move-forward.gif');
            $('#player').animate({ left: move_forward }, 1800);
            this.stop();
        },
        moveBackward: function () {
            $('#player-img').attr('src', 'Assets/media/basic-tank/move-backward.gif');
            $('#player').animate({ left: move_back }, 1800);
            this.stop();
        },
        stop: function () {
            setTimeout(function() {
                $('#player-img').attr('src', 'Assets/media/basic-tank/stationary.gif');
            }, 1800)
        },
        attack: function () {

        }
    };


// .delay(1800).attr('src', 'Assets/media/basic-tank/stationary.gif')


    // Move Buttons
    $(".up-button").on("click", function() {
        $(".captain-planet").animate({ top: "-=200px" }, "normal");
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

    // Move Buttons (Keyboard Down)
    $(document).keyup(function(e) {
        switch (e.which) {
            case 40:
                $(".captain-planet").animate({ top: "+=200px" }, "normal");
        }
    });

    // Move Buttons (Keyboard Right)
    $(document).keyup(function(e) {
        switch (e.which) {
            case 39:
                $(".captain-planet").animate({ left: "+=200px" }, "normal");
        }
    });

    // Move Buttons (Keyboard Up)
    $(document).keyup(function(e) {
        switch (e.which) {
            case 38:
                $(".captain-planet").animate({ top: "-=200px" }, "normal");
        }
    });

    // Move Buttons (Keyboard Left)
    $(document).keyup(function(e) {
        switch (e.which) {
            case 37:
                $(".captain-planet").animate({ left: "-=200px" }, "normal");
        }
    });
});