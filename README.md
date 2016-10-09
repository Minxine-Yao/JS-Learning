# JS-Learning

> 正在从MDN读文档...记录一些学习心得和源代码

---

## JavaScript基础
* `querySelectorAll()`和`getElementsByXX()`的区别：[静态与动态之分](http://www.zhihu.com/question/24702250)。
* `setAttribute()`会创造没有的属性。
* 尽量使用`removeAttribute()`而非`setAttribute('xx',null)`。
* 处于网络安全（反钓鱼网站）的角度考虑，无法修改由`alert``prompt``confirm`弹出窗口的消息。

## 语法和数据类型
* 出现"Let definition are not supported by current JavaScript version"提示：将WebStorm中的默认JavaScript版本设置为ES6高即可（在`Language&Frameworkds`中）
* **Variable hoisting**：let/const 声明的变量不会提升
* `const`对象的属性**可以被修改**
* `Null` and `NULL` are not defined
* ES6新增的[Symbol](http://es6.ruanyifeng.com/#docs/symbol)数据类型，主要用于解决属性名冲突问题
* 注意`'37'-7`和`'37'+7`的区别
* 可以用**单目加法运算符**和**单目减法运算符**将字符串转化为数字
