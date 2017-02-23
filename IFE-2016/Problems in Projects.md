# Problems in Projects

> IFE项目中的疑难杂症及其解答。@Yao

- setTimeout需要用clk+=step的样式来保证执行的顺序，而非都用clk，则同时执行。
- 若为父元素和子元素都设置了onclick，则在点击子元素时，父元素的处理函数会在子元素之后执行（大概是因为click的区域既属于子元素也属于父元素，只不过子元素在顶层，但这只能决定onclick的调用顺序），为了避免这样情况的发生，可以使用`stopPropagation`函数来**阻止事件的继续传播**（多级触发的条件目前尚不明确）。
- cloneNode()有可选参数，true为深度克隆，会克隆子节点，false不会克隆子节点（默认）。
- getBoundingRect()、window.pageXOffset、window.pageYOffset、onscroll事件（MDN是个好东西）。
- 下拉列表的修改/创建（`select`+`option`）可以通过在js中对[Select对象](http://www.w3schools.com/jsref/dom_obj_select.asp)的操作来实现。
- 在给`button`设置border的颜色为transparent时，必须要设置button的背景色为transparent（此处似有大坑）。
- date.getFullYear() == date.getYear() + 1900; //在2000年以前，可用97代表1997年。
- Date对象中，“Date”表示“几号”，“Day”表示“周几”，注意Month是从0~11，Day是从0~6（0代表周日）。
- Again：通过`getElementsByClassName`得到的`HTMLCollection[]`是**动态的**，而`querySelector`得到的是第一个元素，所以特别注意在增删操作时的写法。