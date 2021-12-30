import hudson.model.*;
// 参考资料：
// https://medium.com/@MichaKutz/conditionals-in-a-declarative-pipeline-jenkinsfile-d1a4a44e93bb#
// https://stackoverflow.com/questions/40022313/how-to-display-the-time-it-took-to-run-a-build-in-jenkins
// https://stackoverflow.com/questions/24226862/how-to-get-build-time-stamp-from-jenkins-build-variables

// 定义变量
def url = 'https://oapi.dingtalk.com/robot/send?access_token=ca422b6dc6681969f26b451e0535dbf394f0534a4fca02ddb8002021c500d694'
def header = 'Content-Type: application/json'
def message = '{"msgtype": "markdown","markdown": {"title": "Build %s", "text":"Build %s"}}'
def status = 'success'
def startDate = new Date()
def dbname = "log"
def dbusername = env.dbusername
def dbpssword = env.dbpassword

// 设置工作流
pipeline {

    // 设置agent为any，使用宿主机环境
    agent any

    // 定义构造的步骤
    stages {
        stage('project build') {
            // 并行步骤
            parallel {
                // 构造前台应用
                stage('Angular') {
                    agent { label 'nodejs'}  
                    steps {
                        // sh "npm config set registry https://registry.npm.taobao.org"
                        dir("${env.WORKSPACE}/finalWebApp") {
                        	sh """
  								export NVM_DIR="$HOME/.nvm"
  									[ -s "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh" ] && . "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh"  # This loads nvm
  									[ -s "/home/linuxbrew/.linuxbrew/opt/nvm/etc/bash_completion.d/nvm" ] && . "/home/linuxbrew/.linuxbrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
  								nvm use 12.18.4
  								node -v
  								npm -v
                                rm package-lock.json
  								npm install
  								node_modules/@angular/cli/bin/ng --version
                                node_modules/@angular/cli/bin/ng lint
                            	node_modules/@angular/cli/bin/ng test --watch=false --browsers=ChromeHeadless --sourceMap=false
                            	node_modules/@angular/cli/bin/ng build
                        	"""
                        }
                        // 清空目录
                        deleteDir()
                    }
                }
                // 构造后台应用
                stage('Spring') {
                    agent { label 'master'}  
                    steps {
                        dir("${env.WORKSPACE}/api") {
                            sh "mvn install"
                        }
                        // 清空目录
                        deleteDir()
                    }
                }
            }
        }
    }
    // 在steps执行后执行
    post {
        // 失败后执行     
        failure {
            echo 'failure'
            script {
                status = 'failure'
            }
        }        

        // 终止时执行
        aborted {
            echo 'aborted'
            script {
                status = 'aborted'
            }
        }
        
        // 最后执行，清空目录并根据结果发送钉钉通知 
        cleanup {
            deleteDir()
            echo sh(script: 'env|sort', returnStdout: true)
            script {
                def buildTime = Calendar.instance
                buildTime.clear()
                buildTime.set(Calendar.SECOND, (int)(((new Date()).getTime() - startDate.getTime()) / 1000))
                def content = "[${env.JOB_NAME}](${env.RUN_DISPLAY_URL}) of [${env.CHANGE_TITLE}](${env.CHANGE_URL}) test %s by ${env.CHANGE_AUTHOR} in ${buildTime.format('m')} min ${buildTime.format('s')} sec"
                content = String.format(content, status);
                message = String.format(message, status, content); 
                sh "curl ${url} -H '${header}' -d '${message}'"  
            }
        }
    }
}
