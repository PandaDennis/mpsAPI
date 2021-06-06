pipeline {
  agent any
  stages {
    stage('Check npm version') {
      steps {
        echo 'checking..'
        sh 'npm -v'
      }
    }

    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            echo 'Building..'
            sh 'npm install'
          }
        }

        stage('install pm2 ') {
          steps {
            sh 'npm install -g pm2'
          }
        }

      }
    }

    stage('Test') {
      parallel {
        stage('Test') {
          environment {
            CI = 'true'
          }
          steps {
            echo 'Testing..'
            sh 'npm audit fix'
          }
        }

        stage('stop all pm2') {
          steps {
            sh 'pm2 stop all'
          }
        }

      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying....'
        sh 'pm2 npm start'
      }
    }

  }
  tools {
    nodejs 'nodejs'
  }
  environment {
    DB_CONNEVTION = 'mongodb+srv://API_user:gBxQDOLQ6Grk4Tcw@testcluster0.xlaia.mongodb.net/MPS_DB?retryWrites=true&w=majority'
  }
}