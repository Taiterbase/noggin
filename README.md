# Noggin

Noggin is a cross-platform native application that helps you organize your notes and sync them across your devices.

## Develop
Noggin was built using Rust and TypeScript. It uses a SQLite database for local storage and syncs your updates with a database in the sky ☁️ so you can pick up where you left off whenever, wherever.

## To Run
Install [Yarn](https://yarnpkg.com/getting-started/install)
```
1. git clone https://github.com/Taiterbase/nextjs-web-template.git
2. cd nextjs-web-template
3. yarn install
4. yarn export
5. yarn dev
```

Make sure to run `yarn export` to generate the static files Tauri will read from.
In another terminal, run:

```
1. cargo build
2. cargo run
```

Enjoy your new native Markdown editor!