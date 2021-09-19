pipeline {
    agent any

    environment {
        DB_HOST = "mysql"
        DB_USERNAME = "root"
        DB_PASSWORD = "admin"
        DB_DATABASE = "test_example"
    }

    stages {

        stage('Cloning Git') {
            steps {
                git branch: 'master',
                    credentialsId: 'gogs',
                    url: 'http://gogs:3000/root/example'
                sh "ls -lat"
            }
        }

        stage('Build') {
            steps {
                sh 'npm i'
            }
        }

        stage('Test') {
            parallel {
                stage ('lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                
                stage ('jest') {
                    steps {
                        sh 'npm run test:coverage'
                    }

                    post {
                        always {
                            step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml'])
                        }
                    }
                }
            }
        }

        stage('Deploy Docker') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login --username $USERNAME --password $PASSWORD'
                    sh 'docker build -t ismaelalvesdoc/express-example -t ismaelalvesdoc/express-example:${${node -e "console.log(require('./package.json').version)";}} .'
                    sh 'docker push ismaelalvesdoc/express-example && docker push ismaelalvesdoc/express-example:${${node -e "console.log(require('./package.json').version)";}}'
                }
            }
        }

    }
}