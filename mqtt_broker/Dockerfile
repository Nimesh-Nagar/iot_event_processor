# Official mosquitto bropker image as base
FROM eclipse-mosquitto

LABEL maintainer="Nimesh Nagar"

# copying config file in container
COPY config/mosquitto.conf /mosquitto/config/mosquitto.conf
COPY log/mosquitto.log /mosquitto/log/mosquitto.log

# exposing ports for mqtt and websockets
EXPOSE 1883
EXPOSE 9001
