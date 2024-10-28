# Use the official Python image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files
COPY requirements.txt requirements.txt
COPY app.py app.py
COPY functions.py functions.py
COPY templates/ templates/
COPY static/ static/
COPY data/ data/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Flask will run on
EXPOSE 8000

# Start the Flask app using Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:app"]
