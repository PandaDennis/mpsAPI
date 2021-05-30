pipeline {
  agent any
  stages {
    stage('Check npm version') {
      steps {
        echo 'checking..'
        sh 'npm -i'
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
      }
    }

  }
}