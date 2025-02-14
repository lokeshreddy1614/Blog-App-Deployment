pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "blog-app-deployment_frontend:latest"
        BACKEND_IMAGE = "blog-app-deployment_backend:latest"
        FRONTEND_CONTAINER = "blog-frontend-container"
        BACKEND_CONTAINER = "blog-backend-container"
        FRONTEND_PORT = "3000"
        BACKEND_PORT = "5001"
    }

    stages {
        stage('Stop & Remove Existing Containers') {
            steps {
                script {
                    sh '''
                    docker stop $FRONTEND_CONTAINER || true && docker rm $FRONTEND_CONTAINER || true
                    docker stop $BACKEND_CONTAINER || true && docker rm $BACKEND_CONTAINER || true
                    '''
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                script {
                    sh '''
                    docker run -d --name $BACKEND_CONTAINER -p $BACKEND_PORT:$BACKEND_PORT $BACKEND_IMAGE
                    '''
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                script {
                    sh '''
                    docker run -d --name $FRONTEND_CONTAINER -p $FRONTEND_PORT:$FRONTEND_PORT \
                    --env REACT_APP_BACKEND_URL=http://localhost:$BACKEND_PORT \
                    $FRONTEND_IMAGE
                    '''
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

