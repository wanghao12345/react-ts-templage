### 一、初始化项目结构

- 创建项目目录

```javascript
mkdir react-ts-template
cd react-ts-template
```

- 初始化项目，填写项目信息

```javascript
yarn init -y 或者 npm init -y
```

### 二、安装webpack

```javascript
yarn add webpack -D 或者 npm i webpack -D
yarn add webpack-cli -D 或者 npm i webpack-cli -D
```

- 安装完毕后在根目录新建build文件夹，并新建一个webpack.common.js文件，用来存放webpack的公共配置

```javascript
mkdir build
cd build
touch webapck.common.js
```

- 然后在webpack.common.js中简单的配置入口(entry)跟输出(output)。

```javascript
const path = require('path');
module.exports={
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  }
}
```

- 修改package.json，增加scripts命令

```json
{
  "name": "react-ts-template",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack --config build/webpack.common.js"
  },
  "devDependencies": {
    "webpack": "^5.0.0",
    "webpack-cli": "^4.0.0"
  }
}

```

- 创建src目录，并创建index.js文件，写入内容

```javascript
console.log('Hello World!')
```

运行yarn build，会生成一个dist文件夹，打包成功

此时的项目结构如下：

```
react-ts-template
	-- build
		-- webpack.common.js
	-- dist
	-- src
		-- index.js
	-- package.json
```

### 三、安装Babel

- 安装babel相关的依赖

```javascript
yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```

- 根目录新建babel.config.js

```javascript
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: []
}
```

- 修改webpack.common.js，增加js文件的loader配置

```javascript
const path = require('path')

module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            inclue: path.join(__dirname, '../src')
        }]
    }
}

```

此时的项目结构如下：

```
react-ts-template
	-- build
		-- webpack.common.js
	-- dist
	-- src
		-- index.js
	-- package.json
	-- babel.config.js
```

### 四、引入React

- 安装所需依赖

```javascript
yarn add react react-dom
```

- 修改 src/index.js 中的内容

```javascript
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(<div>Hello React!</div>, document.getElementById('root'));
```

- 然后在根目录下新建一个public文件夹，并在里面新建一个index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React-TS-Tempalte</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

- 想要 webpack 能以这个html为模板，还需要一个`html-webpack-plugin`插件，安装它`yarn add html-webpack-plugin -D`并在webpack.common.js中增加如下配置，这也是用到的第一个插件：

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, '../src')
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        })
    ]
}

```

打包后打开dist下的index.html看看效果，成功地展示了Hello React。

此时的项目结构如下：

```
react-ts-template
	-- build
		-- webpack.common.js
	-- dist
	-- public
		-- index.html
	-- src
		-- index.js
	-- package.json
	-- babel.config.js
```

### 五、引入webpack-dev-server

```javascript
yarn add webpack-dev-server -D
```

修改webpack.common.js，增加webpack-dev-server的配置。

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, '../src')
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        })
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        overlay: {
            errors: true
        },
        inline: true,
        hot: true,
        open: true
    }
}

```

接下来需要在package.json中增加一个script

```json
{
  "name": "react-ts-template",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "webpack-dev-server --config build/webpack.common.js",
    "build": "webpack --config build/webpack.common.js"
  },
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^4.44.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  },
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
}

```

运行：

```javascript
yarn start
```

项目就跑起来了！！！！！

### 六、引入Typescript

```javascript
yarn add typescript @types/react @types/react-dom -D
```

接下来需要把之前的 js、jsx 文件替换成对应的 ts、tsx，同时还需要对应的loader，可以使用 `ts-loader` 以及之前安装过的 `babel-loader`，这里使用之前安装的 `babel-loader`  以及修改 webpack 的入口配置：

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            use: [{
                loader: 'babel-loader'
            }],
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        })
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        overlay: {
            errors: true
        },
        inline: true,
        hot: true,
        open: true
    }
}

```

不要忘记把src下的index.js改成index.tsx

配置tsconfig.json，这个文件也是使用ts时很关键的一个文件，下面是官网的推荐配置。

```json
{
    "compilerOptions": {
      /* Basic Options */
      "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
      "module": "esnext",                       /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
      "lib": [
        "dom",
        "dom.iterable",
        "esnext"
      ],                                        /* Specify library files to be included in the compilation. */
      "allowJs": true,                          /* Allow javascript files to be compiled. */
      "jsx": "react",                           /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
      "sourceMap": true,                        /* Generates corresponding '.map' file. */
      "outDir": "./dist",                       /* Redirect output structure to the directory. */
      "isolatedModules": true,                  /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
      "resolveJsonModule": true,
      "forceConsistentCasingInFileNames": true,
      "skipLibCheck": true,
      "strict": true,                           /* Enable all strict type-checking options. */
      "noImplicitThis": true,                   /* Raise error on 'this' expressions with an implied 'any' type. */
      "noImplicitReturns": true,                /* Report error when not all code paths in function return a value. */
      "moduleResolution": "node",               /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
      "baseUrl": ".",                       /* Base directory to resolve non-absolute module names. */
      "paths": {},                                        /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
      "allowSyntheticDefaultImports": true,     /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
      "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
      "experimentalDecorators": true,           /* Enables experimental support for ES7 decorators. */
    },
    "include": [
      "src"
    ],
    "exclude": [
      "node_modules"
    ]
  }
```

### 七、CSS配置

这里我们需要用到 `style-loader`、`css-loader`,先安装它们

- css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能；
- style-loader将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

```javascript
yarn add style-loader css-loader -D
```

然后在webpack.common.js中添加相应的规则，接着在webpack.common.js中配置resolve.extensions，来自动解析确定的扩展。

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            use: [{
                loader: 'babel-loader'
            }],
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }, { 
            test: /\.css$/,
            use: [
             		// 注意loader生效是从下往上的
                'style-loader',
                'css-loader'
            ],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        overlay: {
            errors: true
        },
        inline: true,
        hot: true,
        open: false
    }
}
```

在根目录下新建一个index.css，以及App.tsx，并在index.tsx中引入它们

```css
// index.css
.app {
    background-color: red;
}
```

```react
// App.tsx
import * as React from 'react'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        Hello React
      </div>
    )
  }
}
export default App
```

```react
// index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
```

启动后便可以看到设置的红色背景

此时的目录结构如下：

```
react-ts-template
	-- build
		-- webpack.common.js
	-- dist
	-- public
		-- index.html
	-- src
		-- index.css
		-- index.tsx
		-- App.tsx
	-- package.json
	-- tsconfig.json
	-- babel.config.js
```

### 八、加入sass

```javascript
yarn add sass-loader node-sass -D
```

安装完成后在webpack.common.js中加入 .scss 文件的规则

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            use: [{
                loader: 'babel-loader'
            }],
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ],
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        overlay: {
            errors: true
        },
        inline: true,
        hot: true,
        open: false
    }
}
```

接下来我们把根目录下的index.css改成index.scss，不要忘记index.tsx中引入的文件后缀也要修改，项目启动后发现可以成功解析scss文件。

既然已经可以使用sass进行更加简便的css代码编写，那么我们也可以将常用的一些样式代码和sass变量写入公共文件中，当使用的时候就可以直接引入使用。

在src目录下新建styles文件夹，然后新建一个var.scss文件用于存放样式变量。 之后在var.scss文件里写入一个颜色变量和一个样式然后在刚才的index.scss文件中引入它。

```scss
// src/styles/var.scss

$red: red;
@mixin ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```scss
// src/index.scss

@import './styles/var.scss';
.app{  
  background: $red;
  .aps {
    width: 50px;
    @include ellipsis;
  }
}
```































