pipeline {
    agent {
        docker { image 'node:carbon'}
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
    }
}