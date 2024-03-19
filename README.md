# MicroBookingSuite

## Description

This project is a comprehensive reservation system, designed as a microservices architecture. It consists of the following components:

- **Booking Microservice**: Offers a full range of CRUD operations for managing bookings.
- **Authentication Microservice**: Utilizes JWT for secure user access and authentication.
- **Payment Microservice**: Integrated with Stripe to handle financial transactions securely.
- **Notification Microservice**: Sends out email confirmations for successful bookings to users.
- **Gateway Microservice**: Implements GraphQL to streamline the booking process, user creation, and access to user and transaction data.

Communication across these microservices is facilitated through RabbitMQ, ensuring a robust and scalable messaging system. Additionally, a separate branch named "grpc" contains a version that utilizes gRPC protobuf for inter-service communication. MongoDB is employed as the database solution for its flexibility and performance. The development lifecycle of this project incorporates a full CI/CD pipeline, with deployment to Google Cloud orchestrated via Kubernetes, demonstrating a modern, cloud-native application workflow.

## Installation

```bash
$ pnpm install -r
```

## Running the Application via Docker

```bash
$ docker-compose up --build
```
## Test

```bash
# e2e tests
$ pnpm run test:e2e
```

## License

Nest is [MIT licensed](LICENSE).
