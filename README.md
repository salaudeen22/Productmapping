# IntelliMap: Product Name Mapping System

## Overview

IntelliMap is a product name mapping system designed to streamline the process of aligning varying product names from different suppliers to standardized product names. When your company receives purchase invoices from multiple suppliers, it can be challenging to manage the different names used for the same product. IntelliMap aims to automate and simplify this process by providing tools for manual and automatic mapping, handling text variations, and maintaining a mapping dictionary for ongoing product name consistency.

## Key Features

- **Manual Mapping**: Allows users to manually match product names with standardized product names. This is especially useful for new entries.
- **Mapping Dictionary**: Builds and maintains a dictionary for automatic matching of product names to standardized names.
- **Intelligent Matching** (under development): The system will automatically suggest product name matches based on common patterns, with a confidence score.
- **Handling Variations**: Handles text variations such as case differences, spacing, and common abbreviations.
- **Dynamic Updates**: Allows easy updates to the mapping dictionary as new variations of product names emerge.
- **Clear Feedback**: Provides real-time feedback and recommendations, ensuring users can handle edge cases or manual overrides.

## Purpose

The primary goal of IntelliMap is to improve efficiency and accuracy when dealing with product names across various suppliers. The system allows users to maintain consistency across product listings in an accounting or inventory system, thereby reducing errors and increasing the speed of data entry.

## Expected Output

Upon completing the project, IntelliMap will offer the following capabilities:
- A working prototype that allows users to match, review, and update product names.
- A mapping dictionary that can be expanded and modified as new product names and variations are added.
- A seamless user interface that displays the current mappings and allows for easy manual overrides when necessary.

## Features & Functionalities

1. **Manual Mapping**:
    - User can manually map supplier product names to standardized names.
    - Includes a simple UI for mapping products and displaying existing mappings.

2. **Mapping Dictionary**:
    - Displays all existing product mappings.
    - Supports filtering, searching, and bulk updating of product names.

3. **Intelligent Matching** (Planned Feature):
    - The system will automatically suggest potential matches for newly entered product names.
    - Displays confidence scores for each match, helping users decide whether to confirm the match. This feature is under development and will be available in a future update.

4. **Edge Case Handling**:
    - The system is designed to handle variations in product names caused by different text formats (e.g., capitalization, spacing).
    - Provides clear error messages or suggestions for corrections when no matches are found.

5. **Real-Time Feedback**:
    - Clear notifications (success, warning, error) for each action to guide users through the process.

## Technologies Used

- **Frontend**: React.js (for the user interface)
- **Backend**: Node.js with Express (for API handling)
- **Database**: MongoDB (for storing mappings and product data)
- **Search & Matching**: Fuse.js (for intelligent matching of product names)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/salaudeen22/Productmapping.git
    ```

2. **Install dependencies**:
    Navigate to the project directory and install the dependencies for both the frontend and backend.
    ```bash
    cd frontend
    npm install
    ```

    Similarly, for the backend:
    ```bash
    cd backend
    npm install
    ```

3. **Start the development server**:
    - For frontend:
        ```bash
        npm run dev
        ```

    - For backend:
        ```bash
        npm run start
        ```
