# ===== BUILD STAGE =====
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn

# 🔥 FIX QUYỀN CHẠY mvnw
RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline

COPY src src
RUN ./mvnw clean package -DskipTests


# ===== RUN STAGE =====
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
