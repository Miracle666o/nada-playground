# Nada Playground

An open-source, interactive web app for writing, running, and sharing Nada programs.

## Features

- CodeMirror 6 editor with Python/Nada syntax highlighting
- Dynamic inputs: name, Nada type, value, and party
- Program outputs and error display
- Preloaded examples: Addition, Multiplication, Comparison, Voting, and Subtraction
- Reset, shareable URL, and GitHub program/YAML loader
- Nillion Testnet program storage integration scaffold

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

Fill `.env.local` from `.env.example` with valid Nillion cluster and payment settings before Testnet execution or storage.

## Important

Compilation requires a server runtime that provides the Nada compiler (`pynadac`/`jsnadac`) and the execution route must be adapted to the installed Nillion SDK version and credentials. Do not expose private keys through `NEXT_PUBLIC_*` variables.

## License

MIT
