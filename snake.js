//In this Snake Game, we have used various programming concepts to build this game. 
// 1. we used the concepts of Object Oriented Programming
// 2. we used data structure Array
// 3. we used functions 
// 4. we used some basic algorithms to check if the snake is going out of the bounds or not 
// 5. we used conditional statements 
// 6. and, we implemented a game loop  

function init(){
	canvas=document.getElementById('mycanvas');
	console.log(canvas);
	W=canvas.width=1000;
	H=canvas.height=1000;
	pen=canvas.getContext('2d');
	gameOver=false;
	cs=66;
	score=0;

	//Create food object 
	food=getRandomFood();
	
	//Create a Image Object for food
	foodImage=new Image();
	foodImage.src="Assets/apple.png";

	//Create a Image Object for trophy
	trophyImage=new Image();
	trophyImage.src="Assets/trophy.png";

        //Create snake JSON Object
	snake={
		initLength:5,
		color:"blue",
		direction:"right",
		cells:[],

		createSnake:function(){
			//Creating a Snake Array of 'initLength'
			//for (var i = 1; i <= this.initLength; i++) {
			for (var i = this.initLength; i > 0; i--) {
			    this.cells.push({x:i,y:0});//create a new JSON unnamed object with (x,y) coordinate 
			    //push it in the cells[] array
			}
		},

		//There are 2 ways, we can draw the Snake: 1. Inside snake Object and, 2. Inside draw() function  
		
		//Inside snake Object means, snake object knows how to draw a Snake
		//but we'll call this function from the draw() function only
		//When you want to draw a Snake, what we'll do...for each cell we'll draw a rectangle
		
		drawSnake:function(){
			//whenever this function call, it'll create a Snake object with 5 rectangular cells or more  
			for (var i = 0; i < this.cells.length; i++) {
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},

		//Now we need to focus in adding movement of Snake in the game, so for that we will make function
		//updateSnake() and that should animate the snake go right direction(default case) 
		//Either we write entire logic of updateSnake() inside snake object, here or we can write the entire
		//logic in update() function. 

		//But, we want to do the things or whole game developement in an OOPs way so that we are making things 
		//modular and every object knows how to update itself. So, we have an object called snake and have a method
		//called snake.updateSnake().


		//LOGIC updateSnake() in Right Direction:

		//Step-1: We'll extract a cell from last of the cells[] Array or back of the Array
		//so we pop the cell by calling pop() from the back of the Array or Snake.

		//Here, (x,y)-value of the back of the cells[] Array is, (0,0) 

		//Step-2: And add a new cell to the front of the Snake or in the right most direction. 
		//It means, the x-value of the new cell will be adding by 1 unit to the x-value of the front cell or 
		//head of the snake and insert it to the front of the cells[] Array by unshift({x,y}) operation.

		//Here, head of the Snake with that cell, (x,y) pair value is (5,0); headX=5 and headY=0 
		//so the new cell will be adding to the front of the head by x=headX+1 and y=0, remains same 
		//because we're dispositioning x-axis; it means we're moving in right direction.

		updateSnake:function(){
			//Updating Snake according to the direction property:

			//Also check if the snake has eaten food, increase the length of the snake and generate new food object as well
			//for that, we first check if the coordinate of the snake overlaps with the coordinate of the food, in that way we
			//come to know that if collision is there
			
                        var headX=snake.cells[0].x;
			var headY=snake.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("food eaten");
				food=getRandomFood();//Update the food object
				score++;
			}else{
				//1 exsisting cell pop() from the back of the Snake Array and,
				this.cells.pop(); 
			}
			
			var nextX,nextY; 

			if(this.direction=="right"){
				nextX=headX+1;
				nextY=headY;
			}else if(this.direction=="left"){
				nextX=headX-1;
				nextY=headY;
			}else if(this.direction=="up"){
				nextX=headX;
				nextY=headY-1;
			}else if(this.direction=="down"){
				nextX=headX;
				nextY=headY+1;
			}

			//1 new cell will insert in the right most direction of the Snake Array.
			this.cells.unshift({x:nextX,y:nextY});

			//Write a logic that prevents snake from going out:

			//first find out the last coordinate of the canvas
			//the reason of doing (W-cs) and (H-cs) because, snake head should not go outside of the border    
			
                        var lastX=Math.round((W-cs)/cs);
			var lastY=Math.round((H-cs)/cs);

			if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>lastX || this.cells[0].y>lastY){
				gameOver=true;
			}


		}
	};

	//In the init() function, we need to call this function, createSnake()
	snake.createSnake();

	//So the Snake was ready and date structure we've used to store the cells of the snake is Array; 
	//but it's actually Array of pairs like this...
	//In the Cells Array, 0th index:{4,0}; 1st index:{3,0}; 2nd index:{2,0}; 3rd index:{1,0}; 4th index:{0,0} 
	//this is how we have stored Snake in the array.

	//LOGIC of building Snake Array:

	//Now, reverse in x-value in the array(4,3,2,1,0) because snake would go in the right direction by default;
	//so the logic is, after draw rectangle by (this.cells[i].x*this.cs) this parameter, {4,0} object's rectangle 
	//would be draw first in the canvas and then other objects in the cells[] array. 
	//So that, right end of the rectangular block will be the Head of the Snake. 
	
	//So, it would look like reverse in the order in Cells[] element and Rectangular Blocks position in the Canvas.

	//So in the canvas, front position will be the right end of the rectangular block or the Head of the Snake, and
	//back position will be the left end of the rectangular block or the tail of the Snake. 

	//Actually if we see the frame(5 rectangular boxes) without knowing the back-end code, we will think that 
	//right-end of the rectangular box will be back position and left-end of the rectangular box will be 
	//front position of the Snake. But it's not true because we have identify front and back position of the Snake 
	//on the basis of cells[] Array. And this is how we drawn the Snake.  

	//Add event listener on the Document object to give direction to the Snake

	function keyPressed(keyObject){
		//console.log(keyObject.key);
		//Coditional Statement
		if(keyObject.key=="ArrowRight"){
			snake.direction="right";
		}else if(keyObject.key=="ArrowLeft"){
			snake.direction="left";
		}else if(keyObject.key=="ArrowUp"){
			snake.direction="up";
		}else if(keyObject.key=="ArrowDown"){
			snake.direction="down";
		}
	}
	document.addEventListener('keydown',keyPressed);


}

function draw(){
	//In our draw() function we should erase the old screen or frame; so everytime we draw a new Snake Frame 
	//by calling drawSnake() function in the draw() function, we should erase the old Snake Frame
	//Here Snake Frame is made of 5 rectangular boxes altogether or more

	//Erase the Old Frame
	pen.clearRect(0,0,W,H);

	//In the draw() function, we need to call this function, drawSnake()
	snake.drawSnake();

	//Draw food object
	pen.fillStyle=food.color;
	pen.drawImage(foodImage,food.x*cs,food.y*cs,cs+2,cs-1);

	//Before writing the score object, we should draw the trophy image first so that score showed over the trophy 
	pen.drawImage(trophyImage,20,20,cs,cs);

	//Draw Score Object
	pen.fillStyle="blue";
	pen.font="20px Roboto";
	pen.fillText(score,50,50);
}

function update(){
	snake.updateSnake();
}

function getRandomFood(){
	//this function gives cordinates about food object 
	var foodX=Math.round(Math.random()*(W-cs)/cs); 
	var foodY=Math.round(Math.random()*(H-cs)/cs);
	//the reason to do (W-cs) and (H-cs) because we don't want our food cordinates outside the canvas. So, we don't need our food coordinates 
	//like this, x=W or y=H  
	//And divided by cs(cell size) because we rendered the cells by multiplying with cs; it means cell blocks are in
        //multiple of cs so to get the actual cordinates (x,y) range in between 0 to (500/cs).  

	//food Object (JSON Object)
	var food={
		x:foodX,
		y:foodY,
		color:"red",
	}

	return food;
}

function gameloop(){
	if(gameOver){
		clearInterval(start);
		alert("Game Over");
		return;//To write this return statement in here because, game is over so to stop the game at this point   
	}
	draw();
	update()
}

init();
//gameloop();
start=setInterval(gameloop,100);//Start the Game
