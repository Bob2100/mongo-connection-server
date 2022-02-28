<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [learn-mongodb](#learn-mongodb)
- [入门教程](#%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B)
- [我的 mongodb](#%E6%88%91%E7%9A%84-mongodb)
- [添加环境变量](#%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)
- [启动 mongodb](#%E5%90%AF%E5%8A%A8-mongodb)
- [查询是否启动](#%E6%9F%A5%E8%AF%A2%E6%98%AF%E5%90%A6%E5%90%AF%E5%8A%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# node -v

16.14.0

# learn-mongodb

用于记录 mongodb 的学习

# 入门教程

https://www.runoob.com/mongodb/mongodb-tutorial.html

# 我的 mongodb

安装目录 /usr/local/mongodb

启动文件 /usr/local/etc/mongod.conf

dbpath=/usr/local/var/mongodb
logpath=/usr/local/var/log/mongodb/mongo.log
fork=true

# 添加环境变量

~/.bash_profile 中添加  
MONGO_HOME=/usr/local/mongodb
PATH=$PATH:$MONGO_HOME/bin  
export PATH

然后 source ~/.bash_profile 使之生效

# 启动 mongodb

mongod --config /usr/local/etc/mongod.conf

# 查询是否启动

ps aux | grep -v grep | grep mongod
