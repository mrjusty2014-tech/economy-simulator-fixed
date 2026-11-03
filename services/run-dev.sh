#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/services/docker-compose.dev.yml"
API_DIR="$ROOT_DIR/services/api"
WEBSITE_DIR="$ROOT_DIR/services/Roblox/Roblox.Website"
FRONTEND_DIR="$ROOT_DIR/services/2016-roblox-main"

if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose is required to start the local PostgreSQL and Redis services." >&2
  exit 1
fi

docker compose -p economy-simulator-dev -f "$COMPOSE_FILE" up -d --wait

if [[ ! -x "$API_DIR/node_modules/.bin/knex" ]]; then
  (cd "$API_DIR" && npm ci)
fi

if [[ ! -f "$FRONTEND_DIR/config.json" ]]; then
  cp "$FRONTEND_DIR/config.development.example.json" "$FRONTEND_DIR/config.json"
fi

if [[ ! -x "$FRONTEND_DIR/node_modules/.bin/next" ]]; then
  (cd "$FRONTEND_DIR" && npm ci)
fi

(cd "$API_DIR" && ./node_modules/.bin/knex migrate:latest)

DOTNET_PID=""
NEXT_PID=""
cleanup() {
  trap - EXIT INT TERM
  [[ -z "$DOTNET_PID" ]] || kill "$DOTNET_PID" 2>/dev/null || true
  [[ -z "$NEXT_PID" ]] || kill "$NEXT_PID" 2>/dev/null || true
  [[ -z "$DOTNET_PID" ]] || wait "$DOTNET_PID" 2>/dev/null || true
  [[ -z "$NEXT_PID" ]] || wait "$NEXT_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

(
  cd "$WEBSITE_DIR"
  ASPNETCORE_ENVIRONMENT=Development \
  HCaptcha__DisableInDevelopment=true \
  Directories__AdminBundle="$ROOT_DIR/services/admin/public" \
  dotnet run --no-launch-profile
) &
DOTNET_PID=$!

(
  cd "$FRONTEND_DIR"
  npm run dev
) &
NEXT_PID=$!

echo "Website: http://localhost:5000"
echo "Frontend: http://localhost:3000"
wait -n "$DOTNET_PID" "$NEXT_PID"