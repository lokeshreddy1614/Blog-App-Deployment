**Blog-App-Deployment**

This repository contains a MERN stack Blog App with a fully automated CI/CD pipeline using Jenkins and deployment strategies utilizing Docker, Docker Compose, Kubernetes, and PM2.
Table of Contents
•	Project Overview
•	Technologies Used
•	Installation
•	Project Structure
•	CI/CD Pipeline with Jenkins
•	Docker Deployment
•	Kubernetes Deployment
•	PM2 Deployment
•	Troubleshooting
________________________________________
**Project Overview**

The Blog App consists of a React.js frontend, a Node.js backend, and a MongoDB database. The app is designed to be deployed using:
•	Docker & Docker Compose
•	Kubernetes
•	PM2 on an Ubuntu server
•	CI/CD pipeline using Jenkins
________________________________________
**Technologies Used**
•	Frontend: React.js
•	Backend: Node.js (Express.js)
•	Database: MongoDB
•	Containerization: Docker, Docker Compose
•	Orchestration: Kubernetes
•	Process Manager: PM2
•	CI/CD: Jenkins
•	Cloud Services: AWS 
•	Monitoring: AWS CloudWatch

________________________________________
**Installation**
1. Clone the Repository
git clone https://github.com/lokeshreddy1614/Blog-App-Deployment.git
Go inside the project directory 
cd Blog-App-Deployment
________________________________________
**Project Structure**
Blog-App-Deployment/
│── client/                       (React.js frontend)
│── server/                      (Node.js backend)
│── docker-compose.yml        (Docker Compose config)
│── Jenkinsfile                (Jenkins pipeline config)
│── backend-deployment.yaml    (Backend Kubernetes Deployment)
│── frontend-deployment.yaml    ( Frontend Kubernetes Deployment)
│── mongo-deployment.yaml       (MongoDB Kubernetes Deployment)
│── README.md                  

________________________________________
**Frontend & Backend Setup**
1.	Install Dependencies 
Install node and npm by using below commands
sudo apt update -y
sudo apt upgrade -y
sudo apt install nodejs npm -y
Install Dependencies
**Frontend (React.js)**
cd client
npm install
**Backend (Node.js)**
cd ../server
npm install
3. Start the Backend
cd server
npm start
We can running port and access backend server with that port number.
http://<public IP address>:5001
![backend](https://github.com/user-attachments/assets/ee0d9ff9-c605-4e3a-bdea-dfe5c9a5d402)

5. Start the Frontend
cd ../client
npm start
![frontend](https://github.com/user-attachments/assets/f4e55770-21f2-41a4-bff9-0480b7839a11)

We can running port and access frontend server with that port number
http://<public IP address>:3000
![output](https://github.com/user-attachments/assets/27c4c8f7-d26e-4096-9107-f8dd16e00057)
![frontend login](https://github.com/user-attachments/assets/f86b89ae-c1a5-4e68-92c8-3a43fdc631b8)


**Docker Deployment**
Step 1: Install Docker & Docker Compose
1.1 Update System Packages
sudo apt update && sudo apt upgrade -y
1.2 Install Docker
sudo apt install -y docker.io
sudo apt install -y docker-compose
1.3 Enable & Start Docker
sudo systemctl enable --now docker
1.4 Verify Docker Installation
docker –version
docker-compose --version

1.6 Verify Docker Compose Installation
docker-compose –version

Step 2: Build and Run the Blog App Using Docker Compose
2.1 Navigate to the Project Directory
cd Blog-App-Deployment
2.2 Create a Dockerfile for the Frontend
Create a Dockerfile inside the client/ directory:
For Docker file click on GitHub project like, you can get docker file inside client directory.

Run the frontend docker file 
docker build -f blog-frontend-app

2.3 Create a Dockerfile for the Backend
Create a Dockerfile inside the server/ directory:
For Docker file click on GitHub project like, you can get docker file inside server directory.

Run the backend docker file 
docker build -f blog-backend-app

2.4 Create a Docker Compose File
Create a docker-compose.yml in the root directory:
For Docker file click on GitHub project like, you can docker compose file inside project directory.

Run the docker compose file 
docker-compose up –build -d

2. Verify Running Containers
docker ps
![docker image](https://github.com/user-attachments/assets/d8c9acdf-0743-475e-a2b8-80c2ee3f5fee)

4. Stop Containers
docker-compose down
Step 4: Stop and Remove Containers
4.1 Stop Containers
docker-compose down
4.2 Remove All Docker Containers
docker rm (docker ps -aq)
4.3 Remove All Docker Images (If Needed)
docker rmi  <image id or image name>
Database Setup
1. Run MongoDB in Docker
docker run -d --name mongodb -p 27017:27017 mongo
2. Connect to MongoDB
docker exec -it mongodb mongosh
3. Create Database & User
use blogdb
db.createUser({ user: "admin", pwd: "password", roles: [{ role: "readWrite", db: "blogdb" }] })

Step 5: Access the Application
•	Frontend: Open http://localhost:3000
•	Backend: Open http://localhost:5001
•	MongoDB: Connect using mongodb://localhost:27017/blogdb
________________________________________

**Kubernetes Deployment**
1. Install Kubernetes (Kind Cluster)
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
2. Create a Kind Cluster
kind create cluster --name blog-app
kubectl cluster-info --context kind-blog-app\



**Deployment & service files for Frontend, Backend and Mongo database.**
3. Deploy Backend
Create a backend file name backend-deployment.yaml file.
For Docker file click on GitHub project like, you see backed-deployment.yaml file in project  directory.

Apply the file in Kubernetes kind cluster by using below command
kubectl apply -f backend-deployment.yaml

4. Deploy Frontend
Create a frontend file name as frontend-deployment.yaml file to create frontend pod in kind cluster.
For Docker file click on GitHub project like, you see frontend-deployment.yaml file in project  directory.

Apply the frontend deployment file in kind cluster by using below command.
kubectl apply -f frontend-deployment.yaml

5. Deploy MongoDB
Create a database file name as mongo-deployment.yaml file to create the pod in cluster.
For Docker file click on GitHub project like, you see mongodb-deployment.yaml file in project  directory.

Apply the file in kind cluster by using below command.
kubectl apply -f mongo-deployment.yaml

7. Check Deployment Status
By using following commands we can verify the pods and services in cluster .
kubectl get pods
kubectl get services
![kubernetes](https://github.com/user-attachments/assets/b3177872-9cfb-4db8-8950-8a4bf72661dd)

________________________________________


PM2 Deployment
1. Install PM2
npm install -g pm2
2. Start Backend Server with PM2
cd server
pm2 start index.js --name blog-backend
pm2 save
pm2 startup
3. Start Frontend Server with PM2
cd ../client
serve -s build -l 3000
4. List the PM2 services
cd /Blog-App-Deployment
pm2 list
![pm2](https://github.com/user-attachments/assets/6380a6c7-05cf-45e3-b738-c4c2601b897c)

Troubleshooting
pm2 list
Restart a Process
pm2 restart blog-backend
Stop a Process
pm2 stop blog-backend
________________________________________

**CI/CD Pipeline with Jenkins**
1. Install Jenkins on Your Server
Run the following commands on your Ubuntu server:
sudo apt update
sudo apt install -y openjdk-17-jdk
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install -y jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
Access the Jenkins UI
1.	Open your browser and go to:
http://<public IP>:8080
2.	Retrieve the Jenkins Admin Password:
1.	sudo cat /var/lib/jenkins/secrets/initialAdminPassword
2.	![Screenshot 2025-02-13 124436](https://github.com/user-attachments/assets/ea91b741-fd41-4c6c-9e63-d4370350c389)

3.	Paste the password in Jenkins UI and install the recommended plugins.
4.	Create an admin user to manage Jenkins.
5.	![Screenshot 2025-02-13 124805](https://github.com/user-attachments/assets/aa889edb-f1aa-4339-bc22-70ef46a877b2)

3. Install Required Plugins
1.	Go to Jenkins Dashboard → Manage Jenkins → Manage Plugins.
2.	Install the following plugins:
o	Git Plugin
o	Pipeline Plugin
o	Docker Plugin
4. Create a Jenkins Pipeline
1.	In Jenkins Dashboard, click New Item.
2.	Choose Pipeline and name it Blog-App-CI-CD.
3.	In Pipeline Section, select Pipeline script from SCM.
4.	Choose Git and add your repository URL
https://github.com/lokeshreddy1614/Blog-App-Deployment.git
•  Set the branch to master (or your preferred branch).
•  Enter Jenkinsfile as the Script Path.
•  Click Save.

5. Create a Jenkinsfile in Your Repository
Add a Jenkinsfile at the root of your GitHub repository.
Push it to github repository by applying following commands
git add .
git status
git commit -m “commit message”
git push origin master
user name 
password (token)
6   Create a webhooks for auto triggering
Go to github Settings   webhooks
Click on Add webhook
Enter the details and Jenkins IP address path 
(ex: http://13.234.1116.20:8080)
Select push 
Apply and Save
![Screenshot 2025-02-15 004638](https://github.com/user-attachments/assets/88490db4-c7cd-4ddc-870c-33e19b5c0144)

Run the Pipeline
1.	Go to Jenkins Dashboard
2.	Click Blog-App-CI-CD
3.	Click Build Now
4.	Monitor the build process in Console Output
   ![Screenshot 2025-02-14 203614](https://github.com/user-attachments/assets/7f465498-f816-4f37-bb6b-3f5f998c23a8)

![Screenshot 2025-02-14 203658](https://github.com/user-attachments/assets/48f19e57-d851-4e6b-bc7d-ff1b770957eb)

**Logging & Monitoring with AWS CloudWatch**
This guide explains how to set up logging and monitoring for the Blog App using AWS CloudWatch.
1. Install AWS CloudWatch Agent
Step 1: Connect to the EC2 Instance
Ensure you are connected to your AWS EC2 instance via SSH.
Step 2: Install CloudWatch Agent
Run the following command to install the AWS CloudWatch Agent:
Cd Blog-App-Deployment
sudo apt update && sudo apt install amazon-cloudwatch-agent -y
2. Configure CloudWatch Agent
Step 1: Open CloudWatch Agent Configuration File
sudo vi /opt/aws/amazon-cloudwatch-agent/bin/config.json
Step 2: Add the Configuration
Modify the file to include log collection settings: 
3. Start CloudWatch Agent
Run the following command to fetch and start CloudWatch Agent:
sudo amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s
4. Check CloudWatch Logs
Step 1: Open AWS Console
Navigate to AmazonCloudWatch console.
Step 2: Navigate to Logs
1.	In the left sidebar, click on Logs.
2.	Click on Log Groups.
3.	Look for BlogAppBackend and BlogAppFrontend.
Step 3: View Logs
•	Click on the log group.
•	Select the latest log stream.
•	Check application logs for errors or issues.
5. Verify CloudWatch Agent Status
To check if the CloudWatch agent is running:
sudo systemctl status amazon-cloudwatch-agent
If it's not running, start the service:
sudo systemctl start amazon-cloudwatch-agent
6. Enable CloudWatch Agent on Startup
Ensure the agent starts automatically on system reboot:
sudo systemctl enable amazon-cloudwatch-agent
7. Troubleshooting
•	Check logs for errors:
sudo tail -f /opt/aws/amazon-cloudwatch-agent/logs/amazon-cloudwatch-agent.log
•	Restart the agent :
sudo systemctl restart amazon-cloudwatch-agent
![Screenshot 2025-02-16 010629](https://github.com/user-attachments/assets/cc4639df-8db1-4478-ab35-e98db5902ef5)

________________________________________
2.1 Configure AWS Security Groups (EC2 Firewall)
1.	Go to AWS Console → EC2 → Security Groups.
2.	Edit Inbound Rules:
o	Allow HTTPS (443) for all users.
o	Allow HTTP (80) for initial setup. 
o	Allow SSH (22) only for your trusted IP.
o	Allow custom ports 
1.	Allow 3000 for frontend.
2.	Allow 5001 for backend.
3.	Allow 27017 for database.
4.	Allow 31283 for Kubernetes backend service.
5.	Allow 31785 for Kubernetes frontend service.
![Screenshot 2025-02-16 100758](https://github.com/user-attachments/assets/93874c9d-86c4-402a-994c-a7b091e9a07f)



1. IAM Roles & Least Privilege Access
IAM roles allow different AWS services to interact securely with each other using least privilege access.
1.1 Create IAM Roles for Services
1.	Go to AWS Console → IAM → Roles → Create Role.
2.	Choose a trusted entity:
o	For EC2: Select AWS service → EC2.
3.	Attach necessary policies:
o	CloudWatch Logs Access: Allows logs to be sent to AWS CloudWatch.
	Policy: CloudWatchAgentServerPolicy
o	Secrets Manager Access: Grants access to AWS Secrets Manager.
	Policy: SecretsManagerReadWrite
4.	Name the role  CloudWatchAgent and create it.
   ![Screenshot 2025-02-16 010654](https://github.com/user-attachments/assets/b68b48ae-3e6c-49bb-91d3-f83880c6b718)

6.	Attach the role to EC2 instances:
o	Go to EC2 → Instance → Actions → Modify IAM Role and attach the newly created role.
![Screenshot 2025-02-16 095703](https://github.com/user-attachments/assets/f2a27faf-7420-4e52-a5bb-8d8acd1d7af1)



