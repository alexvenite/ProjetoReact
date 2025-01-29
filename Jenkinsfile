pipeline {
    agent any

    stages {

        stage('Use Node.js 16') { // Ou a versão que você precisa
            steps {
                sh '''
                    nvm install 16
                    nvm use 16
                    node -v
                    npm -v
                '''
            }

         stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm install @testing-library/jest-dom@latest --save-dev'             
                }
            }
        }

         stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

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
            environment {
                tag_version = "${env.BUILD_ID}"
            }
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh 'sed -i "s/{{tag}}/$tag_version/g" ./aks/deployment.yaml'
                    sh 'kubectl apply -f aks/deployment.yaml'
                }
            }
        }
    }
}