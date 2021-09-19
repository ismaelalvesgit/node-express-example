pipeline {
    agent any

    environment {
        DB_USERNAME = "root"
        DB_PASSWORD = "root"
        DB_DATABASE = "test_example"
        DB_PORT=3003
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
                
                stage ('unit') {
                    steps {
                        sh 'docker run --name jenkins-mysql -e MYSQL_ROOT_PASSWORD=${DB_PASSWORD} MYSQL_DATABASE=${DB_DATABASE} -p ${DB_PORT}:3306 -d'
                        sh 'npm run test:unit'
                    }

                    post {
                        always {
                            sh 'docker rm -f jenkins-mysql'
                        }
                    }
                }
            }
        }
    }
}