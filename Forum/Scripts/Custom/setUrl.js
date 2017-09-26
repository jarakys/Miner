$(function () {
    $('.jijga').click(function () {
        history.pushState('', '', '/Game/Miner/' + this.id);
    });
});