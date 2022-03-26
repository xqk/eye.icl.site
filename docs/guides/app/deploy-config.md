---
id: deploy-config
slug: /deploy-config
title: 发布配置
---

## 介绍
配置指定应用在某环境下如何执行发布，发布支持两种方式 `常规发布` 和 `自定义发布`。

## 常规发布
由 `eye` 负责应用代码的打包、传输和更新，但提供了各个阶段可自定义的钩子。

:::info 说明
常规发布参考了开源项目 [瓦力](https://github.com/meolu/walle-web) 的一些设计思路，在此感谢。
如果你使用过 `瓦力` 的发布，可以直接迁移至常规发布。
:::

### 配置项
- ***发布环境*** 为哪个环境创建的发布配置，例如：测试环境 / 生产环境等。
- ***Git仓库地址*** 该应用的 Git 仓库地址（请确保部署运维平台的服务器有权限通过给定的地址克隆仓库）。
- ***发布审核*** 开启后创建的发布申请单需要审核后才可以进行发布。
- ***目标主机部署路径*** 应用部署的路径，例如：静态网站部署在目标服务器的 `/var/www/html`。
- ***目标主机仓库路径*** 用于存储应用的历史版本，可自定义任意目录，例如：`/data/eye/repos`。
- ***保留历史版本数量*** 即如上边的例子中 `/data/eye/repos` 保留的历史版本数量，超过后早起的版本会自动删除，以节约存储空间。
- ***发布目标主机*** 可以选择一个或多个主机进行发布。
- ***文件过滤*** 可选 `仅包含` 或 `排除` 指定的文件，会从克隆的 Git 仓库的源代码中根据指定的规则过滤出符合条件的文件进行发布。
- ***自定义全局变量*** 可在后边的钩子命令内使用，eye 本身也包含一些内置全局变量，请参考下文。
- ***代码迁出前执行*** 在部署 `eye` 的服务器上运行，可以执行任意自定义命令。
- ***代码迁出后执行*** 在部署 `eye` 的服务器上运行，当前目录为检出后待发布的源代码目录，可执行任意自定义命令。
- ***应用发布前执行*** 在发布的目标主机上运行，当前目录为目标主机上待发布的源代码目录，可执行任意自定义命令。
- ***应用发布后执行*** 在发布的目标主机上运行，当前目录为已发布的应用目录，可执行任意自定义命令。

:::tip 提示
[使用 `nohup` 或 `&` 启动后台进程页面一直在转圈不会结束？](/docs/use-problem#nohup)
:::

## 自定义发布
该发布模式下 eye 仅负责按顺序依次执行记录的动作。

### 配置项
- ***发布环境*** 为哪个环境创建的发布配置，例如：测试环境 / 生产环境等。
- ***发布审核*** 开启后创建的发布申请单需要审核后才可以进行发布。
- ***发布目标主机*** 可以选择一个或多个主机进行发布。
- ***本地执行动作*** 可以添加多个执行动作，执行对象为部署运维平台的服务器，会优先按顺序执行本地动作。
- ***目标主机执行动作*** 可以添加多个执行动作，执行对象为发布的目标主机，按顺序依次执行。
- ***数据传输动作*** 用于文件分发传输，用法详见下文。（v2.3.7新增）

:::tip 提示
[使用 `nohup` 或 `&` 启动后台进程页面一直在转圈不会结束？](/docs/use-problem#nohup)
:::

### 数据传输 {#transfer}
从 `v2.3.7` 版本开始已支持添加数据传输动作，用于把文件从部署 `eye` 的容器或主机传输至目标主机，其页面展示效果如下：
![about](https://cdn.icl.site/v2/deploy-config-transfer.png)
- **数据来源** 数据来源可以选择以下两种
    - 本地路径：位于部署 eye 的容器或主机上，路径可以是文件或目录，请输入绝对路径。
    - 发布时上传：在创建发布申请时上传数据。
- **过滤规则** 仅在数据来源选择本地路径时有效，可以设置`包含` 和 `排除`两种规则，内容为基于本地路径的相对路径，多个路径使用英文逗号分割，当传输对象为文件时过滤规则将会被忽略。
- **目标路径** 如果数据来源为发布时上传，则目标路径必须为一个文件路径（例如：`/tmp/upload.tar.gz`）, 如果数据来源为本地路径则请保持目标路径与本地路径的类型一致，如本地路径为文件则目标路径也必须为文件，可参考以下例子

当数据来源为发布时上传，需要注意以下事项：

:::caution 注意
1. 目标路径必须为文件路径，例如：`/data/upload.jar`，大部分情况下还需要其他后续动作去处理上传的文件。
2. 上级目录必须已存在，如上例子则 `/data` 必须为目标主机上已存在的目录。
3. 每次执行该数据传输动作时将会覆盖已存在的文件。
:::

下面以 [eye](https://github.com/xqk/eye) 开源项目的源代码作为例子来说明当数据来源为本地路径时几种典型情况，假设源代码位于 `/data/eye` 目录下。

- **本地路径：`/data/eye`，目标路径：`/www/eye`，文件过滤：`关闭`**

  :::info 说明 
  将会把部署 eye 的容器或主机上的 `/data/eye` 目录完整传输至目标主机的 `/www/eye` 目录，特别注意，如果目标主机的 `/www/eye` 已存在，将会先执行删除操作。
  :::

- **本地路径：`/data/eye`，目标路径：`/www/eye`，文件过滤：`包含` `eye_api,eye_web/dist`**

  :::info 说明
  仅把 `/data/eye` 目录下的 `eye_api` 和 `eye_web/dist` 传输至目标主机，传输完成后目录主机的 `/www/eye` 中仅包含上述两个目录，文件
  过滤中的 `排除` 用法与 `包含` 类似，但只传输除了指定路径以外的其他文件。
  :::

- **本地路径：`/data/eye/README.md`，目标路径：`/www/eye/README.md`, 文件过滤：`包含` `eye_api`**

  :::info 说明
  仅把 `README.md` 传输至目标主机，因为传输对象为文件，所以文件过滤规则将会被忽略。
  :::

- **本地路径：`/data/eye/README.md`, 目标路径：`/www/eye`，文件过滤：`关闭`**

  :::info 说明
  传输 `README.md` 至目标主机，删除并替换 `/www/eye`，特别注意，传输完成后目标主机的 `/www/eye` 将变更为一个文件，内容为 `README.md` 
  文件的内容。这个是一个反例，如果你要传输的是文件，请保持目标路径也是一个完整的文件路径。
  :::

- **本地路径：`/data/eye`, 目标路径：`/www/eye/README.md`，文件过滤：`关闭`**

  :::info 说明
  将传输整个 `/data/eye` 目录至目标主机并将其命名为 `README.md`，特别注意，传输完成后目标主机的 `/www/eye/README.md` 将变更为一个目录。
  这个是一个反面例子，如果你要传输的是目录，请保持目标路径也是一个完整的目录路径。
  :::


## 全局变量 {#global-env}
- `eye_APP_NAME` 发布应用的名称
- `eye_APP_KEY` 发布应用的标识符
- `eye_APP_ID` 发布应用的 ID
- `eye_REQUEST_ID` 发布申请单 ID
- `eye_REQUEST_NAME` 发布申请单的名称
- `eye_VERSION` 发布申请版本
- `eye_BUILD_VERSION` 发布申请内部版本号（v3.0.5新增）
- `eye_ENV_ID` 发布环境 ID
- `eye_ENV_KEY` 发布环境的标识符
- `eye_DEPLOY_ID` 发布配置 ID（v2.2.3新增）
- `eye_DEPLOY_TYPE` 发布类型（"1" 为正常发布，"2" 为回滚）
- `eye_API_TOKEN` 访问配置中心获取配置的 `API_TOKEN`
- `eye_HOST_ID` 当前执行主机的 ID（v2.2.3新增，仅在主机执行阶段有效）
- `eye_HOST_NAME` 当前执行主机的 IP /域名（v2.2.3新增，仅在主机执行阶段有效）

**常规发布有效**

- `eye_REPOS_DIR` 常规发布源码存储目录（v2.3.4新增，`$eye_REPOS_DIR/$eye_DEPLOY_ID` 即为本次发布应用的源码目录）
- `eye_DST_DIR` 常规发布目标主机部署路径（v2.3.8新增）
- `eye_GIT_BRANCH` 本次发布选择的 Git 分支（v2.3.2新增，常规发布基于分支时有效）
- `eye_GIT_COMMIT_ID` 本次发布选择的Git Commit ID（v2.3.2新增，常规发布基于分支时有效）
- `eye_GIT_TAG` 本次发布的Git Tag（v2.3.2新增，常规发布基于 Tag 时有效）

**自定义发布有效**

- `eye_RELEASE` 新建自定义发布申请填写的 `eye_RELEASE` 值（自定义发布有效）

  :::tip 提示
  eye_RELEASE 会自动按空格分隔解析为多个环境变量，例如 abc 123 def，会对应有4个变量：
  ```bash
  eye_RELEASE = abc 123 def
  eye_RELEASE_1 = abc
  eye_RELEASE_2 = 123
  eye_RELEASE_3 = def
  ```
  :::