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
        sh '''echo \'The following "npm" command (if executed) installs the "cross-env"\'
echo \'dependency into the local "node_modules" directory, which will ultimately\'
echo \'be stored in the Jenkins home directory. As described in\'
echo \'https://docs.npmjs.com/cli/install, the "--save-dev" flag causes the\'
echo \'"cross-env" dependency to be installed as "devDependencies". For the\'
echo \'purposes of this tutorial, this flag is not important. However, when\'
echo \'installing this dependency, it would typically be done so using this\'
echo \'flag. For a comprehensive explanation about "devDependencies", see\'
echo \'https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies.\'
set -x
# npm install --save-dev cross-env
set +x

echo \'The following "npm" command tests that your simple Node.js/React\'
echo \'application renders satisfactorily. This command actually invokes the test\'
echo \'runner Jest (https://facebook.github.io/jest/).\'
set -x
npm test
'''
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
    DB_CONNEVTION = 'mongodb+srv://API_user:gBxQDOLQ6Grk4Tcw@testcluster0.xlaia.mongodb.net/MPS_DB?retryWrites=true&w=majority'
  }
}