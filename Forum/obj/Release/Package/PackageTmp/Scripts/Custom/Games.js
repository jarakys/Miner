/*var Game = function (sizeX, sizeY, bomb)
{
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.bomb = bomb;

    setBomb =  function()
    {
        while (this.bomb != 0)
        {
            var x = Math.floor(Math.random() * (this.sizeX + 1));
            alert(x);
        }
    }*/
function Games(sizeX, sizeY, countBomb, rect) {
    var sizeX = sizeX;
    var sizeY = sizeY;
    var win = false;
    var lose = false;
    var countBomb = countBomb;
    this.field = [];
    this.countFlags = countBomb;
    var countCells = sizeX * sizeY;
    createField(this.field);
    div.innerHTML = this.countFlags;
    function createField(field) {
        var temp = [];
        for (var i = 0; i < sizeX; i++) {
            var temp = [];
            for (var j = 0; j < sizeY; j++) {
                temp[j] = { Bomb: '0', Flag: false };
            }
            field[i] = temp;
        }

    };
    function setBomb(field) {
        var bomb = countBomb;
        while (bomb > 0) {
            var x = Math.floor(Math.random() * (sizeX));
            var y = Math.floor(Math.random() * (sizeY));
            if (field[x][y].Bomb == '0') {
                field[x][y].Bomb = '*';
                bomb--;
            }
        }
    };
    this.click = function (ctx, SX, SY, rect) {
        var x = SX;
        var y = SY;
        if (countCells == (sizeY * sizeX)) {
            this.field[x][y].Bomb = '!';
            setBomb(this.field);
        }


        if (this.field[x][y].Bomb == '0' || this.field[x][y].Bomb == '!') {
            openBloks(ctx, SX, SY, rect, this.field);
        }
        else if (this.field[x][y].Bomb == '*' && this.field[x][y].Flag == false) {
            divCount.innerHTML = "Проиграл(";
            lose = true;
        }
    };

    this.isWin = function ()
    {
        return win;
    }
    this.isLose = function ()
    {
        return lose;
    }

    function openBloks(ctx, SX, SY, rect, field) {
        if (SX >= 0 && SX <= sizeX - 1 && SY >= 0 && SY <= SizeY - 1) {
            var x = SX;
            var y = SY;
            if ((field[x][y].Bomb == '0' || field[x][y].Bomb == '!') && field[x][y].Flag == false) {
                var count = 0;
                for (var i = - 1; i <= 1; i++) {
                    for (var j = - 1; j <= 1; j++) {
                        if (0 <= x + i && x + i < field.length && 0 <= y + j && y + j < field[0].length) {
                            if (field[i + x][j + y].Bomb == '*') {

                                count++;
                            }
                        }
                    }
                }
                field[x][y].Bomb = count;
                var img = new Image();
                img.src = '/Content/Image/open.jpg';
                img.onload = function () {
                    rect[x][y].img = img;
                    rect[x][y].drawImg();

                    if (count != 0) {
                        
                        switch (count) {
                            case 1:
                                {
                                    ctx.fillStyle ="#0015ff"
                                    break;
                                }
                            case 2:
                                {
                                    ctx.fillStyle = "#0ea600"
                                    break;
                                }
                            case 3:
                                {
                                    ctx.fillStyle = "#a60034"
                                    break;
                                }
                            case 4:
                                {
                                    ctx.fillStyle = "#656900"
                                    break;
                                }
                            case 5:
                                {
                                    ctx.fillStyle = "#ff3700"
                                    break;
                                }
                            case 6:
                                {
                                    ctx.fillStyle = "#00ffff"
                                    break;
                                }
                            case 7:
                                {
                                    ctx.fillStyle = "#cc00ff"
                                    break;
                                }
                            case 8:
                                {
                                    ctx.fillStyle = "#15ff00"
                                    break;
                                }
                        }
                        ctx.font = "20px Arial";
                        rect[x][y].text = count;
                        rect[x][y].drawText();
                    }
                    if (WIN(countCells)) {
                        img = new Image();
                        img.onload = function () {
                            divCount.innerHTML = "Победа!";
                            win = true;
                        };
                        img.src = '/Content/Image/close.jpg';

                    }
                }
                countCells--;
                divCount.innerHTML = countCells;
                if (field[x][y].Bomb == '0' && field[x][y].Flag == false) {
                    field[x][y].Bomb = 'E';
                    openBloks(ctx, (x - 1), y, rect, field);
                    openBloks(ctx, x, (y + 1), rect, field);
                    openBloks(ctx, (x + 1), y, rect, field);
                    openBloks(ctx, x, (y - 1), rect, field);
                    openBloks(ctx, (x + 1), (y + 1), rect, field);
                    openBloks(ctx, (x - 1), (y - 1), rect, field);
                    openBloks(ctx, (x + 1), (y - 1), rect, field);
                    openBloks(ctx, (x - 1), (y + 1), rect, field);
                }

            }
        }
    };

    function WIN(countCells) {
        if (countCells == (sizeY * sizeX) - ((sizeY * sizeX) - countBomb)) {
            return true;
        }
    };


    this.setFlag = function (x, y, rect) {
        if (this.field[x][y].Flag) {
            this.field[x][y].Flag = false;
            this.countFlags++;
            var imss = new Image();
            div.innerHTML = this.countFlags;
            imss.onload = function () {
                rect.img = imss;
                rect.drawImg();
            };
            imss.src = '/Content/Image/close.jpg'
        }
        else if (this.countFlags > 0 && (this.field[x][y].Bomb == '0' || this.field[x][y].Bomb == '*')) {

            this.field[x][y].Flag = true;
            this.countFlags--;
            var imsd = new Image();
            div.innerHTML = this.countFlags;
            imsd.onload = function () {
                rect.img = imsd;
                rect.drawImg();
            };
            imsd.src = '/Content/Image/Cw0t6MTGNCo.jpg';
        }
    };
    this.showField = function () {
        for (var i = 0; i < this.sizeX; i++) {
            var string = ' ';
            for (var j = 0; j < this.sizeY; j++) {
                string += this.field[i][j] + ' ';
            }
            console.log(string);
        }
    };


}