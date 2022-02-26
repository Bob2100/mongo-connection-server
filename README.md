# learn-mongodb

用于记录 mongodb 的学习

# 入门教程

https://www.runoob.com/mongodb/mongodb-tutorial.html

# 我的 mongodb

安装目录 /usr/local/mongodb  
启动文件 /usr/local/etc/mongod.conf

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
