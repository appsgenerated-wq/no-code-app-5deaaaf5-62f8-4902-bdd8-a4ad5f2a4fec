# FlavorFusion - A Manifest-powered Recipe App

FlavorFusion is a modern, full-stack recipe sharing application built entirely with React and Manifest. It provides a seamless experience for users to discover, create, and share their favorite recipes.

## Features

- **User Authentication**: Secure user sign-up and login.
- **Recipe CRUD**: Create, Read, Update, and Delete recipes.
- **Image Uploads**: Add a photo to each recipe.
- **Rich Text Support**: Format ingredients and instructions with lists, bolding, etc.
- **Ownership Policies**: Users can only edit or delete their own recipes.
- **Admin Panel**: A complete backend interface for managing users, recipes, and reviews, available at `/admin`.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Manifest (auto-generated REST API, database, and admin panel)
- **SDK**: `@mnfst/sdk` for all frontend-backend communication.

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Manifest account and project

### Setup

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd flavorfusion
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root of the project and add your Manifest backend URL:
    ```
    VITE_BACKEND_URL=your-manifest-backend-url
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

### Default Credentials

- **Demo User**: `demo@example.com` / `password`
- **Admin Panel**: Access at `your-manifest-backend-url/admin` with `admin@manifest.build` / `admin`.