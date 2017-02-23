const gridSize = 10;
const gridWidth = 30;
const gridHeight = 30;
const targetWidth = 20;
const targetHeight = 20;
var englishNum = ["zero","one","two","three","four","five",
		 	   "six","seven","eight","nine","ten"];
var direction = ["Top","Right","Bottom","Left"];
var activeDiv = document.createElement("div");
function init(){

	// 创建“棋盘” 
	var grids = document.getElementById("grids");
	grids.style.width = (targetWidth + gridSize*gridWidth)+"px";
	grids.style.height = (targetHeight + gridSize*gridHeight)+"px";
	var emptyGrid = document.createElement("div");
	emptyGrid.style.width = targetWidth+"px";
	emptyGrid.style.height = targetHeight+"px";
	grids.appendChild(emptyGrid);
	// 创建横排的1~10标签
	for(var i = 1;i < gridSize+1;i++){
		var targetGrid = document.createElement("div");
		targetGrid.innerHTML = i;
		targetGrid.style.width = gridWidth+"px";
		targetGrid.style.height = targetHeight+"px";
		targetGrid.style.textAlign = "center";
		targetGrid.style.lineHeight = targetHeight+"px";
		targetGrid.style.verticalAlign = "middle";
		grids.appendChild(targetGrid);
	}
	for(var i = 1;i < gridSize+1;i++){
		for(var j = 0;j < gridSize+1;j++){
			if(j===0){
				// 创建标签
				var targetGrid = document.createElement("div");
				targetGrid.innerHTML = i;
				targetGrid.style.width = targetWidth+"px";
				targetGrid.style.height = gridHeight+"px";
				targetGrid.style.textAlign = "center";
				targetGrid.style.lineHeight = gridHeight+"px";
				targetGrid.style.verticalAlign = "middle";
				grids.appendChild(targetGrid);
			}else{
				// 创建格子
				var grid = document.createElement("div");
				grid.className = "grid";
				grid.style.width = gridWidth+"px";
				grid.style.height = gridHeight+"px";
				grid.style.borderRight = "1px solid rgb(200,200,200)";
				grid.style.borderBottom = "1px solid rgb(200,200,200)";
				// grid.style.border = "2px solid red";
				if(j===1) //最左侧的格子
					grid.style.borderLeft = "2px solid black";
				if(i===1) //最上侧的格子
					grid.style.borderTop = "2px solid black";
				if(j===gridSize) //最右侧的格子
					grid.style.borderRight = "2px solid black";
				if(i===gridSize) //最下侧的格子
					grid.style.borderBottom = "2px solid black";
				grid.id = englishNum[i]+"-"+englishNum[j];
				grids.appendChild(grid);				
			}
		}
	}
}
function Square(id,x,y){
	this.id = id;
	this.lastX = x;
	this.lastY = y;
	this.movX = 0;
	this.movY = 0;
	this.x = x;
	this.y = y;
	this.lastHead = 0;
	this.rotateDir = 1; //1代表顺时针，-1代表逆时针.0代表未旋转
	this.rotateAngle = 0; //总的转过的角度
	this.head = 0; //0代表目前头朝上
	this.repaint = function(){
		this.rotateAngle += 90*(this.head - this.lastHead);
		if(this.rotateDir === 1){
			this.head = this.head % 4
		}else if(this.rotateDir === -1){
			this.head = (this.head < 0) ? (this.head + 3) : (this.head - 1)
		}
		// 由于rotate后div的坐标轴也变动，故要再计算实际的移动距离
		// var rotateTime = ((this.rotateAngle % 360)/90 + this.rotateDir)%4;
		// console.log(rotateTime);
		// var deltaX = (this.x-this.lastX)*gridWidth;
		// var deltaY = (this.y-this.lastY)*gridHeight;
		// if(rotateTime === 0){
		// 	this.movX = deltaX;
		// 	this.movY = deltaY;
		// }else if(rotateTime === 1){
		// 	this.movX = deltaY;
		// 	this.movY = -1*deltaX;
		// }else if(rotateTime === 2){
		// 	this.movX = -1*deltaX;
		// 	this.movY = -1*deltaY;
		// }else if(rotateTime === 3){
		// 	this.movX = -1*deltaY;
		// 	this.movY = deltaX;
		// }
		// console.log(`rotateAngle:${this.rotateAngle},deltaX/Y ${deltaX}/${deltaY}`);
		activeDiv.style.transform = `rotate(${this.rotateAngle}deg)`;
		var curPos = toPx(this.x - 1,this.y - 1);
		activeDiv.style.left = curPos.x + "px";
		activeDiv.style.top = curPos.y + "px";
	};

	// 创建活动的div
	activeDiv.className = "active";
	activeDiv.style.width = gridWidth+"px";
	activeDiv.style.height = gridHeight+"px";
	activeDiv.style.left = (targetWidth+(this.x - 1)*gridWidth)+"px";
	activeDiv.style.top = (targetHeight+(this.y - 1)*gridHeight)+"px";
	activeDiv.style.backgroundColor = "blue";
	activeDiv.style["border"+direction[this.head]] = "12px solid red";
	document.getElementById("grids").appendChild(activeDiv);

	this.moveForward = function(distance){
		this.lastHead = this.head;
		var destX = this.x;
		var destY = this.y;
		this.rotateDir = 0;
		if(this.head===0) destY-=distance; //向上移动
		if(this.head===1) destX+=distance; //向右
		if(this.head===2) destY+=distance; //向下
		if(this.head===3) destX-=distance; //向左
		if(destX <= gridSize && destX >= 1 && destY <= gridSize && destY >= 1 ){
			this.lastX = this.x;
			this.lastY = this.y;
			this.x = destX;
			this.y = destY;
			this.repaint();
		}else{
			alert("将移动出界！");
		}
	};
	this.move = function(direction){
		// 先转方向再平移
		var turnTo;
		this.lastHead = this.head;
		if(direction==="TOP") turnTo = 0; //转向上方
		else if(direction==="RIG") turnTo = 1; //转向右方
		else if(direction==="BOT") turnTo = 2; //转向下方
		else if(direction==="LEF") turnTo = 3; //转向左方
		// this.rotateDir = 1;
		var rotateTime = (turnTo >= this.lastHead) ? (turnTo - this.lastHead) : 4 + (turnTo - this.lastHead);
		console.log(rotateTime);
		for(var n = 0;n < rotateTime;n++)
			this.rotate("RIG");
		// console.log(this.lastHead);
		// console.log(this.head);
		this.moveForward(1);
	};
	this.translate = function(direction){
		// 平移
		this.lastHead = this.head;
		direction = direction.toUpperCase().trim();
		this.rotateDir = 0;
		var destX = this.x;
		var destY = this.y;
		if(direction==="TOP") destY-=1; //向上移动
		if(direction==="RIG") destX+=1; //向右
		if(direction==="BOT") destY+=1; //向下
		if(direction==="LEF") destX-=1; //向左
		if(destX <= gridSize && destX >= 1 && destY <= gridSize && destY >= 1 ){
			this.lastX = this.x;
			this.lastY = this.y;
			this.x = destX;
			this.y = destY;
			this.repaint();
		}else{
			alert("将移动出界！");
		}
	}
	this.rotate = function(rotateType){
		this.lastHead = this.head;
		rotateType = rotateType.toUpperCase().trim();
		if(rotateType === "RIG"){
			this.rotateDir = 1;
			// this.head = (this.head+1)%4;
			this.head++;
		}
		else if(rotateType === "LEF"){
			this.rotateDir = -1;
			// this.head = (this.head-1 < 0) ? (this.head + 3) : (this.head - 1);	
			this.head--;
		} 
		else if(rotateType === "BAC"){
			// this.head = (this.head+2)%4;	
			this.rotate("RIG");
			this.rotate("RIG");
			return;
		} 
		this.repaint();
	};
	this.istTranslate = function(ist){ //ist = instruction
		ist = ist.toUpperCase().trim();
		var opType = ist.slice(0,3);
		var opNum = ist.slice(-3); 
		if(ist === "GO") this.moveForward(1);
		else if(opType === "TUN") this.rotate(opNum);
		else if(opType === "TRA") this.translate(opNum);
		else if(opType === "MOV") this.move(opNum);
		else alert("Wrong instruction!");

	};
}

function toPx(xNum,yNum){
	return {
		x : targetWidth+xNum*gridWidth,
		y : targetHeight+yNum*gridHeight
	};
}

window.onload = function(){
	init();
	// 创建活动的div
	var square1 = new Square("square1",6,6);
	document.getElementById("run-code").onclick = function(e){
		var code = document.getElementById("code").value;
		square1.istTranslate(code);
	}
}