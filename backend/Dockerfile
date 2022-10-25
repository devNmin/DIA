FROM openjdk:8-jdk-alpine
RUN addgroup -S seungh1024 && adduser -S seungh1024 -G seungh1024
USER seungh1024:seungh1024
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]