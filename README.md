# espy_backend
navigate into the backend folder to access codes.

This Repo Contains the logic for the mailing system used for Espy.
It's a daily mailing list that sends users reviews scraped from across the internet, including popular websites like Pitchfork, Consequence of Sound, Guardian, etc. 
The Mail also contains albums suggested based on user moods, all arranged and compiled by Google's PaLM API and then parsed and converted to readable text using RegEx. Palm API was also 
trained by me to make the outputs relevant and spread across the web, while also making the outputs as precise as possible to be the same every time a new answer is generated. This was extremely challenging and tuning the 
AI Model to answer with the same format but different contents was incredibly tough. 

Future modifications will include Chron-Job integrations to schedule mails sent daily.

To use on your own, you must first create a serverless firebase document that contains a bunch of test emails, and then clone the repo. Then, install all dependencies using npm i. 
Then, run "node index.js" to start a chain of execution

all functions have been timed since all are asynchronous. 
The sequence of executions:
1) reading all emails from the Firebase document
2) converting to an array
3) scraping bot then executes
4) scraped info collected into an HTML template
5) HTML template appended with LLM-suggested mood-based albums
6) mail sent out securely using Nodemailer, a generally trustworthy and freq used mail node package.
