$(document).ready(function () {
    let puzzleElements = $('#start').children('.puzzle-element');
    puzzleElements.sort(function () {
        return 0.5 - Math.random()
    });
    puzzleElements.appendTo($('#start'));

    let stopSec = 0;
    let sec = 0;
    $('.start-btn').on('click', function () {
        $('.puzzle-box').sortable({
            connectWith: '#start, #end',
        })

        let interval = setInterval(function () {
            if (stopSec <= 0) {
                sec = 59;
                stopSec++;
            }
            if (sec == 0) clearInterval(interval);
            let zeroSec = sec;
            if (sec < 10) zeroSec = '0' + sec;
            document.querySelector('.timer').innerHTML = `00:${zeroSec}`;
            document.querySelector('.check-text').innerHTML = `You still have time, you sure? 00:${zeroSec}`;
            document.querySelector('.start-btn').disabled = true;
            $('.start-btn').addClass('active');
            $('.check-btn').removeClass('active');
            sec--;

            if (stopSec == 1 && sec == 0) {
                $('.hidden-box').css({
                    backgroundColor: 'rgba(0, 0, 0, 0.498)',
                    zIndex: '1'
                })
                $('.lose-alert').removeClass('displ-none');
            }

            $('.close-btn').on('click', function () {
                $('.lose-alert').addClass('displ-none');
                document.location.reload();
                $('.hidden-box').css({
                    backgroundColor: 'white',
                    zIndex: '-1'
                })
            })

            $('.check-btn').on('click', function () {
                $('.check-alert').removeClass('displ-none');
                $('.hidden-box').css({
                    backgroundColor: 'rgba(0, 0, 0, 0.498)',
                    zIndex: '1'
                })

                $('.check-close-btn').on('click', function () {
                    $('.check-alert').addClass('displ-none');
                    $('.hidden-box').css({
                        backgroundColor: 'white',
                        zIndex: '-1'
                    })
                })

                let images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
                let check = true;

                $('.check-alert-btn').on('click', function () {
                    let puzzleElements = $('.puzzle-element');
                    for (let i = 0; i < puzzleElements.length; i++) {
                        if ($(puzzleElements[i]).text() != images[i]) {
                            check = false;
                            break;
                        }
                    }
                    if (check) {
                        $('.win-alert').removeClass('displ-none');
                        $('.check-alert').addClass('displ-none');
                        $('.close-win-btn').on('click', function () {
                            document.location.reload();
                        })
                    }
                    else {
                        console.log('Lose');
                        $('.lose-alert').removeClass('displ-none');
                        $('.check-alert').addClass('displ-none');
                        $('.close-btn').on('click', function () {
                            document.location.reload();
                        })
                    }
                    check = true;
                });
            })

            $('.close-win-btn').on('click', function () {
                $('.win-alert').addClass('displ-none');
            })

        }, 1000);
    })
    $('.new-game-btn').on('click', function () {
        document.location.reload();
    })
})