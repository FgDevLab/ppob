# PPOB Backend

## Table of Contents

- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
- [Scripts](#scripts)

## Requirements

- Node.js (version 18 or higher)
- pnpm
- MySQL

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/FgDevLab/ppob.git
   cd ppob
   ```

2. **Install Dependencies**
   Install the required packages using pnpm:
   ```bash
   pnpm install
   ```

3. **Create a `.env` File**
   Create a `.env` file in the root directory of your project and add the following environment variables:

   ```env
   PORT=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   DATABASE_HOST=
   DATABASE_PORT=
   JWT_SECRET_KEY=
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_REGION=
   AWS_S3_BUCKET_NAME=
   ```

4. **Run Database Migrations**  
   Execute:

   ```bash
   pnpm run migrate
   ```

   *If the migration script fails for any reason, you can manually apply the database schema using the provided [ddl.sql](/ddl.sql) file:*  

   ```bash
   mysql -u <DATABASE_USER> -p <DATABASE_NAME> < ./ddl.sql
   ```


5. **Start the Application**
   Start the application in development mode:
   ```bash
   pnpm run dev
   ```

   Alternatively, you can start the application in production mode:
   ```bash
   pnpm start
   ```