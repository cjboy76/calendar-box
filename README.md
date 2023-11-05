# calender-box

## Overview

calender-box is a Google Chrome extension that integrates with Google Calendar, offering quick access to upcoming events. View event details with a single click and create new events effortlessly, inspired by work of [The Browser Company](https://thebrowser.company/).

![screenshot](https://github.com/cjboy76/calendar-box/blob/master/public/screenshot.png)

## Features

- **Upcoming Events:** Instantly access your upcoming events.
- **Event Details:** Single-click event details.
- **Quick Event Creation:** Shortcut to create new events.

## Installation

1. Clone the repository.
2. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/), create a client key and an API key. Paste these keys in the .env file. Additionally, you'll need an extension key for Google OAuth recognition.

```
VITE_API_KEY=your_google_api_key
VITE_CLIENT_ID=your_google_client_id
VITE_APP_KEY=your_app_key
```

3. Run commands below and go to chrome extensions page, clicking "Load unpacked" and select `dist/` folder.

```
pnpm install
pnpm build
```

## Usage

1. Click the extension icon in the Chrome toolbar.
2. See and interact with your events.
3. Create new events via a shortcut.
