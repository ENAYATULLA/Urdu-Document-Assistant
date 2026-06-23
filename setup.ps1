$projectName = "urdu-document-assistant"

# Root Folder
New-Item -ItemType Directory -Force -Path $projectName

# Root Directories
$dirs = @(
    "$projectName/frontend",
    "$projectName/backend",
    "$projectName/docker",
    "$projectName/uploads",
    "$projectName/docs",

    "$projectName/backend/app",
    "$projectName/backend/app/api",
    "$projectName/backend/app/api/v1",
    "$projectName/backend/app/core",
    "$projectName/backend/app/models",
    "$projectName/backend/app/schemas",
    "$projectName/backend/app/repositories",
    "$projectName/backend/app/services",
    "$projectName/backend/app/ai",
    "$projectName/backend/tests",

    "$projectName/frontend/app",
    "$projectName/frontend/components",
    "$projectName/frontend/hooks",
    "$projectName/frontend/services",
    "$projectName/frontend/types",
    "$projectName/frontend/utils",
    "$projectName/frontend/public"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# Root Files
$rootFiles = @(
    "$projectName/.env",
    "$projectName/.env.example",
    "$projectName/.gitignore",
    "$projectName/docker-compose.yml",
    "$projectName/README.md",
    "$projectName/Makefile"
)

foreach ($file in $rootFiles) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

# Backend Files
$backendFiles = @(
    "$projectName/backend/requirements.txt",
    "$projectName/backend/Dockerfile",
    "$projectName/backend/.env",
    "$projectName/backend/app/main.py",
    "$projectName/backend/app/core/config.py",
    "$projectName/backend/app/core/security.py"
)

foreach ($file in $backendFiles) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

# Frontend Files
$frontendFiles = @(
    "$projectName/frontend/Dockerfile",
    "$projectName/frontend/package.json",
    "$projectName/frontend/next.config.ts",
    "$projectName/frontend/.env.local"
)

foreach ($file in $frontendFiles) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

Write-Host ""
Write-Host "========================================"
Write-Host " Urdu Document Assistant Structure Created"
Write-Host "========================================"
Write-Host ""

tree $projectName /F


// Structure 

D:.
│   .env
│   .env.example
│   .gitignore
│   docker-compose.yml
│   Makefile
│   README.md
│   
├───backend
│   │   .env
│   │   Dockerfile
│   │   requirements.txt
│   │   
│   ├───app
│   │   │   main.py
│   │   │   
│   │   ├───ai
│   │   ├───api
│   │   │   └───v1
│   │   ├───core
│   │   │       config.py
│   │   │       security.py
│   │   │       
│   │   ├───models
│   │   ├───repositories
│   │   ├───schemas
│   │   └───services
│   └───tests
├───docker
├───docs
├───frontend
│   │   .env.local
│   │   Dockerfile
│   │   next.config.ts
│   │   package.json
│   │   
│   ├───app
│   ├───components
│   ├───hooks
│   ├───public
│   ├───services
│   ├───types
│   └───utils
└───uploads