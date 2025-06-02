# Dockerfile
FROM python:3.12.0

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y build-essential libpq-dev gcc \
    && apt-get clean

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# Recolecta archivos estáticos
# RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "db_jugadores.wsgi:application", "--bind", "0.0.0.0:8000"]
