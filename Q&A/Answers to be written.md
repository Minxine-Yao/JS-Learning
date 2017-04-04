# Answers to be written

> 记录在所有前端学习过程中遇见的**立即解决了的但有记录意义**的问题，但由于要完整地记录这些问题的解答会花费过多的时间，以致于扰乱学习的节奏和进程。故记录之，留待每个周末补充完整。@Yao

## SEU-2016-17-3

### Week 1

- [x] console.log(document.querySelector("html") === document.documentElement
- [x] width: 100% !== width: 100vw


- [x] `addEventListener("event",function,useCapture)`[Answer on stackoverflow](http://stackoverflow.com/questions/5657292/why-is-false-used-after-this-simple-addeventlistener-function) 
- [x] `addEventerListern ` and `attachEvent` [Answer on stackoverflow](http://stackoverflow.com/questions/2657182/correct-usage-of-addeventlistener-attachevent) 
- [x] `event.target` and `event.currentTarget` and `this` 

### Week 5

- [x] `offsetTop`不包含使用css中使用`transform:translate(dx,dy)`中的偏移量，而`getBoundingClientRect()`则包含了。
- [x] 在使用`html2canvas`库的时候，务必保证其他代码中没有`Node`类。
- [x] 在使用`html2canvas`库中，内联的svg元素不会渲染到canvas中。