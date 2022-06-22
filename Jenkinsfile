pipeline {
    agent any
    options {
        throttleJobProperty(
            categories: ['build_frontend'],
            throttleEnabled: true,
            throttleOption: 'category'
        )
    }
    tools {
        dockerTool 'docker'
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage("Clean build folder"){
            steps {
                sh 'rm -rf build'
            }
        }
        stage("Build React inside Docker") {
            steps {
                script {
                    echo 'Build...'
                    sh "docker build -t ${BRANCH_NAME}:v${BUILD_NUMBER} -f Dockerfile.build --pull ."
                    echo 'Build Completed'
                }    
            }
        }
        stage('Extract React build') {
            steps {
                script {
                    echo 'Extract...'
                    sh "docker run -d --name polin_${BRANCH_NAME} ${BRANCH_NAME}:v${BUILD_NUMBER}"
                    sh 'docker cp polin_${BRANCH_NAME}:/app/build build'
                    sh 'docker rm -f polin_${BRANCH_NAME}'
                    sh "docker rmi -f ${BRANCH_NAME}:v${BUILD_NUMBER}"
                    echo 'Extract Completed'
                }               
            }
        }
        stage('Build Container') {
            steps {
                sh "docker build -t alan14/polin-frontend:latest -t alan14/polin-frontend:v${BUILD_NUMBER} -f Dockerfile.deploy ."
            }
        }
        stage('Login') {
            steps {
                sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
            }
        }
        stage('Push') {
            steps {
                sh 'docker push alan14/polin-frontend:v${BUILD_NUMBER}'
                sh 'docker push alan14/polin-frontend:latest'
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}
