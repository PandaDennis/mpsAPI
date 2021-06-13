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
      steps {
        echo 'Building..'
        sh 'npm install'
      }
    }

    stage('Test') {
      environment {
        CI = 'true'
      }
      steps {
        echo 'Testing..'
        sh 'npm audit fix'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying....'
        sh 'npm start'
      }
    }

  }
  tools {
    nodejs 'nodejs'
  }
  environment {
    DB_CONNEVTION = 'mongodb+srv://API_User:vdCDzdi1KH9Du7D6@cluster0.wrxik.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-b4dcqm-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
  }
}