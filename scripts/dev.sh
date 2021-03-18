# Clear the console
clear

# Export NODE_ENV
export NODE_ENV="development"

# Notify about project running
echo "Running project in Development Mode"

# Check if .env file found
if [ ! -f ".env" ]; then
  echo "No .env file found"
  exit 1
fi

# Run the project
nodemon
