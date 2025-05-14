FROM python:3.9.21-alpine3.21
LABEL maintainer="Nimesh Nagar"

# Set working directory inside container
WORKDIR /mqtt_client

# Copy the entire mqtt client application into the container
COPY db.py .
COPY requirements.txt .
COPY sub_client.py .
COPY validator.py . 

# installing all dependency
RUN pip install --no-cache-dir -r requirements.txt

# Environment variables for the broker
ENV BROKER_HOST=mosquitto-broker

# Run the subscriber script
CMD ["python3", "sub_client.py"]
