pipeline {
    agent any

    stages {


         stage('Dependencias') {
            steps {
                script {
                    sh 'npm update'
                    sh 'npm install'              
                }
            }
        }


         stage('Test') {
            steps {
                script {
                    sh 'npm test -- --coverage'
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