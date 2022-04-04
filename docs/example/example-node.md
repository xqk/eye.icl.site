---
id: example-node
slug: /example-node
title: Node项目配置
---

## 概览
以 `eye` 的前端 `eye_web` 作为例子来说下前端项目的配置，最终大概是这样子的。
:::caution 注意
以下基于 eye v2.3.4 版本，如果低于 v2.3.4 可以参考 [版本升级文档](/docs/update-version/) 进行升级，例子仅作为演示，一般情况下你都需要结合自己的项目情况调整配置。
:::


## 安装 node(npm)
如果已安装可跳过该步骤，这里以目前的最新版 `v12.18.1` 为例，如果你使用 Docker 部署的 `eye`，可参考以下步骤进行安装。

:::caution 注意
以下仅适用于 `2.3.4` 及以后的镜像（基于 `Centos`）启动的容器（这里的 `2.3.4` 并不是 `eye` 的版本号，请在 [hub.docker.com](https://hub.docker.com/r/xiaqiankun/eye/tags) 查询镜像版本）。
:::

```bash
# 进入容器
docker exec -it eye bash
curl -o node-v12.18.1-linux-x64.tar.xz https://nodejs.org/dist/v12.18.1/node-v12.18.1-linux-x64.tar.xz
tar xf node-v12.18.1-linux-x64.tar.xz -C /opt
echo 'export PATH=$PATH:/opt/node-v12.18.1-linux-x64/bin' > /etc/profile.d/node.sh

# 安装yarn，推荐使用yarn来代替npm
source /root/.bashrc
npm install -g yarn

# 退出并重启容器
exit
docker restart eye
```

## 文件过滤
前端项目发布的时候只需要编译后的内容就可以，这里选择了 `包含` 条件，内容为 `eye_web/build`，这样最终发布到目标主机上的代码仅包含
`eye_web/build`，并不会把 `eye_api` 及 `eye_web` 中的前端源代码发布出去。

## 自定义变量
该例子中并不需要特殊的全局变量，如果你需要的话可以在这里定义，然后在下边的钩子中类似 `$eye_DEPLOY_ID` 那样去引用。

## 代码检出前
作为前端项目免不了要处理项目依赖包的问题，依赖安装一般在 `package.json` 所在的目录（在本示例中即`eye_web`）中执行 `npm install`
或 `yarn` 来安装。这里使用了 [全局环境变量](/docs/deploy-config#global-env) 中的
`eye_REPOS_DIR` 和 `eye_DEPLOY_ID` 来切换到源码目录创建公共的 `node_modules` 目录，以后每次发布时都通过软链接的形式使用它来避免每次
发布都需要全量安装依赖包。
```bash
# 创建公共node_modules目录
mkdir -p $eye_REPOS_DIR/$eye_DEPLOY_ID/node_modules
```

## 代码检出后
在这里进行项目的依赖包安装和编译工作，该钩子中当前目录即为按发布申请中选择 `Git 分支/版本` 检出后的代码目录，我们需要先把上一步创建的公共 `node_modules`
目录链接到当前目录（这样可以避免每次都完整的执行`npm install`来重复安装依赖包），然后执行 `yarn build` 来进行项目编译。
```bash
# 创建软链接，指向公共的node_modules,避免每次发布重复安装依赖包
cd eye_web
ln -s $eye_REPOS_DIR/$eye_DEPLOY_ID/node_modules .
# 执行依赖安装
yarn
# 执行 编译
yarn build
```
编译后也就生成了我们在 **文件过滤** 中设置的 `eye_web/build` 目录。

## 应用发布前
由于我们设置的文件过滤规则 `eye_web/build`，所以传输到目标主机上文件结构也是 `eye_web/build/xx`，我们需要调整下目录结构，
让 `eye_web/build` 目录下内容放到项目的根目录中。
```bash
# 调整目录结构，把编译结果放在项目根目录
mv eye_web/build/* .
rm -rf eye_web
```

## 应用发布后
前端项目编译后就是纯静态的 `html`、`js` 和一些静态文件，这里一般就不需要额外的处理了。

