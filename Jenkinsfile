pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "alexvenite/react:${env.BUILD_ID}"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    
                    dockerapp = docker.build(DOCKER_IMAGE, '-f ./my-app/Dockerfile ./my-app')
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