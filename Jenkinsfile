pipeline {
    agent { docker { image 'node:carbo'} }

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
                        sh 'npm test'
                    }

                    post {
                        always {
                            step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml'])
                        }
                    }
                }
            }
        }
    }
}