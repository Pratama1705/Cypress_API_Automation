## How To Run Cypress Test Case (UI Automation & API Automation)

1. Ensure to already install nodejs and npm
2. Clone This Repository
3. Open Terminal/CMD, type `npm install` and enter. It will install dependencies based on **package.json** file
4. After installing progress done, **node_modules** folders will be created
5. Add new files in root folder that names **cypress.env.json** to store your API Token Key
6. Write in **cypress.env.json** file like this
   ```json
   {
     "API_KEY_BASE": "Your WeatherBit API Key"
   }
   ```
7. Save it and type `npx cypress open` to open cypress menu
8. After cypress menu opened, choose End to End (E2E) Testing
   <img width="500" alt="image" src="https://github.com/Pratama1705/AutomationTesting/assets/73006848/81284244-f3ea-4642-96bc-0af5fd070d2c">
9. Choose a browser that you want to use, preffered to choose **Google Chrome**
10. Select automation script file that you want to run and script will be run
