// function FloatOutDiv(){
// 	this.title = "这是一个浮出层";
// 	this.message = "这是一个浮出层";
// 	this.init = function(){
// 		var floatOutDiv = document.createElement("div");
// 		floatOutDiv.className = "float-out-div";
// 		var fodTitle = document.createElement("div");
// 		fodTitle.className = "fod-title";
// 		fodTitle.innerHTML = this.title;
// 		var fodContainer = document.createElement("div");
// 		fodContainer.className = "fod-container";
// 		fodContainer.innerHTML = this.message;
// 		var fodButtonContainer = document.createElement("div");
// 		fodButtonContainer.className = "fod-button-container";
// 		var confirmButton = document.createElement("button");
// 		var cancelButton = document.createElement("button");
// 		confirmButton.className = "fod-button";
// 		confirmButton.innerHTML = "确定";
// 		cancelButton.className = "fod-button";
// 		cancelButton.innerHTML = "取消";
// 		var mask = document.createElement("div");
// 		mask.className = "mask";

// 		fodButtonContainer.appendChild(confirmButton);
// 		fodButtonContainer.appendChild(cancelButton);
// 		fodContainer.appendChild(fodButtonContainer);
// 		floatOutDiv.appendChild(fodTitle);
// 		floatOutDiv.appendChild(fodContainer);


// 		var body = document.getElementsByTagName("body")[0];
// 		body.insertBefore(floatOutDiv,body.firstChild);
// 		body.insertBefore(mask,body.firstChild);

// 		// 点击浮出层窗口时阻止点击事件扩散，否则会触发mask的点击事件？
// 		floatOutDiv.onclick = function(e){
// 			// e.stopPropagation();
// 		}
// 		// 点击遮挡区域或点击确认/取消则移出浮出层及mask
// 		mask.onclick = function(e){
// 			body.removeChild(body.firstChild);
// 			body.removeChild(body.firstChild);
// 		}
// 		confirmButton.onclick = function(e){
// 			body.removeChild(body.firstChild);
// 			body.removeChild(body.firstChild);			
// 		}
// 		cancelButton.onclick = function(e){
// 			body.removeChild(body.firstChild);
// 			body.removeChild(body.firstChild);			
// 		}
// 	}
// 	this.init();
// }

// 必须是mask -> fod(可以交换) -> create-float-out-div的书写顺序
function initFODs(){
	var body = document.getElementsByTagName("body")[0];
	var fods = document.getElementsByClassName("float-out-div");
	var masks = document.getElementsByClassName("mask");
	var fodButtons = document.getElementsByClassName("fod-button");
	var createFODs = document.getElementsByClassName("create-float-out-div");
	for(var i = 0;i<masks.length;i++){
		// 移动mask和fods到所有内容节点的前面
		// fods[n].parentNode.removeChild(fods[n]);
		// body.insertBefore(masks[n],body.firstChild);
		// masks[n].parentNode.removeChild(masks[n]);
		// body.insertBefore(masks[n],body.firstChild);
		(function(){
			var n = i;
			// 点击遮挡区域使浮出层不可见
			masks[n].onclick = function(e){
				masks[n].style.display = "none";
				fods[n].style.display = "none";
			}
			fodButtons[n].onclick = function(e){
				// 寻找float-out-div
				masks[n].style.display = "none";
				fods[n].style.display = "none";
				// 本来该有若是不是按照结构书写情况的处理方式，偷个懒
			}
			createFODs[n].onclick = function(e){
				masks[n].style.display = "block";
				fods[n].style.display = "block";
			}
		})();
	}
}

window.onload = function(e){
	initFODs();
}