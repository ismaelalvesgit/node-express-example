pipeline {
    agent {
        docker { image 'node:carbon'}
    }

    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}