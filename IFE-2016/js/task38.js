function initSortableTable(){
	var sItems = document.getElementsByClassName("sortable-table-item");
	var flags = new Array();
	for(var n = 0;n<sItems.length;n++) flags.push(-1);
	for(var n = 0;n<sItems.length;n++){
		var sIcon = document.createElement("div");
		sIcon.className = "sort-icon";
		sIcon.appendChild(document.createElement("div"));
		sIcon.appendChild(document.createElement("div"));
		sItems[n].appendChild(sIcon);
		(function(){
			var i = n;
			sItems[i].onclick = function(e){
				if(flags[i] === -1)
					flags[i] = 0;
				else if(flags[i] === 0)
					flags[i] = 1;
				else if(flags[i] === 1)
					flags[i] = 0;
				var i_th = indexOf(sItems[i].parentNode.childNodes,sItems[i]);
				var table;
				var p = sItems[i].parentNode;
				while(p.className !== "sortable-table")
					p = p.parentNode;
					//此处应有处理异常的语句
				tr = p.getElementsByTagName("tr");
				var j = 0;
				while(j<tr.length - 1){
					var k = 0;
					while(k<tr.length-1-j){
						var curVal = parseInt(tr[k].childNodes[i_th].innerHTML);
						var nextVal = parseInt(tr[k+1].childNodes[i_th].innerHTML);

						var order = (flags[i] == 0 ? curVal - nextVal : nextVal - curVal);
						if(order<0)
							switchNodes(tr[k],tr[k+1]);
						k++;
					}
					j++;
				}
			};
		})();
	}	
	function indexOf(list,item){
		for(var n=0;n<list.length;n++){
			if(list[n] === item)
				return n;
		}
		return -1;
	}
	function switchNodes(node1,node2){
		var p1 = node1.parentNode;
		var p2 = node2.parentNode;
		var brother = node2.nextSibling;
		var n_th = indexOf(p2.childNodes,node2);

		p1.replaceChild(node2,node1);
		if(n_th === node2.parentNode.length)
			p2.appendChild(node1);
		else
			p2.insertBefore(node1,brother);

	}
}
window.onload = function(){
	initSortableTable();
}