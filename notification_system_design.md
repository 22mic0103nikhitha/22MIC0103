# Campus Notifications System Design

## Overview

This project implements a Campus Notifications Microservice that fetches notifications from the evaluation API, prioritizes them based on notification type and recency, and displays the top 10 priority notifications. The solution integrates a reusable logging middleware that records all important actions from the first function written in the application.

## Folder Structure

```text
22MIC0103/
├── logging_middleware/
│   ├── logger.js
│   └── test.js
├── notification_app_be/
│   ├── stage1.js
│   ├── package.json
│   └── package-lock.json
├── notification_app_fe/
├── notification_system_design.md
├── .gitignore
└── README.md

## Logging Middleware Design

A reusable asynchronous function Log(stack, level, packageName, message) is implemented in logging_middleware/logger.js.

## Responsibilities
Sends logs to the evaluation logging API.
Uses Bearer token authentication.
Records informational, debugging, and error messages.
Is integrated from the first function written in the test.

## Parameters
stack: frontend
level: info, debug, warn, error, fatal
packageName: api, page, component, utils, state
message: descriptive text message
Stage 1: Priority Notification Processing

## Objective

Fetch notifications from the API and display the top 10 notifications based on priority.

## Notification Priority Weights
Notification Type	Weight
Placement	3
Result	2
Event	1

## Processing Steps
Fetch notifications from the API.
Assign a priority weight based on the notification type.
Sort notifications by:
Higher priority weight first.
More recent timestamp first.
Select the first 10 notifications.
Display the results in the terminal.
Sorting Logic

If two notifications have different types, the notification with the higher weight is prioritized. If both notifications have the same type, the more recent notification is prioritized.

Time Complexity
Fetching notifications: O(n)
Sorting notifications: O(n log n)
Selecting top 10: O(10)

Overall complexity: O(n log n)

API Endpoints Used
Authentication API
POST /evaluation-service/auth
Logging API
POST /evaluation-service/logs
Notifications API
GET /evaluation-service/notifications
Error Handling

The application handles:

Invalid or expired authorization tokens
Network failures
Unexpected API response formats

All errors are logged using the logging middleware.

Assumptions
Notifications contain Type, Message, Timestamp, and ID fields.
Notification types are limited to Event, Result, and Placement.
The access token is valid.
Future Frontend Design

The frontend application will be built using React and Material UI.

Features
Display all notifications
Display top priority notifications
Filter by notification type
Pagination support
Viewed/unviewed highlighting
Logging middleware integration for all major actions

Conclusion

The system follows a modular architecture with a reusable logging middleware and a priority-based notification processing module. This design ensures maintainability, scalability, and compliance with the assessment requirements