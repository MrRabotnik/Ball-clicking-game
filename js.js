$("#start").click(start);
$("#stop").click(stop);
$(".ball_container").click(flyingBall)
var movingBallUp,movingBallDown;
var WW = $(window).width()
var WH = $(window).height()
var startClicked = false
var ball = $(".ball_container");
var Y = 50;
var X = Math.floor(Math.random() * (WW - ballWidth - 10) + ballWidth + 10);
var startingToFall;
var count = 0;
var ballWidth = $(ball).width()
var comingBack = false
var toright = 0
var leftWallHit = false
var rightWallHit = false


function start(){
	$('.counter').text(count)
	count = 0
	$(".you_lost").text("")
	clearInterval(movingBallDown)
	movingBallDown = setInterval(fallOnce,5);
	startClicked = true;
};


function fallOnce(){
	if(Y < WH - ball.height() + 5){
		$(ball).css({
			top: `${Y}px`,
			left:`${X}px`,
		});
		Y += 2;
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
		Y += 2;
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
	}else if(X > WW - ballWidth - 5){
		toright = -1
	}
}

function moveUp(){
	$(ball).css({
		top: `${Y}px`,
		left:`${X}px`,
	});
	Y -= 2;
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
				}else if(e.clientX > X + ballWidth/2){
					toright = -1
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
	$('.counter').text(count)
	count = 0
	clearInterval(movingBallUp)
	clearInterval(movingBallDown)
	clearTimeout(startingToFall)
	$(ball).css({
		top: "10%",
		left:"40%",
	});
	X = Math.floor(Math.random() * (WW - ballWidth - 10) + ballWidth + 10)
	Y = 50
}












