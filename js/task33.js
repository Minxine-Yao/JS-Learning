const gridSize = 10;
const gridWidth = 30;
const gridHeight = 30;
const targetWidth = 20;
const targetHeight = 20;
var englishNum = ["zero","one","two","three","four","five",
		 	   "six","seven","eight","nine","ten"];
var direction = ["Top","Right","Bottom","Left"];
function createGrid(){
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
	this.x = x;
	this.y = y;
	this.lastHead = 0;
	this.head = 0; //0代表目前头朝上
	this.repaint = function(){
		// 清除上一步
		var lastDiv = document.getElementById(`${englishNum[this.lastY]}-${englishNum[this.lastX]}`);
		lastDiv.className += "grid active";
		lastDiv.style.transform = `translate(${(this.x-this.lastX)*gridWidth}px,${(this.y-this.lastY)*gridWidth}px)`;
		setTimeout(function(){
			lastDiv.className = "grid";
			lastDiv.style.transform = "none";
			lastDiv.style.backgroundColor = "white";
			lastDiv.style[`border${direction[this.lastHead]}`] = "none";
			lastDiv.style.borderRight = "1px solid rgb(200,200,200)";
			lastDiv.style.borderBottom = "1px solid rgb(200,200,200)";
			if(this.lastX===1) //最左侧的格子
				lastDiv.style.borderLeft = "2px solid black";
			if(this.lastY===1) //最上侧的格子
				lastDiv.style.borderTop = "2px solid black";
			if(this.lastX===gridSize) //最右侧的格子
				lastDiv.style.borderRight = "2px solid black";
			if(this.lastY===gridSize) //最下侧的格子
				lastDiv.style.borderBottom = "2px solid black";
			// 绘制下一步
			var div = document.getElementById(`${englishNum[this.y]}-${englishNum[this.x]}`);
			div.style.backgroundColor = "red";
			div.style[`border${direction[this.head]}`] = "10px solid blue";
		},1000);
	};
	this.repaint();
	this.moveForward = function(distance){
		var destX = this.x;
		var destY = this.y;
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
		if(direction==="RIG") turnTo = 1; //转向右方
		if(direction==="BOT") turnTo = 2; //转向下方
		if(direction==="LEF") turnTo = 3; //转向左方
		this.head = turnTo;
		this.moveForward(1);
		this.repaint();
	};
	this.translate = function(direction){
		// 平移
		direction = direction.toUpperCase().trim();
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
		if(rotateType === "RIG") this.head = (this.head+1)%4;
		if(rotateType === "LEF") this.head = (this.head-1 < 0) ? (this.head + 3) : (this.head - 1);
		if(rotateType === "BAC") this.head = (this.head+2)%4;
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
window.onload = function(){
	createGrid();
	var square1 = new Square("square1",6,6);
	document.getElementById("run-code").onclick = function(e){
		var code = document.getElementById("code").value;
		square1.istTranslate(code);
	}
}