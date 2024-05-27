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
        stage('Run Tests'){
            steps {
                script {
                    echo "First : ${API_SPEC}"

                    def kindOfSpec = '${API_SPEC}'
                    
                    echo "Second : ${API_SPEC}"

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
}