# 日志管理系统

各个子平台，定期将warning error信息上传至日志管理系统。日志管理系统，在接到错误通知后，第二个工作日将信息推送至钉钉中。

# 资源
[ng-alain cli 必看](https://ng-alain.com/cli/generate/zh)

# 认证方式
采用微信消息的认证方式，在平台中，设置APPID,SECRECT，

# 目标
## 第一目标
将日志推送功能，集中至计理管理系统平台中。

## 第二目标
将日志推送功能，做为子模块独立出来，并发布到MAVEN中。在`spring boot`项目中进行引入。并在配置文件中，进行appid, scerect,token的配置。进行完成消息推送模块。