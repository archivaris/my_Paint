$(document).ready(function (e) {


    let canvas = document.getElementsByTagName('canvas')[0].getContext('2d');
    let click = false;
    let color = $("#colorpicker").val();
    let size = 5;
    let tool = "pen";

    //ON CLICK
    $(window).mousedown(function () {
        click = true;
    });
    //NO CLICK
    $(window).mouseup(function () {
        click = false;
    });

    //PICKING COLOR
    $("#colorpicker").on("change", function () {
        color = $("#colorpicker").val();
    });
    //ON CLICK
    $('canvas').mousedown(function (e) {
        if (tool === "line") {
            console.log(tool);
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;
            drawNextLine(canvas, x, y)
        }
        if (tool === "pen") {
            console.log(tool);

            draw(e.pageX, e.pageY);
        }
        if (tool === "empty_circle") {
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;
            drawEmptyCircle(canvas, x, y);
        }
        if (tool === "empty_square") {
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;
            drawEmptySquare(canvas, x, y);
        }
        if (tool === "filled_circle") {
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;
            drawFilledCircle(canvas, x, y);
        }
        if (tool === "filled_square") {
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;
            drawFilledSquare(canvas, x, y);
        }

    });


    //NO CLICK
    $('canvas').mouseup(function (e) {
        // draw(e.pageX, e.pageY);

    });
    //MOVE CURSOR
    $('canvas').mousemove(function (e) {
        if (click === true) {
            if (tool === "pen") {
                console.log(tool);

                draw(e.pageX, e.pageY);
            }
        }
    });

    //DRAW DOODLE
    function draw(xPos, yPos) {
        canvas.beginPath();
        canvas.fillStyle = color;
        canvas.arc(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top, size, 0, 2 * Math.PI);
        canvas.lineJoin = "round";
        canvas.lineCap = "round";
        canvas.fill();
        canvas.closePath();
    }

    let state = true;
    let xCircle;
    let yCircle;
    let xSquare;
    let ySquare;


    //EMPTY SQUARE
    function drawEmptySquare(canvas, x, y) {
        if (state) {
            xSquare = x;
            ySquare = y;
            state = false;
        } else {
            canvas.beginPath();
            canvas.strokeStyle = color;
            canvas.lineWidth = size;
            canvas.rect(xSquare, ySquare, x - xSquare, y - ySquare);
            canvas.stroke();
            state = true;
        }
    }

    //FILLED SQUARE
    function drawFilledSquare(canvas, x, y) {
        if (state) {
            xSquare = x;
            ySquare = y;
            state = false;
        } else {
            canvas.beginPath();
            canvas.fillStyle = color;
            canvas.rect(xSquare, ySquare, x - xSquare, y - ySquare);
            canvas.fill();
            state = true;
        }
    }

    //DRAW LINE
    function drawNextLine(canvas, x, y) {
        if (state) {
            canvas.lineWidth = 5;
            canvas.beginPath();
            canvas.strokeStyle = color;
            canvas.lineWidth = size;
            canvas.moveTo(x, y);
            state = false;
        } else {
            canvas.lineTo(x, y);
            canvas.stroke();
            state = true;
        }
    }


//EMPTY CIRCLE
    function drawEmptyCircle(canvas, x, y) {
        if (state) {
            xCircle = x;
            yCircle = y;
            state = false;
        } else {
            canvas.beginPath();
            canvas.strokeStyle = color;
            canvas.lineWidth = size;
            canvas.arc(xCircle, yCircle, Math.sqrt(Math.pow((x - xCircle), 2) + Math.pow((y - yCircle), 2)), 0, 2 * Math.PI);
            canvas.stroke();
            state = true;
        }
    }

    //FILLED CIRCLE
    function drawFilledCircle(canvas, x, y) {
        if (state) {
            xCircle = x;
            yCircle = y;
            state = false;
        } else {
            canvas.beginPath();
            canvas.fillStyle = color;

            canvas.arc(xCircle, yCircle, Math.sqrt(Math.pow((x - xCircle), 2) + Math.pow((y - yCircle), 2)), 0, 2 * Math.PI);
            canvas.fill();
            state = true;
        }
    }



    //BRUSH SIZE 5PX
    $("#brush5").click(function () {
        tool = "pen";
        size = 5;
    });


    //BRUSH SIZE 10PX
    $("#brush10").click(function () {
        tool = "pen";
        size = 10;
    });


    //BRUSH SIZE 25PX
    $("#brush25").click(function () {
        tool = "pen";
        size = 25;
    });


    //WHITENING STUFF
    $("#gum ").click(function () {
        tool = "pen";
        color = "white";
        size = 25;
    });

    $("#empty_circle").click(function () {
        tool = "empty_circle";
    });
    $("#filled_circle").click(function () {
        tool = "filled_circle";
    });
    $("#empty_square").click(function () {
        tool = "empty_square";
    });
    $("#filled_square").click(function () {
        tool = "filled_square";
    });
    $("#full").click(function () {
        let c = document.getElementsByTagName('canvas')[0];
        canvas.fillStyle = color;
        canvas.fillRect(0, 0, c.width, c.height);
    });

    $("#line").click(function () {
        tool = "line";
    });

    //CLEAR TABLE
    $("#clear").click(function () {
        let c = document.getElementsByTagName('canvas')[0];
        canvas.clearRect(0, 0, c.width, c.height);
        canvas.restore();
    });

//SET BACKGROUND

    let imageLoader = document.getElementById('imagepicker');
    imageLoader.addEventListener('change', handleImage, false);

    function handleImage(e) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.drawImage(img, 0, 0);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    //SAVE DOODLE
    let link = document.createElement('a');
    link.innerHTML = 'download image';
    link.style.cssText = "color: darkblue;font-size: 25px";

    link.addEventListener('click', function (e) {
        link.href = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
        link.download = "doodle.png";
    }, false);
    document.body.appendChild(link);
});