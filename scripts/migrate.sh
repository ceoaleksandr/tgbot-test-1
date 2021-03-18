# Notify about project running
echo "Migrating..."

# Compile project
tsc

# Run migrations
node -r dotenv/config dist/migrations.js

# Notify it`s ok
echo "Done"
