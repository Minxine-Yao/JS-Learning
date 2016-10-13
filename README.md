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
* 在用数组字面量初始化数组时，**会且仅会忽略最后一个逗号**。
* 在合乎JS标识符规则的情况下，可以用字符串本身或者用`double_quote`包裹起来作为属性名字，可以通过点操作符和类数组标记访问。此外只能用`double_quote`包裹起来且只能通过类数组标记访问（如使用问号作为对象的属性名称）。**数字可以直接作为属性名称，但只能通过类数组标记访问**。
* 在Unicode字符后面不需要加空格来配合解析

## 流程控制和错误处理
* `""` `" "` `"  "`等字符串均在判断式中均被识别为false，但是他们**互不相等**
* Unicode转义字符空格被认为是false value
* `finally`部分**始终会执行**并且返回的值是整个`try-catch-finally`流程的返回值(若该部分无返回值，则返回的是`catch`部分的值，显而易见的是，`throw`和`return`语句不可能都执行)
* [Promise对象](http://es6.ruanyifeng.com/#docs/promise)：一种异步编程的解决方案

## 函数
* 只有使用形如`function functionName(){}`的语法形式，才能在函数声明语句之前调用函数。