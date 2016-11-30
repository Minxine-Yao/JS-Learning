function Node(id){
	this.id = id;
	this.insertLeft = function(child){
		this.leftChild = child;
		child.parent = this;
		if(this.rightChild != undefined){
			// 已经创建了空的div占位，进行修改即可
			var emptyDiv = document.getElementById(this.id+"EmptyChild");
			emptyDiv.innerHTML = child.id;
			emptyDiv.id = child.id;
			emptyDiv.style.display = "block";
		}else{
			child.parent = this;
			createDiv(child.id,this.id);
		}
	}
	this.insertRight = function(child){
		this.rightChild = child;
		child.parent = this;
		if(this.leftChild === undefined){
			// 先插入右结点，则必须创建一个空的左结点div占位
			createDiv(this.id+"EmptyChild",this.id);
			var div = document.getElementById(this.id+"EmptyChild");
			div.style.display = "none";
		}
		createDiv(child.id,this.id);
	}
}

function createDiv(id,parentName){
	var parDiv = document.getElementById(parentName);
	var chiDiv = document.createElement("div");
	chiDiv.innerHTML = id;
	chiDiv.id = id;
	chiDiv.className = "node";
	parDiv.appendChild(chiDiv);
}
var root = new Node("root")

window.onload = function(){
	createTreeByMe();
}

function createTreeByMe(){
	var hello = new Node("hello");
	var world = new Node("world");
	root.insertRight(new Node("world"))
	root.insertLeft(new Node("hello"));
}