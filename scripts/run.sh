# Clear the console
clear

# Export NODE_ENV
export NODE_ENV="production"

# Notify about project running
echo "Running project in Production Mode"

# Check if .env file found
if [ ! -f ".env" ]; then
  echo "No .env file found"
  exit 1
fi

# Compile project
tsc

# Run the project
node -r dotenv/config
