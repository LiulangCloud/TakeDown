### Git配置

安装git后首先要配置“用户名”和“邮箱”,命令如下：

```tex
1 配置用户名
2 git config --global user.name "liulang"
3 配置邮箱
4 git config --global user.email 1152241094@qq.com
```



问题：Please make sure you have the correct access rights and the repository exists.(ssh通信失败)

解决方法：重置SSH密钥

```tex
1 删除C盘用户下的.ssh中的known_hosts文件
2 在Git中输入 ssh-keygen -t rsa -C "邮箱"（一路回车）
3 复制.ssh文件中新生成的id_rsa.pub(公钥)内容
4 在gitHub主页进入设置页面，选择"SSH and GPG keys",点击"New SSH key",填写Title(随意)，Key内容粘贴刚复制的公钥，最后点击添加即可
5 查看主机是否与github网站之间的ssh通信是否连接成功,在Git中输入ssh -T git@github.com，回车输入yes确认，在末尾提示success字眼即连接成功
```

