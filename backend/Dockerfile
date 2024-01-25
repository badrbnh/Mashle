FROM python:3.8

# Set the working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# CMD or ENTRYPOINT command
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
