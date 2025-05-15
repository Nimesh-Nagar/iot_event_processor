# iot_event_processor

## Overview

This project implements a modular, scalable IoT Event Processing System using MQTT, Flask REST APIs, SQLite for persistent storage, and Docker Compose for deployment. It adheres to RESTful principles and ensures robust validation, logging, and inter-service communication.

The system is divided into three main services:

1. **MQTT Broker** - Manages communication between IoT devices and the system.
2. **MQTT Client** - Subscribes to sensor data topics, validates JSON payloads, and stores them in a database.
3. **REST API** - Provides device information and sensor data through HTTP endpoints.


## System Architecture 

<img>

## Setup Instructions

**Prerequisites**
- Docker
- Docker Compose

**Setup Instructions**

1. Clone the Repository:
   ```bash
   git clone https://github.com/Nimesh-Nagar/iot_event_processor.git
   cd iot_event_processor
   ```
2. Build and Start Services
   ```bash
    sudo docker-compose up --build
   ```
3. Verify Container is running
   ```bash
   sudo docker ps -a
   ```
    for flask app openbrowser and use below url
   ```
   http://localhost:5001 
   ```


**Test Cases & Example Usage** 

- Publish MQTT Messages:

via `pub_client.py`
```bash
python pub_client.py
```
or using below command
```bash
mosquitto_pub -h localhost -t /devices/events -m '{"device_id": "sensor_01", "sensor_type": "temperature", "sensor_value": 24.5, "timestamp": "2025-05-14T10:00:00Z"}'
```

- Verify Device Information
  open browser past below urls
  ```
  http://localhost:5001/api/v1/devices
  ```
- Fetch Device Events:
  ```
  http://localhost:5001/api/v1/events?device_id=1001
  ```

## API Documentation

### Base URL

```
http://<host>:5001/api/v1
```

### Endpoints

**1. List All Devices**

**GET** `/devices`

- Response:

```json
[
  {"device_id": "1001", "last_seen": "2025-03-06T10:20:30Z"}
]
```

**2. Get Device Events**

**GET** `/events?device_id=<device_id>`

- Query Params:
  - `device_id` (required): Device ID to fetch event logs.
- Response:

```json
[
  {"event_id": 1, "sensor_type": "temperature", "sensor_value": 23.4, "timestamp": "2025-03-06T10:20:30Z"}
]
```

**Error Response**

```json
{
  "error": "Missing required query parameter: ?device_id="
}
```

  



