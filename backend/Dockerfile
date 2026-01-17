FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    && rm -rf /var/lib/apt/lists/*
RUN wget -O- https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:${PATH}"
RUN poetry --version

COPY backend/pyproject.toml backend/poetry.lock backend/README.md ./
COPY backend/* /app/
RUN poetry install

RUN poetry env activate
CMD ["poetry", "run", "python3", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]