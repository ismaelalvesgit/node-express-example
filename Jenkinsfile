pipeline {
    agent any

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
            agent { docker { image 'node:carbon'} }
            steps {
                sh 'npm i'
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'mysql:5.7'
                    args '-e MYSQL_ROOT_PASSWORD=${DB_PASSWORD} MYSQL_DATABASE=${DB_DATABASE} -d'
                }
            }

            steps {
                sh 'node --version'
            }
        }
    }
}