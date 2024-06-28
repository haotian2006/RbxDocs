FROM mcr.microsoft.com/devcontainers/javascript-node:22 AS base
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /workspace

RUN ["apt", "update"]
RUN ["apt", "install", "-y", "curl", "unzip"]

FROM base AS bun
USER node

RUN curl -fsSL https://bun.sh/install | bash
