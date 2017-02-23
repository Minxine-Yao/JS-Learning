function Node(id){
	this.id = id;
	this.childNum = 0;
	this.insert = function(child){
		this[`child${this.childNum++}`]=child;
		child.parent = this;
		createDiv(child.id,this.id);
	}
	this.remove = function(child){
		var curDiv = document.getElementById(child.id);
		var parDiv = document.getElementById(this.id);
		while(curDiv.hasChildNodes()){
			// 删除所有子div
			curDiv.removeChild(curDiv.firstChild);
		}
		parDiv.removeChild(curDiv);
		// delete child;
		var afterTarget = false;
		for(var n=0;n<this.childNum;n++){
			if(!afterTarget){
				if(this["child"+n]===child)
					afterTarget = true;
			}else{
				this["child"+(n-1)] = this["child"+n]
			}
		}
		this.childNum--;
		delete this["child"+this.childNum];
		console.log(this);

	}
}
function getNode(rootNode,targetId){
	var doNothing = function(){};
	return findNode(rootNode,targetId,doNothing,doNothing,doNothing);
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
	if(!temp) leave(rootNode,true); //在该节点及其子树下未找到，离开该点
	else leave(rootNode,false); //在该节点或子树下找到了，仅褪色
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
		// 子节点全部展开
		var childNode = curDiv.childNodes;
		for(var n=1;n<childNode.length;n++){
			childNode[n].style.display = "block"
		}
	},clk);
	clk += 750;
}
function leave(node,collapsed){
	var curDiv = document.getElementById(node.id);	
	var t = setTimeout(function(){
		curDiv.style.backgroundColor = "white";
		if(collapsed){
			var childNode = curDiv.childNodes;
			for(var n=1;n<childNode.length;n++){
				childNode[n].style.display = "none"
			}
		}
	},clk);
	clk += 750;
}
function createDiv(id,parentName){
	var parDiv = document.getElementById(parentName);
	var chiDiv = document.createElement("div");
	chiDiv.innerHTML = id;
	chiDiv.id = id;
	chiDiv.className = "node";
	chiDiv.onclick = function(e){
		e.stopPropagation();
		// 添加点击展开/收缩的功能
		var childNode = chiDiv.childNodes;
		if(childNode.length != 1 && chiDiv.lastChild.style.display === "none"){
			// 子节点处在收缩状态
			for(var n=1;n<childNode.length;n++){
				// 第一个child是text
				childNode[n].style.display = "block";
			}
		}else{
			for(var n=1;n<childNode.length;n++){
				childNode[n].style.display = "none";
			}

		}
		//添加点击某个div变色的功能
		var lastFocus = document.getElementById(clickFocus);
		if(lastFocus){
			lastFocus.style.backgroundColor = "white";
		}
		clickFocus = id;
		chiDiv.style.backgroundColor = "pink";
	};
	parDiv.appendChild(chiDiv);
}
var root = new Node("root")
var focus = "";
var clickFocus = "";
var clk = 0;
// var posNode = root;

window.onload = function(){
	createTreeByMe();
	var searchButton = document.getElementById("search");
	var addButton = document.getElementById("add");
	var deleteButton = document.getElementById("delete");
	searchButton.onclick = function(e){
		// 清除上次查询结果最后未恢复颜色的div
		var div = document.getElementById(focus);
		var clickDiv = document.getElementById(clickFocus);
		if(div){
			div.style.backgroundColor = "white";
		}
		if(clickDiv){
			clickDiv.style.backgroundColor = "white";
			clickFocus = "";
		}
		// 获取此次要查询的值
		var inputId = document.getElementById("input-id")
		focus = inputId.value;
		findNode(root,inputId.value,visit,arrive,leave);
		clk = 0;
	}
	addButton.onclick = function(e){
		var focusNode = getNode(root,clickFocus);
		if(focusNode){
			var inputId = document.getElementById("input-id")
			var existNode = getNode(root,inputId.value);
			if(existNode){
				alert("已存在该节点，请勿重复插入！")
			}else if(inputId.value === ""){
				alert("输入不能为空！");
			}else{
				focusNode.insert(new Node(inputId.value));
			}
		}else{
			alert("请先选择父节点！")
		}
	}
	deleteButton.onclick = function(e){
		var curNode = getNode(root,clickFocus);
		if(!curNode){
			alert("请先选择一个节点进行删除！")
		}else{
			var parNode = curNode.parent;
			parNode.remove(curNode);
		}
	}
}

function createTreeByMe(){
	createDiv("root","tree");
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