pipeline {
    agent any


    stages {
        stage('Prepare') {
            steps {
                sh 'echo "Clonning Repository"'
                git branch: 'release',
                    url: 'https://lab.ssafy.com/s07-final/S07P31B307.git',
                    credentialsId: 'DIA'
            }
            post {
                success {
                     sh 'echo "Successfully Cloned Repository"'
                 }
                 failure {
                     sh 'echo "Fail Cloned Repository"'
                 }
            }
        }

        stage('Docker stop'){
            steps {
                // sh 'echo "root ubuntu" | sudo -S ls'
                // sh 'ls'
                sh 'sudo chmod -R 777 /usr/local/bin'
                sh 'sudo chmod +x /usr/local/bin/docker-compose'
                sh 'echo "Docker Container Stop"'
//              도커 컴포즈 다운
                // sh 'curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose'
//              해당 도커 컴포즈 다운한 경로로 권한 설정
                // sh 'chmod -R 777 /usr/local/bin'
                // sh 'chmod +x /usr/local/bin/docker-compose'
//              기존 백그라운드에 돌아가던 컨테이너 중지
                sh 'sudo docker-compose stop'


            }
            post {
                 failure {
                     sh 'echo "Docker Fail"'
                }
            }
        }

        stage('RM Docker'){
            steps {
                
                sh 'echo "Remove Docker"'

                //정지된 도커 컨테이너 찾아서 컨테이너 ID로 삭제함
                sh '''
                    result=$(sudo  docker container ls -a --filter "name=DIA*" -q )
                    if [ -n "$result" ]
                    then
                        sudo docker rm $(docker container ls -a --filter "name=DIA*" -q)
                    else
                        echo "No such containers"
                    fi
                '''

                // DIA로 시작하는 이미지 찾아서 삭제함
                sh '''
                    result=$(sudo  docker images -f "reference=DIA*" -q )
                    if [ -n "$result" ]
                    then
                        sudo docker rmi -f $(docker images -f "reference=DIA*" -q)
                    else
                        echo "No such container images"
                    fi
                '''

                // 안쓰는이미지 -> <none> 태그 이미지 찾아서 삭제함
                sh '''
                    result=$(sudo docker images -f "dangling=true" -q)
                    if [ -n "$result" ]
                    then
                        sudo docker rmi -f $(docker images -f "dangling=true" -q)
                    else
                        echo "No such container images"
                    fi
                '''

            }
            post {
                 failure {
                     sh 'echo "Remove Fail"'
                }
            }
        }

        stage('Build Gradle'){
            steps{
                dir('backend') {
                    sh "sudo chmod +x gradlew"
                    sh """
                    sudo ./gradlew clean build --exclude-task test
                    """
                }
            }
            post{
                failure{
                    sh 'echo "Build Gradle Fail"'
                }
            }
        }
        stage('Bulid & Run') {
            steps {
                sh 'echo " Image Bulid Start"'
                script {

//                         업데이트된 코드로 빌드 및 실행
                    sh 'sudo docker-compose up -d'
                }
                
            }

            post {
                failure {
                    sh 'echo "Bulid Docker Fail"'
                }
            }
        }

        
    }
}