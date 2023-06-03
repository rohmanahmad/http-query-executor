# Commbank Frontend Installation

## Preparation
- install nodejs v10+

## How to Install (for development only)

- unzip
- move to working folder (workspace)
- npm i
- create/edit .env
    ```
    MIX_NODE_ENV=development

    MIX_APP_DOMAIN=localhost
    MIX_APP_PORT=6001
    APP_ID=2|pJpqk7Lh0lMUmFqDNHFHQoaY2sKBsDKlD9RJGDda
    APP_BASE_URL=127.0.0.1:6001
    MIX_APP_PROTOCOL=http

    MIX_IDLE_TIMEOUT=IDLE_TIMEOUT_SECOND
    ```
- npm run dev

## How to Install (build for production)
- unzip
- move to working folder (workspace)
- npm i
- create/edit .env from .env-prod
    ```
    MIX_NODE_ENV=production

    # build
    MIX_PREFIX_APP_PATH=/ 
    MIX_PROXY_URL_BASE=AJAX_BASE_API_URL  # AJAX_BASE_API_URL change to domain (commbank-api) with http/https

    MIX_IDLE_TIMEOUT=IDLE_TIMEOUT_SECOND
    ```
- npm run build
- all of build files are ready on "public" folder. just copy into directory server and setup webserver as usual