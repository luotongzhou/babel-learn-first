# babel-learn-first
Learn how to use babel with verison > 7.4

### 什么是babel 
Babel 是一个 JavaScript 编译器

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
- 源码转换 (codemods)
- 更多！
> [引用自官网](https://www.babeljs.cn/docs/)
### 创建初始代码
 1.`npm init -y`生成`package.json`文件
 2.创建`src/index.js`文件，并输入以下代码
  ```
    const fn = () => {
	    console.log('a')
    }
  ```
> 
> 默认使用npm i -D 安装
> 

### 安装@babel/core
必须安装，不安装babel无法编译，要不然怎么叫core呢？

### 安装@babel/cli
命令行工具，在项目中编译,`package.json`中添加
```
"scripts": {
    "compiler": "babel src --out-dir lib --watch"
}
```
就可以使用`npm run compiler`来编译我们的代码了

### 插件plugins
Babel 虽然开箱即用，但是什么动作都不做。它基本上类似于 const babel = code => code; ，将代码解析之后再输出同样的代码。如果想要 Babel 做一些实际的工作，就需要为其添加插件

插件分为两种：语法插件和转换插件
- 语法插件只对对应语法做解析，而非转换
- 转换插件会对对应语法做转换，会启动相对应的语法插件,所以不需要同时指定两种插件

##### 使用
根目录新建`.babelrc`文件
如果插件再 npm 上，你可以输入插件的名称，babel 会自动检查它是否已经被安装到 node_modules 目录下
```
记得先安装这个插件
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```
现在通过`npm run compiler`命令，查看`lib/index.js`文件内容,我们的代码已经被转化
```
const fn = function () {
  console.log('a');
};
```
在`index.js`添加代码
```
const list = [1,2,3]
for(let i of list) {
  console.log(i)
}
```
安装`@babel/plugin-transform-for-of`,并添加到`.babelrc`的`plugins`中运行`npm run compiler`
```
const list = [1, 2, 3];

for (var _i = 0, _list = list; _i < _list.length; _i++) {
  let i = _list[_i];
  console.log(i);
}
```
可以看到`for of`语法也被转换了，但是如果要支持更多的语法，一个一个安装添加插件是不是太麻烦了?所有我们可以用
`preset`(预设)

### 预设preset
通过使用或创建一个 preset 即可轻松使用一组插件

官方提供的Preset
- @babel/preset-env
- @babel/preset-flow
- @babel/preset-react
- @babel/preset-typescript

我们安装`@babel/preset-env`,在`.babelrc`中添加
```
//.babelrc
{
    "presets": ["@babel/preset-env"]
}
```
`preset-env`是ES语法插件的合集，官方已经不再推荐使用preset-201x之类的包，该包可以通过配置自动兼容代码，包括自动引入polyfill垫片处理新的API（例如：Promise,Generator,Symbol等）以及 实例方法（例如Array.prototype.includes等）
`@babel/preset-env` 会根据你配置的目标环境，生成插件列表来编译,我们新建`.browserslistrc`文件指定我们的目标环境
```
> 0.25%
not dead
```
运行`npm run compiler`
```
"use strict";

var fn = function fn() {
  console.log('a');
};

var list = [1, 2, 3];

for (var _i = 0, _list = list; _i < _list.length; _i++) {
  var i = _list[_i];
  console.log(i);
}
```
再在index.js里添加代码并编译
```
const isHas = [1,2,3].includes(2)

const result = new Promise((resovle, reject) => {
  resovle('success')
})
```
我们发现`Promise`和`includes`并没有被编译,这是为什么呢？因为语法转换只是将高版本的语法转换成低版本的，但是新的内置函数、实例方法无法转换。这时，就需要使用`polyfill`上场了，顾名思义，`polyfill`的中文意思是垫片，所谓垫片就是垫平不同浏览器或者不同环境下的差异，让新的内置函数、实例方法等在低版本浏览器中也可以使用

### polyfill
> As of Babel 7.4.0, this package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):

官方已经在babel 7.4以后废弃了@babel/polyfill这个包了，所以要使用polyfill得单独安装`core-js`和`regenerator-runtime`,这里也只讨论babel 7.4以后的用法
配合引入垫片polyfill的方式根据`useBuiltIns`的不同可以分为三种，即 `entry`, `usage` 和 `false`
```
{
	"presets": [
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "usage",
				"corejs": 3
			}
		]
	]
}
```
官方推荐使用`"useBuiltIns": "usage"`,`usage`会自动检测代码中用到的功能自动引入模块,`false`只做了语法转换, `entry`根据您browserlistrc引入了浏览器不支持的es扩展包。
如果使用`entry`的方式，必须在入口文件`import 'core-js'`和`import 'regenerator-runtime/runtime'`，而使用`usage`的方式不需要,它会自动帮我们引入需要的包,所以推荐`usage`的方式引入`polyfill`
另外使用`usage`和`entry`必须指定`core-js`的版本,不指定控制台会报错提示我们安装`core-js`,我们指定版本为`3`,默认为`2`,使用`npm install --save core-js@3`安装,因为`core-js@2`版本不会再添加新的特性，所以建议使用`core-js@3`
> When either the usage or entry options are used, @babel-preset-env will add direct references to core-js modules as bare imports (or requires). This means core-js will be resolved relative to the file itself and needs to be accessible.

> Since @babel/polyfill was deprecated in 7.4.0, we recommend directly adding core-js and setting the version via the corejs option.

然后编译,查看`lib/index.js`文件

```
require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

...
```






