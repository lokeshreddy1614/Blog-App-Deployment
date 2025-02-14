pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ghcr.io/lokeshreddy1614/blog-app:latest"  // Change if stored in Docker Hub
        CONTAINER_NAME = "blog-app-container"
        PORT = "3000"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/lokeshreddy1614/Blog-App-Deployment.git'
            }
        }

        stage('Pull Docker Image') {
            steps {
                script {
                    sh 'docker pull $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    sh 'docker stop $CONTAINER_NAME || true'
                    sh 'docker rm $CONTAINER_NAME || true'
                    sh 'docker run -d -p $PORT:3000 --name $CONTAINER_NAME $DOCKER_IMAGE'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}

