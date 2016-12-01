function Node(id){
	this.id = id;
	this.insertLeft = function(child){
		if(this.leftChild != undefined){
			console.log(`node ${this.id}'s leftChild already exists`);
		}
		else if(this.rightChild != undefined){
			this.leftChild = child;
			child.parent = this;
			// 已经创建了空的div占位，进行修改即可
			var emptyDiv = document.getElementById(this.id+"EmptyChild");
			emptyDiv.innerHTML = child.id;
			emptyDiv.id = child.id;
			emptyDiv.style.display = "block";
		}else{
			this.leftChild = child;
			child.parent = this;
			createDiv(child.id,this.id);
		}
	}
	this.insertRight = function(child){
		if(this.rightChild != undefined){
			console.log(`node ${this.id}'s rightChild already exists`);
		}
		else if(this.leftChild === undefined){
			// 左子结点尚未定义
			this.rightChild = child;
			child.parent = this;
			// 创建一个空的左结点div占位
			createDiv(this.id+"EmptyChild",this.id);
			var div = document.getElementById(this.id+"EmptyChild");
			div.style.display = "none";
			// 插入右子节点的div
			createDiv(child.id,this.id);
		}else{
			this.rightChild = child;
			child.parent = this;
			createDiv(child.id,this.id);
		}
	}
}
function findNode(rootNode,targetId,visit,arrive,leave){
	arrive(rootNode); //途经该点
	if(rootNode.id === targetId){
		visit(rootNode);
		return rootNode;
	}
	var temp = null;
	if(rootNode.leftChild != undefined){
		temp = findNode(rootNode.leftChild,targetId,visit,arrive,leave);
	}
	if(temp===null && rootNode.rightChild != undefined){
		temp = findNode(rootNode.rightChild,targetId,visit,arrive,leave);
	}
	leave(rootNode); //离开该点
	return temp;
}
function visit(node){
	console.log(`finally arrive at node ${node.id}`);
	// var lastDiv = document.getElementById(posNode.id);
	// var curDiv = document.getElementById(node.id);	
	// var t = setTimeout(function(){
	// 	lastDiv.style.backgroundColor = "white";
	// 	curDiv.style.backgroundColor = "red";
	// },1500);
	// posNode = node;
}
function arrive(node){
	console.log(`arrive at node ${node.id}`);
	var curDiv = document.getElementById(node.id);	
	var t = setTimeout(function(){
		curDiv.style.backgroundColor = "red";
	},clk);
	clk += 750;
}
function leave(node){
	var curDiv = document.getElementById(node.id);	
	var t = setTimeout(function(){
		curDiv.style.backgroundColor = "white";
	},clk);
	clk += 750;
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
var clk = 0;
// var posNode = root;

window.onload = function(){
	createTreeByMe();
	var searchButton = document.getElementById("search");
	searchButton.onclick = function(e){
		var div = document.getElementById("d");
		d.style.backgroundColor = "white";
		findNode(root,"d",visit,arrive,leave);
		clk = 0;
	}
}

function createTreeByMe(){
	var hello = new Node("hello");
	var world = new Node("world");
	var h = new Node("h");
	var o = new Node("o");
	var w = new Node("w");
	var d = new Node("d");
	root.insertRight(world)
	root.insertLeft(hello);
	hello.insertLeft(h);
	hello.insertRight(o);
	world.insertLeft(w);
	world.insertRight(d);
}