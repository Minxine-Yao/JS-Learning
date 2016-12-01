function Node(id){
	this.id = id;
	this.childNum = 0;
	this.insert = function(child){
		this[`child${this.childNum++}`]=child;
		child.parent = this;
		createDiv(child.id,this.id);
	}	
}
function findNode(rootNode,targetId,visit,arrive,leave){
	arrive(rootNode); //途经该点
	if(rootNode.id === targetId){
		visit(rootNode);
		return rootNode;
	}
	var temp = null;
	for(var n=0;n<rootNode.childNum;n++){
		temp = findNode(rootNode[`child${n}`],targetId,visit,arrive,leave);
		if(temp) break;
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
var focus = "";
var clk = 0;
// var posNode = root;

window.onload = function(){
	createTreeByMe();
	var searchButton = document.getElementById("search");
	searchButton.onclick = function(e){
		// 清除上次查询结果最后未恢复颜色的div
		var div = document.getElementById(focus);
		if(div){
			div.style.backgroundColor = "white";
		}
		// 获取此次要查询的值
		var inputId = document.getElementById("input-id")
		focus = inputId.value;
		findNode(root,inputId.value,visit,arrive,leave);
		clk = 0;
	}
}

function createTreeByMe(){
	var hello = new Node("hello");
	var world = new Node("world");
	var h = new Node("h");
	var e = new Node("e");
	var l = new Node("l");
	var o = new Node("o");
	var r = new Node("r");
	var w = new Node("w");
	var d = new Node("d");
	root.insert(hello);
	root.insert(world)
	hello.insert(h);
	hello.insert(e);
	hello.insert(l);
	hello.insert(o);
	world.insert(w);
	world.insert(r);
	world.insert(d);
}