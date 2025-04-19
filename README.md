# Timeless-Bakery

## **Introduction**
**Timeless Bakery ** is a modern, full-stack web application designed to deliver an exceptional user experience for both customers and administrators. Developed with a **clean architecture and containerized infrastructure**, this platform offers a seamless interface to explore, filter, and purchase from a wide selection of premium bakery products including cookies, pastries, cakes, and more — all at affordable prices.

#### **The platform supports:**

**1) Dynamic Product Listings**: All product information is retrieved in real-time from a PostgreSQL database, ensuring accurate pricing and stock details.

**2) Advanced Filters & Sorting: **Users can browse products by category or price to easily find what they are looking for.

**3) Admin Dashboard:** A secured backend interface allows administrators to:

								a) Create, read, update, and delete (CRUD) orders

								b) Manage the full product catalog

							        c) Monitor total inventory and order activity in real-time

#### **Technical Highlights**:

**1 Full Stack with Docker Compose: ** Services for the frontend, backend, database, and Rabbit MQ (message broker) are containerized and orchestrated using Docker Compose.
**2 PostgreSQL Integration**: All data (products and orders) is stored in a structured PostgreSQL database with schema integrity.
**3 Health Checks & Service Dependencies:** Backend service waits until both RabbitMQ and PostgreSQL are healthy.

####Tech Stack:
**Frontend:** Made using HTML,CSS and JavaScript
**Backend:** Node.js with Express.js
**Database:** PostgreSQL
**Message Broker:** RabbitMQ
**Containerization and Orchestration: ** All services are containerized and orchestrated using Docker Compose with health checks. Backend service intelligently waits until both RabbitMQ and PostgreSQL are confirmed healthy before initializing.

####Key Flow:

1) Frontend interacts with backend via REST APIs.
2) Backend serves and manages products and orders, with real-time updates.
3) PostgreSQL stores all product and order-related data.
4) Docker Compose ensures containerized orchestration of services.
####API Documentation

**Several RESTful API endpoints power both user interaction and admin panel functionalities.**

 **Product Endpoints**
1) GET /api/products: Returns a list of all available products.
2) GET /api/total-products: Returns the total count of products in the system.

**Order Endpoints**
1) GET /api/orders: Returns all orders, sorted by latest first.
2) GET /api/orders/id: Returns a single order by ID.
3) POST /api/orders: Creates a new order and publishes an event to RabbitMQ.
4) PUT /api/orders/:idUpdates an existing order.
5) DELETE /api/orders/:id :Deletes an order by ID.
6) GET /api/total-orders :Returns the total number of orders.

#### Installation & Setup:
**Follow these steps to get the project up and running on your local machine using Docker.**

**1) Clone the Repository**
```bash
git clone https://github.com/Prachand07/Container-Assignment-Bakery.git
```
** 2) Navigate to the Project Directory**
```bash
cd Container-Assignment-Bakery

```
**3) Start All Services Using Docker Compose**
```bash
docker-compose up --build -d
```
This will: 

1) Build and start the frontend, backend, database, and RabbitMQ containers.

2) Wait until PostgreSQL and RabbitMQ are healthy before the backend starts.

3) Serve the bakery website at http://localhost

4) Once all containers are up and running, you can access the RabbitMQ console at:
```bash
http://localhost:15672
```
Use the Default Login Credentials
Username:  guest
Password: guest

####Conclusion
And that is the how the whole application functions. 

Thank you for testing this out and reading till the end!

[Aarush Luthra](https://www.linkedin.com/in/aarush27/ "Aarush Luthra")


