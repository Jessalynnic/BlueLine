# BlueLine

**BlueLine** is a police department database system focused on managing criminal records. Built as a full-stack web application, it includes a responsive UI, and advanced search views for criminal data.

## 🔧 Tech Stack

- **Frontend:** React, Tailwind CSS, HTML, JavaScript (`/blueline`)
- **Backend:** Node.js, Express (`/backend`)
- **Database:** PostgreSQL
- **Features:** PDF export, dynamic views (table & card), search filters

## 📦 Current Features

- 🔍 Search and filter criminal records
- 🧩 Toggle between table and card views
- 📱 Responsive, user-friendly interface

## 🌱 Planned Features

- 🧑‍🤝‍🧑 Manage employees and job titles
- 🗂️ Track active cases linked to criminals
- 🏢 Organize departments and divisions
- 📝 Audit logging and user roles (admin/staff)

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- PostgreSQL
- Git

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/Jessalynnic/Blueline
   cd Blueline

2. Install Backend (Express) Dependencies
   ```bash
   cd backend
    npm install

3. Install Frontend (React) Dependencies
   ```bash
   cd blueline
    npm install

## 🗄️ PostgreSQL Setup
You can set up the database using either the terminal (psql), the pgAdmin GUI, or by using the provided Node.js script.

### ✅ Recommended: Use the Node.js Script
From the backend directory:

1. If you've configured your `.env` file (see below), you can initialize the database schema with:
   ```bash
   npm run db:init
   
Option 1: Using psql (command-line)

1. Open terminal and start PostgreSQL and connect to it:
   ```sql
   psql -U your_user
   
2. Create the database:
   ```sql
   CREATE DATABASE blueline;

3. Load the schema:
   ```sql
   psql -d blueline -f backend/database/schema.sql

Option 2: Using pgAdmin (GUI)

1. Open pgAdmin and log in.

2. Right-click on Databases → Create → Database...

3. Name the database blueline and click Save.

4. Click on the new blueline database in the sidebar:

    - Open the Query Tool

    - Load and run the loadschema.sql file from database/

## 🔑 Environment Setup

1. In the backend/ folder, create a .env file:
    ```bash
   DB_USER=your_user
    DB_HOST=localhost
    DB_NAME=blueline
    DB_PASSWORD=your_password
    DB_PORT=5432
    PORT=5050

2. Add .env to .gitignore to keep credentials secure.

## 📁 Project Structure

```sql
  BLUELINE/
    ├── backend/           # Express backend + PostgreSQL scripts
    │   ├── database/
    │   ├── routers/
    │   ├── .env
    │   ├── server.js
    │   └── package.json
    ├── blueline/          # React frontend
    │   └── package.json
    ├── .gitignore
    └── README.md
```

## 📁 Application Demo
▶️ Watch on YouTube (https://youtu.be/CvQYy2LgWEc)


## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to add or improve.
