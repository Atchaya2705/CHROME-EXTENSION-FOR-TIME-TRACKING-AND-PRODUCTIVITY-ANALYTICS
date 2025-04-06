# CHROME-EXTENSION-FOR-TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: Atchaya K

*INTERN ID*: CT04WF04

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTOSH

## CHROME-EXTENSION-FOR-TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS
The Time Tracker & Productivity Analytics Chrome Extension is designed to help users monitor how much time they spend on different websites and gain insights into their productivity habits. This extension runs in the background and tracks every active tab the user navigates to, logging the time spent on each domain. The primary goal is to classify websites as productive or unproductive and generate weekly analytics reports by integrating with a backend server and storing historical data in a database.

When the extension is installed and active, it begins monitoring browser activity using background scripts. It listens for events like tab activation, URL updates, and window focus changes. Every time the user switches tabs or the content in a tab changes, the extension captures the current timestamp and calculates the amount of time spent on the previous site. It uses this to create time logs for each domain. These logs are stored locally using Chrome's storage API and also sent to a backend server via a REST API call. This ensures that user data can be persistently stored and aggregated over time.

The background script includes a predefined list of productive websites, such as GitHub, Stack Overflow, and LeetCode, as well as a list of unproductive ones like Facebook and Instagram. When data is sent to the backend, each website is categorized accordingly. If a domain doesn’t appear on either list, it is marked as “neutral.” This classification helps generate meaningful analytics later when viewing the report.

The extension also includes a popup interface, which users can open by clicking the extension icon in the browser toolbar. This popup displays a simple and clear breakdown of the time spent on each website in minutes. It retrieves this data from Chrome's local storage and presents it in a readable format using HTML and JavaScript. This allows users to quickly understand their current browsing habits without needing to log into a dashboard.

In addition to the frontend extension code, the project includes a Node.js backend server that connects to a MongoDB database. This server receives POST requests containing domain names, time spent, and their category. It stores each interaction as a document with a timestamp. The backend also exposes a GET endpoint to generate a weekly productivity report. This report aggregates the total time spent on each category (productive, unproductive, neutral) over the past seven days and returns the result as JSON.

To run the extension, developers load the unpacked code via the Chrome Extensions page after enabling developer mode. The backend must be run separately using Node.js, and MongoDB should be installed locally or on a cloud service like MongoDB Atlas. Once the backend is running, it listens on port 3000 and is ready to receive and store tracking data from the extension.

This project can be expanded further by adding a visual dashboard for historical analytics using Chart.js or React, allowing users to see trends over time, compare productivity levels day-to-day, and set goals. The combination of frontend browser tracking and a persistent backend enables a powerful tool that balances simplicity and meaningful data insights.

## OUTPUT

![Image](https://github.com/user-attachments/assets/e40d23d8-3c65-429a-9827-cd679404eefb)
