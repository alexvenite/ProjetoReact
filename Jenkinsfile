pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = "alexvenite/react" // substitua com seu usuário e repositório no Docker Hub
        IMAGE_NAME = "my-react-app"
    }

    stages {
         stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_HUB_REPO}:${IMAGE_NAME}" , ".")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        dockerapp.push('latest')
                        dockerapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }     

        stage('Deploy no Kubernetes') {
            steps {
                sh 'echo "Esse é o deployment no Kubernetes"'    
                }
            }   
    }
}