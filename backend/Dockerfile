FROM bellsoft/liberica-openjdk-alpine:25

WORKDIR /app

# Copy the built jar (produce with `mvn clean package`)
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
 