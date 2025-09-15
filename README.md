

```markdown
# Payment Processing System

This implements a payment processing system that includes crad validation, card auth,merchant onboarding, transaction handling, authentication, payouts, refunds, chargebacks, and fraud detection.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
  - [Payment Processing](#payment-processing)
  - [Merchant Onboarding](#merchant-onboarding)
  - [Transactions](#transactions)
  - [Payouts](#payouts)
  - [Chargebacks](#chargebacks)
  - [Disputes](#disputes)
  - [Fraud Detection](#fraud-detection)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)

- [mechant subscribers] (#Merchant Subscribers (Recurring Payments))

## Features

- Secure payment processing using card tokens
- Merchant onboarding and subscription handling
- Transaction recording and management
- Payout handling for merchants
- Chargeback and dispute management
- Fraud detection and risk handling
- Webhook support for real-time updates

## Architecture

The system is built using Node.js, Express.js, and MongoDB. It includes various modules for authentication, payment processing, and merchant management. The primary components are:

- **Controllers**: Handle incoming requests and business logic.
- **Models**: Define the data structure and interactions with MongoDB.
- **Middlewares**: Implement authentication and authorization.
- **Utilities**: Include functions for tokenization, encryption, and card validation.

## API Endpoints

### Payment Processing

- **Endpoint**: `POST /api/payment`
- **Description**: Process a payment using the merchant's payment method.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`

- **Request Body**:
  ```json
  {
      "merchantId": "<MERCHANT_ID>",
      "developerApiKey": "<DEVELOPER_API_KEY>",
      "paymentMethod": {
          "card": {
              "number": "4111111111111111",
              "expiry": "12/25",
              "cvv": "123"
          }
      },
      "amount": {
          "value": 100.00,
          "currency": "USD"
      },
      "description": "Payment for Order #12345",
      "metadata": {
          "orderId": "12345",
          "customerId": "67890"
      }
  }
  ```

- **Responses**:
  - **200 OK**:
    ```json
    {
        "message": "Successfully charged $100.00 to the card.",
        "authData": {...},         // Authentication response
        "tokenData": {...},        // Tokenized card data
        "transaction": {...},      // Transaction details
        "payout": {...}            // Payout details
    }
    ```
  - **400 Bad Request**:
    ```json
    {
        "error": "INVALID_CARD",
        "message": "Card details are invalid."
    }
    ```
  - **403 Forbidden**:
    ```json
    {
        "error": "invalid_api_key",
        "message": "Invalid merchant or API key."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
        "error": "INTERNAL_SERVER_ERROR",
        "message": "An error occurred while processing the payment."
    }
    ```

### Merchant Onboarding

- **Endpoint**: `POST /api/merchants`
- **Description**: Create a new merchant account.
- **Request Body**:
  ```json
  {
      "name": "Merchant Name",
      "email": "merchant@example.com",
      "apiKey": "your_developer_api_key"
  }
  ```

### Transactions

- **Endpoint**: `GET /api/transactions`
- **Description**: Retrieve a list of transactions for a specific merchant.
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Query Parameters**:
  - `merchantId=<MERCHANT_ID>`
  
### Payouts

- **Endpoint**: `POST /api/payouts`
- **Description**: Process a payout for a merchant.
- **Request Body**:
  ```json
  {
      "merchantId": "<MERCHANT_ID>",
      "amount": 100.00
  }
  ```

### Chargebacks

- **Endpoint**: `POST /api/chargebacks`
- **Description**: Create a chargeback request.
- **Request Body**:
  ```json
  {
      "transactionId": "<TRANSACTION_ID>",
      "reason": "Fraudulent transaction"
  }
  ```

### Disputes

- **Endpoint**: `POST /api/disputes`
- **Description**: Create a dispute for a transaction.
- **Request Body**:
  ```json
  {
      "transactionId": "<TRANSACTION_ID>",
      "details": "Dispute details here"
  }
  ```

### Fraud Detection

- **Endpoint**: `POST /api/fraud-detection`
- **Description**: Analyze a transaction for potential fraud.
- **Request Body**:
  ```json
  {
      "transactionId": "<TRANSACTION_ID>",
      "amount": 100.00,
      "cardDetails": {
          "number": "4111111111111111",
          "expiry": "12/25",
          "cvv": "123"
      }
  }
  ```

## Authentication

This API uses JWT for authentication. Merchants must provide a valid token in the `Authorization` header for protected routes.

## Usage Examples

### Example of Processing a Payment

```bash
curl -X POST http://your-api.com/api/payment \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{
    "merchantId": "<MERCHANT_ID>",
    "developerApiKey": "<DEVELOPER_API_KEY>",
    "paymentMethod": {
        "card": {
            "number": "4111111111111111",
            "expiry": "12/25",
            "cvv": "123"
        }
    },
    "amount": {
        "value": 100.00,
        "currency": "USD"
    },
    "description": "Payment for Order #12345",
    "metadata": {
        "orderId": "12345",
        "customerId": "67890"
    }
}'
```

## Error Handling

The API provides meaningful error messages to help diagnose issues. Common error responses include:

- `400 Bad Request`: Indicates invalid input data.
- `403 Forbidden`: Indicates an authentication or authorization issue.
- `500 Internal Server Error`: Indicates a server-side issue.

Sure! Below is a section for handling merchant subscribers (customers with recurring payments) that you can add to the `README.md`. I'll also provide a sample `package.json` file.

### Merchant Subscribers (Recurring Payments)

This section covers how to manage merchant subscribers who have recurring payment plans. You can set up subscriptions for merchants, handle payment cycles, and manage cancellations.

#### API Endpoints for Merchant Subscribers

1. **Create Subscription**

   - **Endpoint**: `POST /api/subscriptions`
   - **Description**: Create a new subscription for a merchant.
   - **Request Body**:
     ```json
     {
         "merchantId": "<MERCHANT_ID>",
         "planId": "<PLAN_ID>",
         "paymentMethod": {
             "card": {
                 "number": "4111111111111111",
                 "expiry": "12/25",
                 "cvv": "123"
             }
         },
         "billingCycle": "monthly",  // or "yearly"
         "amount": 50.00,             // Subscription amount
         "currency": "USD"
     }
     ```

   - **Responses**:
     - **201 Created**:
       ```json
       {
           "message": "Subscription created successfully.",
           "subscriptionId": "<SUBSCRIPTION_ID>",
           "status": "active"
       }
       ```
     - **400 Bad Request**:
       ```json
       {
           "error": "INVALID_SUBSCRIPTION",
           "message": "Invalid subscription details."
       }
       ```

2. **Retrieve Subscriptions**

   - **Endpoint**: `GET /api/subscriptions`
   - **Description**: Retrieve a list of subscriptions for a specific merchant.
   - **Headers**:
     - `Authorization: Bearer <JWT_TOKEN>`
   - **Query Parameters**:
     - `merchantId=<MERCHANT_ID>`

   - **Responses**:
     - **200 OK**:
       ```json
       [
           {
               "subscriptionId": "<SUBSCRIPTION_ID>",
               "status": "active",
               "planId": "<PLAN_ID>",
               "amount": 50.00,
               "billingCycle": "monthly",
               "nextPaymentDate": "2024-11-01"
           }
           // More subscriptions...
       ]
       ```

3. **Cancel Subscription**

   - **Endpoint**: `DELETE /api/subscriptions/:subscriptionId`
   - **Description**: Cancel an existing subscription.
   - **Headers**:
     - `Authorization: Bearer <JWT_TOKEN>`

   - **Responses**:
     - **200 OK**:
       ```json
       {
           "message": "Subscription canceled successfully."
       }
       ```
     - **404 Not Found**:
       ```json
       {
           "error": "SUBSCRIPTION_NOT_FOUND",
           "message": "The subscription does not exist."
       }
       ```

### Example of Creating a Subscription

```bash
curl -X POST http://your-api.com/api/subscriptions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{
    "merchantId": "<MERCHANT_ID>",
    "planId": "<PLAN_ID>",
    "paymentMethod": {
        "card": {
            "number": "4111111111111111",
            "expiry": "12/25",
            "cvv": "123"
        }
    },
    "billingCycle": "monthly",
    "amount": 50.00,
    "currency": "USD"
}'
```

