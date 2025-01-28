pipeline {
    agent any

    stages {
         stage('Build Docker Image') {
            steps {
                script {
                    //dockerImage = docker.build("${DOCKER_HUB_REPO}:${IMAGE_NAME}" , ".")
                    dockerapp = docker.build("alexvenite/react:${env.BUILD_ID}", ".")
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