---
sidebar_position: 4
---

# Installation

To run ODE you need two things: a **server** (Synkronus) that stores and syncs data, and a **client** on each device (Formulus or another app) that collects data and talks to the server.

## What to install

| Component | What it is | Guide |
|-----------|------------|--------|
| **Server (Synkronus)** | Backend that hosts the API, portal, and database. Runs on a Linux server or VPS. | [Install Synkronus](installation/installing-synkronus) |
| **Client (Formulus)** | Mobile app for Android that field workers use to fill forms and sync data. | [Install Formulus](installation/installing-formulus) |

Install the server first so that the client has something to connect to. Then install Formulus (or your client app) on each device and point it at your Synkronus server.

## Next steps

- **[Install Synkronus](installation/installing-synkronus)** — Set up the server on a Linux machine or VPS.
- **[Install Formulus](installation/installing-formulus)** — Put the Formulus app on Android devices and connect it to your server.
