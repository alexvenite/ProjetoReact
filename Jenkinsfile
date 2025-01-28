pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'echo "Executando o buid da minha imagem"'
                }
            }
        

        stage('Push Docker Image') {
            steps {
                sh 'echo "Esse é o push da minha imagem para o DockerHub"'    
                }
            }

        stage('Deploy no Kubernetes') {
            steps {
                sh 'echo "Esse é o deployment no Kubernetes"'    
                }
            }    
    }     
}