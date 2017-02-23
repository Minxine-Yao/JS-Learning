var curDate = [];
var curMonth = [];
var curYear = [];
var focusDate = [];

var tempSelect = false;
var tempSelectBegin;
var tempSelectEnd;

window.onload = function(){
	var calendarList = document.getElementsByClassName("calendar");
	curDate.length = calendarList.length;
	curMonth.length = calendarList.length;
	curYear.length = calendarList.length;
	focusDate.length = calendarList.length;
	for(var n = 0 ; n < calendarList.length ; n++){
		(function(){
			var i = n;
			var calendar =  calendarList[i];
			initCalendar(calendar,i);
		})()
	}
}

function initCalendar(calendar,i){
	// 初始化日月年
	var today = new Date();
	curDate[i] = today.getDate();
	curMonth[i] = today.getMonth()+1;
	curYear[i] = today.getFullYear();
	// 日期icon
	var icon = document.createElement("img");
	icon.src = "img/日历.png";
	icon.className = "calendar-icon";
	icon.onclick = function(){
		var displayPart = document.getElementsByClassName("calendar-display")[i];
		displayPart.style.display = (displayPart.style.display === "none" || displayPart.style.display === "") ? "block" : "none";
	}
	var showDate = document.createElement("input");
	showDate.setAttribute("type", "text");
	showDate.setAttribute("readonly", "readonly");
	// showDate.type = "text";
	// showDate.readonly = "readonly";
	showDate.value = curYear[i]+"/"+curMonth[i]+"/"+curDate[i];
	// 
	// 切换到上个月按钮
	var lastMonthBtn = document.createElement("button");
	lastMonthBtn.className = "calendar-last-month";
	lastMonthBtn.onclick = function(){
		var monthSelect = document.getElementsByClassName("calendar-month")[i];
		curMonth[i]--;
		if(curMonth[i] === 0){
			curMonth[i] = 12;
			monthSelect.selectedIndex = 11;
			var yearSelect = document.getElementsByClassName("calendar-year")[i]; 
			yearSelect.selectedIndex = yearSelect.selectedIndex===0 ? yearSelect.length-1 : yearSelect.selectedIndex - 1;
			curYear[i] = yearSelect.options[yearSelect.selectedIndex].value;
		}else{
			monthSelect.selectedIndex--;
		}
		var newDate = new Date(curYear[i],curMonth[i] - 1,curDate[i]);
		updateCalendar(newDate,i);
	}
	// 切换到下个月按钮
	var nextMonthBtn = document.createElement("button");
	nextMonthBtn.className = "calendar-next-month";
	nextMonthBtn.onclick = function(){
		var monthSelect = document.getElementsByClassName("calendar-month")[i];
		curMonth[i]++;
		if(curMonth[i] === 13){
			curMonth[i] = 1;
			monthSelect.selectedIndex = 0;
			var yearSelect = document.getElementsByClassName("calendar-year")[i]; 
			yearSelect.selectedIndex = yearSelect.selectedIndex===yearSelect.length-1 ? 0 : yearSelect.selectedIndex+1;
			curYear[i] = yearSelect.options[yearSelect.selectedIndex].value;
		}else{
			monthSelect.selectedIndex++;
		}
		var newDate = new Date(curYear[i],curMonth[i] - 1,curDate[i]);
		updateCalendar(newDate,i);
	}
	// 月份选择下拉列表
	var monthSelect = document.createElement("select");
	monthSelect.className = "calendar-month"
	for(var n=0;n<12;n++){
		var tempOpt = document.createElement("option");
		tempOpt.value = n+1;
		tempOpt.text = n+1;
		if(n+1 === curMonth[i])
			tempOpt.selected = true; //默认呈现当前月份
		monthSelect.add(tempOpt,null);
	}
	monthSelect.onchange = function(){
		curMonth[i] = monthSelect.selectedIndex + 1;
		updateCalendar(new Date(curYear[i],curMonth[i] - 1,curDate[i]),i);
	}
	// 年份选择下拉列表
	var yearSelect = document.createElement("select");
	yearSelect.className =  "calendar-year";
	for(var n=1997;n<=2017;n++){
		var tempOpt = document.createElement("option");
		tempOpt.value = n;
		tempOpt.text = n;
		if(n === curYear[i])
			tempOpt.selected = true; //默认呈现当前年份
		yearSelect.add(tempOpt,null);
	}
	yearSelect.onchange = function(){
		curYear[i] = yearSelect.options[yearSelect.selectedIndex].value;
		updateCalendar(new Date(curYear[i],curMonth[i] - 1,curDate[i]),i); 
	}
	// 日期
	var dateTable = createDateTable(today,i); 
	// 加入各部分到日历中
	var selectionPart = document.createElement("div");
	selectionPart.className = "calendar-selection-line";
	selectionPart.appendChild(icon);
	selectionPart.appendChild(showDate);
	calendar.appendChild(selectionPart);
	var displayPart = document.createElement("div");
	displayPart.className = "calendar-selection";
	displayPart.appendChild(lastMonthBtn);
	displayPart.appendChild(monthSelect);
	displayPart.appendChild(yearSelect);
	displayPart.appendChild(nextMonthBtn);
	var calendarDisplay = document.createElement("div");
	calendarDisplay.className = "calendar-display";
	calendarDisplay.appendChild(displayPart);
	calendarDisplay.appendChild(dateTable);
	calendar.appendChild(calendarDisplay);
}

function createDateTable(date,k){
	var dateTable = document.createElement("table");
	dateTable.className = "calendar-date"; 
	// 第一行，提示星期几
	var headLine = document.createElement("tr");
	headLine.className = "calendar-datetype";
	dateTable.appendChild(headLine);
	var tempTh;
	tempTh = document.createElement("th");
	tempTh.innerHTML = "一";
	headLine.appendChild(tempTh);
	tempTh = document.createElement("th");
	tempTh.innerHTML = "二";
	headLine.appendChild(tempTh);
	tempTh = document.createElement("th");
	tempTh.innerHTML = "三";
	headLine.appendChild(tempTh);
	tempTh = document.createElement("th");
	tempTh.innerHTML = "四";
	headLine.appendChild(tempTh);
	tempTh = document.createElement("th");
	tempTh.innerHTML = "五";
	headLine.appendChild(tempTh);
	tempTh = document.createElement("th");
	tempTh.innerHTML = "六";
	headLine.appendChild(tempTh);
	tempTh = document.createElement("th");
	tempTh.innerHTML = "日";
	headLine.appendChild(tempTh);
	// 后续行
	var tempDate = new Date(date);
	tempDate.setDate(1);
	var firstDay = tempDate.getDay(); //当月一号星期几
	firstDay = firstDay === 0 ? 7 : firstDay;
	var lastDate = 28; //本月最后一天是几号
	tempDate.setDate(29);
	if(tempDate.getMonth() === date.getMonth()){
		lastDate++;
		tempDate.setDate(30);
		if(tempDate.getMonth() === date.getMonth()){
			lastDate++;
			tempDate.setDate(31);
			if(tempDate.getMonth() === date.getMonth()){
				lastDate++;
			}
		}
	}
	var curDate = 1; //临时变量，用于记录当前已创建到几号
	for(var i=1;i<=6;i++){
		var tr = document.createElement("tr");
		for(var j=1;j<=7;j++){
			var td = document.createElement("td");
			tr.appendChild(td);
			if(i===1 && j<firstDay)
				continue;
			if(curDate > lastDate)
				continue;
			td.innerHTML = curDate;
			if(curDate === date.getDate())
				td.className = "calendar-date-today";
			(function(){
				var tempTd = td;
				tempTd.onclick = function(){
					/*本该是从className中把该部分字符串删掉
					 *考虑到此处情况较为简单
					 *假设"calendar-date-selected"始终为类名序列的最后一个
					*/
					if(tempSelect){
						clearBlinkArea();
						tempSelectEnd = parseInt(tempTd.innerHTML);
						tempSelect = false;
						focusDate[k].className - tempTd.className.slice(29); //停止闪烁
						if(tempSelectBegin !== tempSelectEnd){
							renderSelectedArea(tempSelectBegin,tempSelectEnd,k);
						}
					}else{
						clearSelectedArea();
					}
					if(focusDate[k])
						focusDate[k].className = focusDate[k].className.slice(0,-23);
					focusDate[k] = tempTd;
					tempTd.className += " calendar-date-selected";
					document.getElementsByClassName("calendar-selection-line")[k].childNodes[1].value = curYear[k]+"/"+curMonth[k]+"/"+tempTd.innerHTML;
				}
				tempTd.ondblclick = function(){
					tempTd.className = "calendar-date-blink-selected " + tempTd.className;
					tempSelect = true;
					tempSelectBegin = parseInt(tempTd.innerHTML);
				}
			})()
			curDate++;
		}
		dateTable.appendChild(tr);
	}
	return dateTable;
}
function renderSelectedArea(begin,end,k){
	var max = begin>end ? begin : end;
	var min = (begin + end) - max;
	var tds;
	var dateTable = document.getElementsByClassName("calendar")[k].childNodes[1].childNodes[1]; 
	for(var i=1;i<=6;i++){
		var tr = dateTable.childNodes[i];
		for(var j=1;j<=7;j++){
			var td = tr.childNodes[j-1];
			var curNum = parseInt(td.innerHTML);
			if((curNum<max && curNum>min) || curNum === begin)
				td.className = "calendar-date-temp-selected " + td.className;
		}
	}
}
function clearSelectedArea(){
	var selectedTds = document.getElementsByClassName("calendar-date-temp-selected");
	while(selectedTds.length !== 0){
		selectedTds[0].className = selectedTds[0].className.slice(28);
	}
}
function clearBlinkArea(){
	var blinkTds = document.getElementsByClassName("calendar-date-blink-selected");
	while(blinkTds.length !== 0){
		blinkTds[0].className = blinkTds[0].className.slice(28);
	}
}
function updateCalendar(date,i){
	var calendar = document.getElementsByClassName("calendar-display")[i];
	var dateTable = document.getElementsByClassName("calendar-date")[i];
	calendar.removeChild(dateTable);
	dateTable = createDateTable(date,i);
	calendar.appendChild(dateTable);
}