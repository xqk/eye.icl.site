---
title: eye主机管理
authors: [zyupo]
tags: [主机管理]
---

:::tip 提示
**eye主机管理** 包含：主机信息同步、主机硬件配置信息自动同步、主机在线终端管理、文件在线上传下载删除等功能。
视频链接：https://www.bilibili.com/video/BV1Fb4y1B7fR/
:::

### 主机分组
在主机管理 / 主机分组 可以鼠标右键创建、重命名、删除分组

![](https://cdn.jsdelivr.net/gh/filess/img17@main/2021/12/12/1639318359803-f42bc19f-ffce-4588-bf30-2b7c684a3f49.png)


### 新建主机
新主机可以通过多种方式添加：
- 1、通过页面表单新建
- 2、通过Excel表格导入
- 3、也可以通过输入阿里云、腾讯云Access密钥Key同步到eye系统里面

eye平台不会在数据库保存目标主机的账号密码，用户第一次输入账号密码后，后续eye会使用自动生成的密钥对进行主机连接


![](https://cdn.jsdelivr.net/gh/filess/img11@main/2021/12/12/1639318877472-531f2ce1-6d1c-4a14-8be6-c410315608d9.png)

默认eye会自动生成一个新密钥对，然后使用生成的密钥去链接目标主机，你也可以在【 系统管理 / 系统设置 / 密钥设置 】将自己管理机（例如公司的跳板机服务器）的密钥上传到eye系统里面，这样就可以直接通过上传的密钥去添加管理主机

![](https://cdn.jsdelivr.net/gh/filess/img7@main/2021/12/12/1639319152871-6d43a066-586e-412c-835a-33f0e6e165a3.png)

### 主机扩展信息
添加完主机eye会自动获取主机配置，点击主机名称，可以打开主机扩展信息（内存、cpu、硬盘、IP信息）也可以对扩展信息进行编辑


![](https://cdn.jsdelivr.net/gh/filess/img7@main/2021/12/12/1639319771173-442efbfa-93b6-48ce-b339-35a55d4722eb.png)

![](https://cdn.jsdelivr.net/gh/filess/img9@main/2021/12/12/1639319781770-f4b7caf9-3486-4979-af81-3bdb63830f10.png)

### WEB在线终端
主机管理 / Web终端 / 双击要链接的主机后，就可以在线Console管理主机，也可以多次双击主机打开多个窗口

![](https://cdn.jsdelivr.net/gh/filess/img7@main/2021/12/12/1639320124229-9712505a-97a3-4dbb-877b-c00cc86360f1.png)

![](https://cdn.jsdelivr.net/gh/filess/img4@main/2021/12/12/1639320133365-b7cb22b4-6da8-4b54-8a61-e5d034adc62b.png)

### 在线文件管理
打开主机Web终端后，可以在线对主机文件进行在线管理，可以在线上传、下载、删除文件

![](https://cdn.jsdelivr.net/gh/filess/img7@main/2021/12/12/1639320285963-d3fd974e-bb69-44a1-a793-b8c0b844c66f.png)

![](https://cdn.jsdelivr.net/gh/filess/img8@main/2021/12/12/1639320387218-e9ae6844-3d3b-4340-9f00-d51500181b8e.png)


---

更多资讯、视频、欢迎关注公众号“**eye社区**”

![eye社区](https://cdn.icl.site/img/eye-club.jpg)

