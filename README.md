
# Mashle: Digital Culinary Experience

Welcome to Mashle, a dynamic restaurant platform that blends culinary excellence with digital innovation. This README provides an overview of the project, its features, and instructions for getting started.

## Features

- **Dynamic Menu**: Browse through a diverse menu offering a fusion of traditional and innovative dishes.
- **Seamless Ordering**: Place orders conveniently through our user-friendly interface.
- **Personalized Recommendations**: Receive tailored suggestions based on your preferences and past orders.
- **Efficient Backend**: Powered by Python/Django, ensuring scalability and reliability.
- **Sleek Frontend**: Developed with React/TypeScript for an intuitive user experience.
- **Secure Authentication**: JWT authentication safeguards sensitive data and features.

## Technologies Used

- **Backend**: Python, Django
- **Frontend**: React, TypeScript
- **Database**: MySQL
- **API**: RESTful
- **Authentication**: JWT

## ERD

![drawSQL-mashle-export-2024-01-31](https://github.com/badrbnh/Mashle/assets/81806381/bb73461b-1322-46a6-884f-e82a374e3b7f)

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/mashle.git
   ```

2. **Install Dependencies**:
   ```bash
   cd mashle
   npm install # For frontend dependencies
   pip install -r requirements.txt # For backend dependencies
   ```

3. **Database Setup**:
   - Create a MySQL database and configure the settings in `settings.py`.

4. **Run the Server**:
   - Backend:
     ```bash
     python manage.py runserver
     ```
   - Frontend:
     ```bash
     npm run dev
     ```

5. **Access the Application**:
   - Visit `http://localhost:****` in your browser to access the Mashle platform.

## Contributing

Contributions are welcome! Feel free to open issues for any bugs or feature requests. Pull requests are also appreciated.

## License

This project is licensed under the [MIT License](LICENSE).
