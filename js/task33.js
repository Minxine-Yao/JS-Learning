const gridSize = 10;
const gridWidth = 30;
const gridHeight = 30;
const targetWidth = 20;
const targetHeight = 20;
var intToEn = ["zero","one","two","three","four","five",
		 	   "six","seven","eight","nine","ten"];
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
				grid.id = intToEn[i]+"-"+intToEn[j];
				grids.appendChild(grid);				
			}
		}
	}
}
window.onload = function(){
	createGrid();
}