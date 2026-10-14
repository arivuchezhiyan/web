# Complete Project Setup & Execution Guide (HELPER)

This guide covers everything needed to set up, fix your environment (Node.js, NVM, Java, MongoDB, Tomcat), and run **every single project** in this repository step-by-step after downloading or cloning from GitHub.

---

## 📑 Table of Contents
1. [Initial Cloning from GitHub](#1-initial-cloning-from-github)
2. [Fixing Node.js & NVM Setup on Windows (Clean Installation)](#2-fixing-nodejs--nvm-setup-on-windows)
3. [Prerequisites Checklist (Java, Mongo, Tomcat)](#3-prerequisites-checklist)
4. [Step-by-Step: Running Each Project One by One](#4-running-each-project-one-by-one)
   - [Project 1: Exam Layouts & Selectors (`simple.html`)](#project-1-exam-layouts--selectors-simplehtml)
   - [Project 2: Simple Web Application (`simple web application/`)](#project-2-simple-web-application)
   - [Project 3: Basic Tomcat Servlet (`servlet/`)](#project-3-basic-tomcat-servlet)
   - [Project 4: Advanced JDBC SQL Servlet (`advanced servlet/`)](#project-4-advanced-jdbc-sql-servlet)
   - [Project 5: Fullstack Basic CRUD (`fullstack/`)](#project-5-fullstack-basic-crud)
   - [Project 6: Fullstack Advanced 1 - Props & Emits (`fullstackadvanced1/`)](#project-6-fullstack-advanced-1---props--emits)
   - [Project 7: Fullstack Advanced 2 - Routing & Pinia (`fullstackadvanced2/`)](#project-7-fullstack-advanced-2---routing--pinia)
   - [Project 8: Master Fullstack - All Concepts Combined (`masterfullstack/`)](#project-8-master-fullstack---all-concepts-combined)
5. [Troubleshooting Common Issues](#5-troubleshooting-common-issues)

---

## 1. Initial Cloning from GitHub

Open **PowerShell** or **Command Prompt** and run:

```powershell
# 1. Navigate to where you want the project
cd C:\Users\arivu\Desktop

# 2. Clone the repository
git clone https://github.com/arivuchezhiyan/web.git

# 3. Enter the repository folder
cd web
```

---

## 2. Fixing Node.js & NVM Setup on Windows

If your Node.js or `npm` is corrupted, throwing errors like `node is not recognized`, or conflicting across multiple versions, follow this clean fix:

### Step 2.1: Clean Up Broken Node Installations
1. Open Windows **Installed Apps / Add or Remove Programs**.
2. Search for **Node.js** and **Uninstall** it.
3. Delete leftover corrupted directories:
   ```powershell
   Remove-Item -Path "C:\Program Files\nodejs" -Recurse -Force -ErrorAction SilentlyContinue
   Remove-Item -Path "C:\Users\$env:USERNAME\AppData\Roaming\npm" -Recurse -Force -ErrorAction SilentlyContinue
   Remove-Item -Path "C:\Users\$env:USERNAME\AppData\Roaming\npm-cache" -Recurse -Force -ErrorAction SilentlyContinue
   ```

### Step 2.2: Install NVM for Windows (Node Version Manager)
Run in PowerShell (as Administrator):

```powershell
# Option A: Install via Windows Package Manager (winget)
winget install CoreyButler.NVMforWindows --accept-package-agreements --accept-source-agreements

# Option B: If winget is not available, download the installer directly:
# https://github.com/coreybutler/nvm-windows/releases/latest (download nvm-setup.exe and install)
```

### Step 2.3: Verify and Install Node.js LTS
Close and reopen your PowerShell terminal, then run:

```powershell
# 1. Verify NVM is installed
nvm version

# 2. Install the recommended Long-Term Support (LTS) Node.js version (v20 or v22)
nvm install 20.18.0

# 3. Switch to and activate this version
nvm use 20.18.0

# 4. Verify Node and NPM are active and outputting valid versions
node -v
# Output should be: v20.18.0

npm -v
# Output should be: 10.x.x
```

### Step 2.4: Enable PowerShell Script Execution
If PowerShell blocks scripts (`npm run dev cannot be loaded because running scripts is disabled`), run once:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

---

## 3. Prerequisites Checklist

| Component | Required For | How to Check | Recommended Version |
| :--- | :--- | :--- | :--- |
| **Node.js** | Frontend dev servers | `node -v` | v20.x LTS or v22.x LTS |
| **Java JDK** | Spring Boot & Servlets | `java -version` & `javac -version` | JDK 17 or JDK 21 (Eclipse Temurin) |
| **MongoDB** | Spring Boot databases | `mongod --version` or check Service | MongoDB Community 7.x/8.x (Port 27017) |
| **Apache Tomcat** | Jakarta Servlet webapps | Check directory `apache-tomcat-11.x` | Tomcat 11.0.x (Port 8080) |

> **MongoDB Note**: Ensure MongoDB is running on port `27017`. Run `netstat -ano | findstr 27017` or start the MongoDB service from Windows Services.

---

## 4. Running Each Project One by One

---

### Project 1: Exam Layouts & Selectors (`simple.html`)
A standalone exam reference manual featuring 2-column, 3-column, CSS grid, all selector types, and form validation.

* **How to Run**:
  Simply double-click `simple.html` to open it in Chrome, or serve it via Python:
  ```powershell
  cd web
  python -m http.server 3000
  ```
* **URL**: Open [http://localhost:3000/simple.html](http://localhost:3000/simple.html) in your browser.

---

### Project 2: Simple Web Application (`simple web application/`)
Interactive Vanilla HTML5, CSS3 & ES6 JavaScript application featuring particle canvas physics, audio synthesizer, and localStorage tasks.

* **How to Run**:
  ```powershell
  cd "web\simple web application"
  python -m http.server 5500
  ```
* **URL**: Open [http://localhost:5500/](http://localhost:5500/) in your browser.

---

### Project 3: Basic Tomcat Servlet (`servlet/`)
Classic Jakarta Servlet application (`HelloServlet`) for Apache Tomcat 11.

* **How to Run**:
  1. Copy the `servlet` folder to your Tomcat `webapps` directory:
     ```powershell
     Copy-Item -Path "web\servlet" -Destination "C:\Users\arivu\Desktop\apache-tomcat-11.0.26\webapps\servlet" -Recurse -Force
     ```
  2. Start Apache Tomcat:
     ```powershell
     cd C:\Users\arivu\Desktop\apache-tomcat-11.0.26\bin
     .\startup.bat
     # OR
     .\catalina.bat run
     ```
* **URL**: Open [http://localhost:8080/servlet/](http://localhost:8080/servlet/) in your browser.

---

### Project 4: Advanced JDBC SQL Servlet (`advanced servlet/`)
4-input form (Name, ID, Department, Subjects checkboxes) connected to an SQL database via JDBC with a dynamic HTML table.

* **How to Run**:
  1. Copy the `advanced servlet` folder to your Tomcat `webapps` directory:
     ```powershell
     Copy-Item -Path "web\advanced servlet" -Destination "C:\Users\arivu\Desktop\apache-tomcat-11.0.26\webapps\advancedservlet" -Recurse -Force
     ```
  2. If Tomcat is not already running, start it:
     ```powershell
     cd C:\Users\arivu\Desktop\apache-tomcat-11.0.26\bin
     .\catalina.bat run
     ```
* **URL**:
  - Registration Form: [http://localhost:8080/advancedservlet/](http://localhost:8080/advancedservlet/)
  - Live SQL Table: [http://localhost:8080/advancedservlet/register](http://localhost:8080/advancedservlet/register)

---

### Project 5: Fullstack Basic CRUD (`fullstack/`)
Single-input student name with 5 CRUD buttons (Create, Get All, Get By ID, Update, Delete).

* **Step 1: Start Backend (Terminal 1)**:
  ```powershell
  cd web\fullstack\backend
  .\gradlew bootRun
  ```
  *(Backend runs on `http://localhost:8080/api/students`)*

* **Step 2: Start Frontend (Terminal 2)**:
  ```powershell
  cd web\fullstack\frontend
  npm install
  npm run dev -- --port 5173
  ```
* **URL**: Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

### Project 6: Fullstack Advanced 1 - Props & Emits (`fullstackadvanced1/`)
Multi-field student form (ID, Name, Email, Age, Department, Address) separated into parent and child components using Vue 3 **Props and Emits**.

* **Step 1: Start Backend (Terminal 1)**:
  ```powershell
  cd web\fullstackadvanced1\backend
  .\gradlew bootRun
  ```

* **Step 2: Start Frontend (Terminal 2)**:
  ```powershell
  cd web\fullstackadvanced1\frontend
  npm install
  npm run dev -- --port 5174
  ```
* **URL**: Open [http://localhost:5174/](http://localhost:5174/) in your browser.

---

### Project 7: Fullstack Advanced 2 - Routing & Pinia (`fullstackadvanced2/`)
Vue Router with 4 main pages (`Home`, `Directory`, `About`, `Contact Us`), nested sub-routing, and global state managed via **Pinia**.

* **Step 1: Start Backend (Terminal 1)**:
  ```powershell
  cd web\fullstackadvanced2\backend
  .\gradlew bootRun
  ```

* **Step 2: Start Frontend (Terminal 2)**:
  ```powershell
  cd web\fullstackadvanced2\frontend
  npm install
  npm run dev -- --port 5175
  ```
* **URL**: Open [http://localhost:5175/](http://localhost:5175/) in your browser.

---

### Project 8: Master Fullstack - All Concepts Combined (`masterfullstack/`)
The flagship fullstack application bringing together **Props, Emits, Pinia Store, Multi-Level Nested Routing, Spring Boot 4 REST API, and MongoDB**.

* **Step 1: Start Backend (Terminal 1)**:
  ```powershell
  cd web\masterfullstack\backend
  .\gradlew bootRun
  ```

* **Step 2: Start Frontend (Terminal 2)**:
  ```powershell
  cd web\masterfullstack\frontend
  npm install
  npm run dev -- --port 5176
  ```
* **URL**: Open [http://localhost:5176/](http://localhost:5176/) in your browser.

---

## 5. Troubleshooting Common Issues

### A. Port Conflict: `Port 8080 was already in use`
* **Cause**: Spring Boot and Tomcat both try to bind port `8080`.
* **Fix**:
  1. Find what process is using port 8080:
     ```powershell
     netstat -ano | findstr :8080
     ```
  2. Kill the process by its PID (e.g., PID `1234`):
     ```powershell
     Stop-Process -Id 1234 -Force
     ```
  3. Alternatively, run the Tomcat or Spring Boot application on port `8088` or `8090`.

### B. `npm : File cannot be loaded because running scripts is disabled`
* **Fix**:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
  ```

### C. MongoDB Connection Error: `ClusterListener connection pool error`
* **Fix**: Ensure your local MongoDB instance is started:
  ```powershell
  net start MongoDB
  ```
  *(Or launch `mongod.exe` manually from `C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe`)*

### D. Rebuilding / Clearing Gradle Cache
If a Gradle build fails due to cached files:
```powershell
.\gradlew clean build --refresh-dependencies
```
