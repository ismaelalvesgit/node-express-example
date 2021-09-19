pipeline {
    agent {
        docker { 
            image 'node:carbon'
        }
    }

    environment {
        DB_USERNAME = "root"
        DB_PASSWORD = "root"
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
            steps {
                sh 'docker run --name jenkins-mysql -e MYSQL_ROOT_PASSWORD=${DB_PASSWORD} MYSQL_DATABASE=${DB_DATABASE}'
                sh 'npm run lint'
            }

            post {
                always {
                    sh 'docker rm -f jenkins-mysql'
                }
            }
        }
    }
}