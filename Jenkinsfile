pipeline {
    agent any

    environment {
        WeatherbitAPIKey = "${env.Weatherbit_Base_API}"
    }

    parameters {
        choice(
                name: 'API_SPEC',
                choices: ['All API', 'Weatherbit API', 'Cart API'],
                description: "Enter scripts that you want to run"
            )
    }

    stages {
        stage('Install Dependencies'){
            steps {
                script {
                    // Install Dependencies (Windows using bat)
                    bat "npm install"
                }
            }
        }
        stage('Delete Old Reports') {
            steps {
                script {
                    // Delete old reports directory
                    bat "rmdir /S /Q \"cypress\\report\""
                }
            }
        }
        stage('Run Tests'){
            steps {
                script {
                    def kindOfSpec = params.API_SPEC
                    
                    echo kindOfSpec
                    echo env.WeatherbitAPIKey
                    
                    // Logical Expression
                    if (kindOfSpec == 'All API') {
                        // Run All API
                        bat "npm run cypress::RunAllAPI --env API_KEY_BASE=${env.WeatherbitAPIKey}"
                    } else if (kindOfSpec == 'Weatherbit API') {
                        // Run Weatherbit API
                        bat "npm run cypress::WeatherbitAPI --env API_KEY_BASE=${env.WeatherbitAPIKey}"
                    } else if (kindOfSpec == 'Cart API') {
                        // Run Cart API
                        bat "npm run cypress::DummyCartsAPI"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                bat "npm run merge-reports"

                bat "npm run generate-report"
            }

            publishHTML([
                allowMissing: false, 
                alwaysLinkToLastBuild: false, 
                keepAll: true, 
                reportDir: 'public', 
                reportFiles: 'index.html', 
                reportName: 'Automation Testing Report', 
                reportTitles: '', 
                useWrapperFileDirectly: true
            ])
        }
    }
}