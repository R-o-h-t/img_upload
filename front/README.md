# Image Uploader

This is a simple image uploader application. It consists of a frontend built with Lit and Vite, and a backend built with FastAPI.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Docker Compose

### Installing

1. Clone the repository
```bash
git clone https://github.com/R-o-h-t/img_upload
```

2. Navigate to the project directory
```bash
cd image-uploader
```

3. Build and run the Docker containers
```bash
docker-compose up --build
```

The frontend will be available at `http://localhost:80`, and the backend at `http://localhost:8000`.

## Usage

To upload an image, select a file and click the "Upload" button. The uploaded file will appear in the list below the button.

## Built With

- [FastAPI](https://fastapi.tiangolo.com/) - The web framework used for the backend
- [Uvicorn](https://www.uvicorn.org/) - The ASGI server used
- [Lit](https://lit.dev/) - The web framework used for the frontend
- [Vite](https://vitejs.dev/) - The build tool used for the frontend

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
