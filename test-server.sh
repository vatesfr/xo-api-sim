#!/usr/bin/env zsh

# Test script for the mock API server

echo "Testing mock API server..."

# Test basic endpoint
echo "\n1. Testing /ping endpoint:"
curl -s http://localhost:3001/ping | jq .

# Test VM list
echo "\n2. Testing /test/vms endpoint:"
curl -s http://localhost:3001/test/vms | jq .

# Test specific VM
echo "\n3. Testing /test/vms/vm-1 endpoint:"
curl -s http://localhost:3001/test/vms/vm-1 | jq .

# Test unknown VM
echo "\n4. Testing /test/vms/unknown endpoint:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/test/vms/unknown 

echo "\nAll tests completed."
