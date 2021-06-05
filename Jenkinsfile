pipeline {
  agent any
  tools {nodejs "nodejs"}
  environment {
        DB_CONNEVTION = credentials('mongodb+srv://API_user:gBxQDOLQ6Grk4Tcw@testcluster0.xlaia.mongodb.net/MPS_DB?retryWrites=true&w=majority')
    }
  stages {
    stage('Check npm version') {
      steps {
        echo 'checking..'
        sh 'npm -v'
      }
    }

    stage('Build') {
      steps {
        echo 'Building..'
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Testing..'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying....'
        sh 'npm start'
      }
    }

  }
}