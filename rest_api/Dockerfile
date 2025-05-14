# Official Python image as base
FROM python:3.9-slim

LABEL maintainer="Nimesh Nagar"

# Set working directory inside container
WORKDIR /rest_api

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire Flask application into the container
COPY . .

# Expose port 5001 for Flask API
EXPOSE 5001

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run the Flask application
CMD ["python3", "app.py"]
