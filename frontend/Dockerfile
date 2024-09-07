# Use an official Nginx image
FROM nginx:alpine

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the React build output to the appropriate directory
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
