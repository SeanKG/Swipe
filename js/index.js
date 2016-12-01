"use strict";
(function () {

    var swipeEl = document.querySelector('.swipe-items'),
        ct = document.querySelector('.container'), 
        mouseDown = false, 
        state = {
            slideNum: 0,
            marginLeft: 0,
            startPos: 0,
            currentPos: 0,
            velocity: 0
        },
        lastMove = {
            time: 0,
            pos: 0
        };

    console.log(swipeEl);

    function updateEl() {
        swipeEl.style.marginLeft = `${state.marginLeft}px`;
    }

    function velocity(last, now) {
        var timeDiff = now.time - last.time,
            posDiff = now.pos - last.pos;

            return posDiff / timeDiff;
    }

    function change(dir) {
        state.slideNum += dir;
        state.slideNum < 0 ? 0 : state.slideNum;
        state.slideNum > 2 ? 2 : state.slideNum;

        state.marginLeft = state.slideNum * ct.offsetWidth;
        swipeEl.classList.add('is-transitioning');
        swipeEl.style.marginLeft = `${state.marginLeft}px`;

        window.setTimeout(() => {
            swipeEl.classList.remove('is-transitioning');
        }, 500);

        console.log(state);
        state.velocity = 0;


    }

    ct.addEventListener('touchstart', function (event) {
        mouseDown = true;
        state.startPos = event.changedTouches[0].pageX;
        state.currentPos = event.changedTouches[0].pageX;

        updateEl();
    });

    document.addEventListener('touchend', function (event) {
        mouseDown = false;
        let {velocity} = state;
        console.log(velocity);

        if(velocity > 0.2){
            change(1);
        } else if (velocity < -0.2){
            change(-1);
        } else {
            change(0);
        }

        
    });

    document.addEventListener('touchmove', function (event) {
        if (mouseDown) {
            //console.log(event);
            state.currentPos = event.changedTouches[0].pageX;
            var thisMove = {
                time: Date.now().toString(),
                pos: state.currentPos
            }
            var v = velocity(lastMove, thisMove);
            //console.log(v);
            lastMove = thisMove;
            state.velocity = v;
            state.marginLeft = (state.currentPos - state.startPos) + (state.slideNum * ct.offsetWidth);
            updateEl();
        }
    });

})();