pipeline {
    agent {
        docker { image 'node:carbon'}
    }

    stage('Cloning Git') {
        steps {
            git branch: 'master',
                credentialsId: 'd1dff7cf-e8ec-4a5b-895d-fc3467eb34de',
                url: 'https://gitlab.com/ismaelalveslab/events_api'
            sh "ls -lat"
        }
    }
}