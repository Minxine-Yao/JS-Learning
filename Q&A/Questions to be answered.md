# Questions to be answered

> 记录在码代码/读书/读文档等所有前端学习过程中产生的**不紧急但值得深追或很有意思**的问题。由于探索这些问题往往会花费过多的时间，以致于扰乱学习的节奏和进程，故记录之，留待每个周末再进行探索。@Yao

## SEU-2016-17-3

### Week 1

- [ ] JS中精确掌控时间的方式 or 如何准确控制`requestAnimationFrame()`的时间？

- [ ] 使用DOM2级API操作样式表的意义（与直接修改Element的样式相比）？


- [ ] outline的width是否包含在offsetWidth中？


- [ ] 如何在控制台中使用js代码触发某个元素的点击事件？


### Week 4

- [ ] 在IE中使用`transition`来实现动画时，长度单位最好统一，否则会有莫名其妙的效果，例如应当从0%$\to$100%，或者0px$\to$50px，在实际项目中`width`从0$\to$100%、50%$\to$0都会有问题（在Chrome中无问题），给0添加百分号之后效果一致。

### Week7

- [ ] 在新建WebSocket的参数host中，`ws:+`的写法在Chrome、FireFox等浏览器中可以正常使用，而在IE中则必须采用`ws://`的写法，否则代码会卡在此处无法寸进。