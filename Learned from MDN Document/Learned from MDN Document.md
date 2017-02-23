# Learned from MDN Document

> 记录读MDN文档的一些收获。@Yao

## JavaScript基础

- `querySelectorAll()`和`getElementsByXX()`的区别：[静态与动态之分](http://www.zhihu.com/question/24702250)。
- `setAttribute()`会创造没有的属性。
- 尽量使用`removeAttribute()`而非`setAttribute('xx',null)`。
- 处于网络安全（反钓鱼网站）的角度考虑，无法修改由`alert``prompt``confirm`弹出窗口的消息。

## 语法和数据类型

- 出现"Let definition are not supported by current JavaScript version"提示：将WebStorm中的默认JavaScript版本设置为ES6高即可（在`Language&Frameworkds`中）
- **Variable hoisting**：let/const 声明的变量不会提升
- `const`对象的属性**可以被修改**
- `Null` and `NULL` are not defined
- ES6新增的[Symbol](http://es6.ruanyifeng.com/#docs/symbol)数据类型，主要用于解决属性名冲突问题
- 注意`'37'-7`和`'37'+7`的区别
- 可以用**单目加法运算符**和**单目减法运算符**将字符串转化为数字
- 在用数组字面量初始化数组时，**会且仅会忽略最后一个逗号**。
- 在合乎JS标识符规则的情况下，可以用字符串本身或者用`double_quote`包裹起来作为属性名字，可以通过点操作符和类数组标记访问。此外只能用`double_quote`包裹起来且只能通过类数组标记访问（如使用问号作为对象的属性名称）。**数字可以直接作为属性名称，但只能通过类数组标记访问**。
- 在Unicode字符后面不需要加空格来配合解析

## 流程控制和错误处理

- `""` `" "` `"  "`等字符串均在判断式中均被识别为false，但是他们**互不相等**
- Unicode转义字符空格被认为是false value
- `finally`部分**始终会执行**并且返回的值是整个`try-catch-finally`流程的返回值(若该部分无返回值，则返回的是`catch`部分的值，显而易见的是，`throw`和`return`语句不可能都执行)
- [Promise对象](http://es6.ruanyifeng.com/#docs/promise)：一种异步编程的解决方案

## 函数

- 只有使用形如`function functionName(){}`的语法形式，才能在函数声明语句之前调用函数。
- 一个闭包必须保存它**可见域**中所有的参数和变量，每一次对外部函数的调用都实际上重新创建了一遍这个闭包。只有当inside的返回值没有再被引用时，内存才会被释放。
- 产生命名冲突时，更近的作用域有更高的优先权。这是因为**作用域链**的第一个元素是最里面的作用域，最后一个元素是最外层的作用域。
- 内嵌函数不会继承外部函数的this值（可用变量保存或者使用[箭头函数](http://www.csdn.net/article/2015-07-08/2825159-es6-in-depth-arrow-functions)）

## 表达式和运算符

- [解构赋值](http://www.csdn.net/article/2015-07-07/2825149-es6-in-depth-destructuring)

> 2016.10.14: 今天调用js写的跑循环的代码调都快崩溃了，因为一直用的是js，所以也算everyday js了吧= =唉，以后再也不用js写这种程序了。\cry

- 使用`var``let``const`声明的变量无法delete，全局变量和使用`const`声明的变量的属性可以
- 对于属性值，`typeof`会返回属性**所包含的值**的类型

## 字符串和文本

- 字符串字面值和字符串对象的不同
- 语法糖，使用反勾号实现字符串的多行和**嵌入表达式**的便捷写法，简直酷

## Indexed Collections

- 如果给数组操作符（方括号）的是一个**非整型数值**，那么将作为一个代表数组的对象的**属性**创建，而非作为数组的元素，可用`hasOwnProperty`来进行验证
- 可以通过对数组的`length`属性进行赋值来对数组进行设置（可用于**清空**）
- 数组的`forEach()`方法配合**箭头函数**和字符串的**潜入表达式**的便捷写法，hack！
- 在数组定义时**省略的**元素不会再forEach遍历时列出，但是**手动赋值为undefined**的元素会被列出
- 可以通过`Array.prototype.XXX.call`或者`[].XXX.call`将数组的方法运用到其它对象
- [ArrayBuffer对象、Type的Array对象、DataView对象](http://javascript.ruanyifeng.com/stdlib/arraybuffer.html)是JS操作**二进制数据**的一个接口。

## Keyed Collections

- 使用**for-of**循环遍历`Map`对象和`Set`对象
- WeakMap相对于普通的Map，也是键值对集合，只不过WeakMap的**key只能是非空对象**（non-null object）。WeakMap对它的key仅保持弱引用，也就是说它不阻止垃圾回收器回收它所引用的key。WeakMap最大的好处是可以**避免内存泄漏**。一个仅被WeakMap作为key而引用的对象，会被垃圾回收器回收掉。
- Set和数组的相互转换（通过构造函数或者[扩展运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)）

## Object

- 对象中未赋值的属性值为undefined，而非null
- JS的对象属性也可以通过**方括号**访问或者设置，对象有时候也被叫做**关联数组**，因为每个属性都有一个用于访问他的字符串值。
- 使用构造函数创建对象
- 使用`for...in...` `Object.keys(obj)` `Obj.getOwnPropertyNames(obj)`遍历数组对象，第一个遍历对象**及其原型链**中所有**可枚举**的属性，第二个返回对象中所有**可枚举**的属性名称数组，第三个返回对象**所有**拥有的属性名称数组
- 可以通过`prototype`属性为该类型的所有对象添加/修改属性
- `getter`和`setter`（相较而言我觉得传统的get和set函数写法看起来更清晰）
- 可以用`delete`删除对象中**非继承而来的属性**

## Details for object model

- 基于原型的语言（如JS）并不存在类和实例的区别，它只有对象。基于原型的语言具有所谓的protorypical object的概念。原型对象可以作为一个模版，新对象可以从中获得原始的属性。任何对象都可以指定其自身的属性，既可以是创建时也可以在运行时创建。而且，任何对象都可以作为另一个对象的原型，从而允许**后者共享前者的属性**。
- JS通过将**构造器函数与原型对象相关联**的方式来实现继承(`Object.create()`方法是选择一个**对象**作为即将生成对象的原型对象)。