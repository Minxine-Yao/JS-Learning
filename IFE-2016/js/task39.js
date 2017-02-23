window.onload = function(){
	initFrozenHeadTable();
	// var table = document.getElementsByClassName("frozen-first-line-table");
	// console.log(table[0].getBoundingClientRect().top);
}

function initFrozenHeadTable(){
	var table = document.getElementsByClassName("frozen-head-table");
	var tableBeginY = new Array();
	var tableEndY = new Array();
	for(var n=0;n<table.length;n++){
		tableBeginY.push(table[n].getBoundingClientRect().top + window.pageYOffset);
		console.log(tableBeginY[n]);
		tableEndY.push(tableBeginY[n] + table[n].clientHeight); //clientHeight可见高度
	}
	window.onscroll = function(){
		// console.log(window.pageYOffset);
		for(var n = 0;n<table.length;n++){
			// console.log(window.pageYOffset);
			if(window.pageYOffset >= tableBeginY[n] && window.pageYOffset <= tableEndY[n]){
				// 到达了某个table的顶部
				var headLine = document.getElementById("temp-head-line-" + n);
				if(!headLine){
					// headLine尚未创建
					var headLine = table[n].getElementsByTagName("tr")[0].cloneNode(true);
					var tempTable = document.createElement("table");
					tempTable.className = "temp-fh-table";
					tempTable.appendChild(headLine);
					headLine.id = "temp-head-line-" + n;
					headLine.className = "temp-head-th";
					headLine.style.position = "fixed";
					headLine.style.left = table[n].getBoundingClientRect().left  + "px";
					headLine.style.top = "0";
					var body = document.getElementsByTagName("body")[0];
					body.insertBefore(tempTable,body.firstChild);
					console.log(headLine);
				}
			}	
			if(window.pageYOffset >= tableEndY[n] || window.pageYOffset <= tableBeginY[n]){
				// 即将离开某个table
				var tempHeadLine = document.getElementById("temp-head-line-" + n);
				// 临时的head-line还存在
				if(tempHeadLine){
					var p = tempHeadLine.parentNode;
					while(p.className !== "temp-fh-table")
						p = p.parentNode;
					document.getElementsByTagName("body")[0].removeChild(p);
				}
			}
		}
	}
	function indexOf(collection,item){
		for(var n=0;n<collection.length;n++){
			if(Math.round(collection[n]) === item){
				console.log(Math.round(collection[n])+","+item);
				return n;
			}
		}
		return -1;
	}
}