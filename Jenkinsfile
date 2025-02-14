pipeline {
    agent any

    environment {
        IMAGE_FRONTEND = "blog-app-deployment_frontend"
        IMAGE_BACKEND = "blog-app-deployment_backend"
        CONTAINER_FRONTEND = "blog-frontend"
        CONTAINER_BACKEND = "blog-backend"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-repo/blog-app-deployment.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t $IMAGE_FRONTEND ./frontend
                docker build -t $IMAGE_BACKEND ./backend
                '''
            }
        }

        stage('Stop & Remove Old Containers') {
            steps {
                sh '''
                docker rm -f $CONTAINER_FRONTEND || true
                docker rm -f $CONTAINER_BACKEND || true
                '''
            }
        }

        stage('Run New Containers') {
            steps {
                sh '''
                docker run -d --name $CONTAINER_BACKEND -p 5001:5001 $IMAGE_BACKEND
                docker run -d --name $CONTAINER_FRONTEND -p 3000:3000 $IMAGE_FRONTEND
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps'
            }
        }
    }
}

