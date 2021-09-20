pipeline {
    agent any

    environment {
        SONARQUBE_URL= "http://sonarqube:9000"
        SONARQUBE_PROJECT_KEY = "example"
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
                stage ('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                
                stage ('Jest') {
                    steps {
                        sh 'npm run test:coverage'
                    }

                    post {
                        always {
                            step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml'])
                        }
                    }
                }

                stage('Code Quality SonarQube') {
                    steps {
                        script {
                            withCredentials([string(credentialsId: 'sonarqube', variable: 'LOGIN')]) {
                                def scannerHome = tool 'sonarqube-scanner';
                                withSonarQubeEnv("sonarqube-container") {
                                    sh "${tool("sonarqube-scanner")}/bin/sonar-scanner \
                                    -Dsonar.projectKey=$SONARQUBE_PROJECT_KEY \
                                    -Dsonar.sources=. \
                                    -Dsonar.css.node=. \
                                    -Dsonar.host.url=$SONARQUBE_URL \
                                    -Dsonar.login=$LOGIN"
                                }
                            }
                        }
                    }
                }
            }
        }


        stage('Deploy Docker') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login --username $USERNAME --password $PASSWORD'
                }
            }
        }

    }
}