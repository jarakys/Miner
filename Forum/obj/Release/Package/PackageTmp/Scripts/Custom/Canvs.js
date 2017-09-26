
    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext('2d');
    div = document.getElementById('FLAG');
    divCount = document.getElementById('countCell');
    var timeElem = document.getElementById('time');
    var start = new Date(0000, 0, 0, 0, 0, 0, 000);
    var game;
    fillText = function (text, x, y) {
        ctx.fillText(text, x, y);
    };
    var drawImage = function (img, x, y, w, h) {
        ctx.drawImage(img, x, y, w, w);
    };
    var Rect = function (x, y, w, h, i, j, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.i = i;
        this.j = j;
        this.text;
        this.img = img;
        this.selected = false;
    };

    Rect.prototype = {
        //  draw: function () {
        //      fillRect(this.x, this.y, this.w, this.h)
        //  },
        drawText: function () {
            fillText(this.text, this.x + 5, this.y + 18);
        },
        //  stroke: function () {
        //      strokeRect(this.x, this.y, this.w, this.h)
        //  },
        //  select: function () {
        //     this.selected = !this.selected;
        //  },
        drawImg: function () {
            drawImage(this.img, this.x, this.y, (this.w), (this.h));
        }
    };
    var isCursorInRect = function (x, y, rect) {
        //alert(x + "    " + y);
        return x > rect.x + 0.5 && x < rect.x + 0.5 + rect.w + 0.5 &&
            y > rect.y + 0.5 && y < rect.y + 0.5 + rect.h + 0.5;
    }



    var rect = [];

    function create () {
        var width = SizeX * 23, height = SizeY * 23;
        cnv.width = width;
        cnv.height = height;
        for (var i = 0; i < SizeX; i++) {
            var img = new Image();
            img.src = '/Content/Image/close.jpg';
            rect[i] = [];
            for (var j = 0; j < SizeY; j++) {
                rect[i][j] = new Rect((i * 23), (j * 23), 23, 23, i, j, img);

            }
        }
        img.onload = function () {

            reDraw(rect);
        };
    };
    var reDraw = function (rect, imgs) {
        if (arguments.length == 2) {
            for (var i = 0; i < SizeX; i++) {
                for (var j = 0; j < SizeY; j++) {
                    rect[i][j].img = imgs;
                    rect[i][j].drawImg();
                }
            }
            divCount.innerHTML = SizeX * SizeY;
            game = new Games(SizeX, SizeY, bomb, rect);
        }
        else {
            for (var i = 0; i < SizeX; i++) {
                for (var j = 0; j < SizeY; j++) {
                    rect[i][j].drawImg();
                }
            }
            divCount.innerHTML = SizeX * SizeY;
            game = new Games(SizeX, SizeY, bomb, rect);
        }
    };
    $('canvas').bind('contextmenu', function (e) {
        var offset = $(this).offset();
        var x = (e.pageX - offset.left);
        var y = (e.pageY - offset.top);
        for (var i in rect) {
            {
                for (var j in rect[i]) {
                    if (isCursorInRect(x, y, rect[i][j])) {
                        if (!game.isWin() && !game.isLose()) {
                            game.setFlag(i, j, rect[i][j]);
                        }
                    }
                }
            }
        }
        return false;
    });
    $("#canvas").click(function (e) {
        var offset = $(this).offset();
        var x = (e.pageX - offset.left);
        var y = (e.pageY - offset.top);
        for (var i in rect) {
            {
                for (var j in rect[i]) {
                    if (isCursorInRect(x, y, rect[i][j])) {
                        if (!game.isWin() && !game.isLose()) {
                            game.click(ctx, rect[i][j].i, rect[i][j].j, rect);
                        }
                    }
                }
            }
        }
    });
    $("#countCell").click(function (e) {
        img = new Image();
        img.src = '/Content/Image/close.jpg';
        img.onload = function () {
            reDraw(rect, img);
        };

        if (game.isWin()) {
            $('form#mnax').submit();
            /*  $("send").on("submit", function (e) {
                  e.preventDefault();
                  alert("ffffdf");
                  $.ajax({
                      url: this.action,
                      type: this.action,
                      data: $(this).serialize()
                  });
              });*/
        }

    });
    function startTime() {
        start.setMilliseconds(start.getMilliseconds() + 1);
        var mSecond = parseInt(start.getMilliseconds() / 100);
        timeElem.children[0].innerHTML = mSecond;
        if (mSecond == 9) {

            start.setSeconds(start.getSeconds());
            var second = parseInt(start.getSeconds());
            timeElem.children[1].innerHTML = second + 1;
        }


    };

