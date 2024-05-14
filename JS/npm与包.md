### 1.包分类

**项目包**

node_modules目录中的包都为项目包

项目包分为两类：

- 开发依赖包（被记录到devDependencies节点中的包，只在开发期间会使用）

- 核心依赖包（被记录到dependencies节点中的包，在开发期间和项目上线之后都会用到）

  

```tex
1 npm i 包名 -D #开发依赖包(会记录到devDependencies节点下)
2 npm i 包名 #核心依赖包(会被记录到dependencies节点下)
```

**全局包**

在执行npm install 命令时，如果提供了-g参数，则会把包安装为全局包

```tex
1 npm i 包名 -g #全局安装指定包
2 npm uninstall 包名 -g #卸载全局安装的包
```

### 2.生成package.json文件

```tex
npm init -y
```

文件中必须包含name, version, main这三个属性，分别代表包的名称 、版本号 、 入口.

