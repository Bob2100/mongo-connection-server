# node -v

16.14.0

# learn-mongodb

用于记录 mongodb 的学习

# 入门教程

https://www.runoob.com/mongodb/mongodb-tutorial.html 安装 mongo

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

# 安装依赖

npm install

# 运行测试

npm test
