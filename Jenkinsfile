pipeline {
    agent any

    environment {
        PROJECT_DIR = "/home/ubuntu/Blog-App-Deployment" // Update this path if needed
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'github-credentials-id', url: 'https://github.com/your-repo.git'
                }
            }
        }

        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                    sh 'docker-compose -f $PROJECT_DIR/docker-compose.yml down'
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    sh """
                    if [ -d "$PROJECT_DIR" ]; then
                        echo "Project directory exists, proceeding with deployment..."
                        docker-compose -f $PROJECT_DIR/docker-compose.yml up -d --build
                    else
                        echo "Error: Project directory not found!"
                        exit 1
                    fi
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}

