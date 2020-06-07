$("#start").click(start);
$("#stop").click(stop);
$(".ball_container").click(flyingBall)
var movingBallUp,movingBallDown;
var WW = $(window).width()
var WH = $(window).height()
var startClicked = false
var ball = $(".ball_container");
var Y = 50;
var X = Math.floor(Math.random() * WW/2 + ballWidth)
var startingToFall;
var count = 0;
var ballWidth = $(ball).width()
var comingBack = false
var toright = 0
var leftWallHit = false
var rightWallHit = false
var fallingSpeed;

function start(){
	$('.counter').text(count);
	count = 0;
	$(".result").text("");
	clearInterval(movingBallDown);
	movingBallDown = setInterval(fallOnce,5);
	startClicked = true;
	fallingSpeed = 0
};


function fallOnce(){
	if(Y < WH - ball.height() + 5){
		$(ball).css({
			top: `${Y}px`,
			left:`${X}px`,
		});
		Y += fallingSpeed;
		fallingSpeed += 0.015
		comingBack = true
	}else{
		$(".result").text("Well...you lost")
		stop()
		$('.counter').text(count)
		count = 0
	}
};

function moveDown(){
	if(Y < WH - ball.height() + 5){
		//Just work here
//-----------------------------------------
		$(ball).css({
			top: `${Y}px`,
			left:`${X}px`,
		});
		Y += fallingSpeed;
		fallingSpeed += 0.015
		checkingWalls()
		if(toright == 1){
			X += 1
		}else if(toright == -1){
			X -= 1
		}

		comingBack = true
//-----------------------------------------
	}else{
		$(".result").text("Well...you lost")
		stop()
		$('.counter').text(count)
		count = 0
	}
};

function checkingWalls(){
	if(X < 1){
		toright = 1
		$(ball).addClass("rotateRight")
		$(ball).removeClass("rotateLeft")
	}else if(X > WW - ballWidth - 5){
		toright = -1
		$(ball).addClass("rotateLeft")
		$(ball).removeClass("rotateRight")
	}
}

function moveUp(){
	$(ball).css({
		top: `${Y}px`,
		left:`${X}px`,
	});
	Y -= fallingSpeed;
	fallingSpeed -= 0.015
	checkingWalls()
	if(toright == 1){
		X += 1
	}else if(toright == -1){
		X -= 1
	}
	comingBack = false
};

function flyingBall(e){
	if(count < 50){
		if(startClicked){
			if(comingBack){
				count++
				if(e.clientX < X + ballWidth/2){
					toright = 1
					$(ball).addClass("rotateRight")
					$(ball).removeClass("rotateLeft")
				}else if(e.clientX > X + ballWidth/2){
					toright = -1
					$(ball).addClass("rotateLeft")
					$(ball).removeClass("rotateRight")
				}
				$('.counter').text(count)
				clearInterval(movingBallDown)
				movingBallUp = setInterval(moveUp,5);
				startingToFall = setTimeout(function(){
					clearInterval(movingBallUp)
					movingBallDown = setInterval(moveDown,5);
				},1000)
			}
		}
	}else{
		$(".result").text("You won...congrats")
		stop()
	}
}


function stop(){
	startClicked = false;
	$(".you_lost").text("")
	$('.counter').text(count)
	count = 0
	clearInterval(movingBallUp)
	clearInterval(movingBallDown)
	clearTimeout(startingToFall)
	X = Math.floor(Math.random() * WW/2 + ballWidth)
	Y = 50
	$(ball).css({
		top: "10%",
		left:`${X}px`,
	});
	fallingSpeed = 0
}












