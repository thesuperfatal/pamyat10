# Память10

Отдельный проект развития памяти на поддомене `memory.biznes-ip.ru`.

Сестринский сайт: [СчётИП](https://biznes-ip.ru).

## Что есть

- Лендинг
- 3 тренажёра: цифры, слова, порядок
- Программа **«7 дней»** с отметками в браузере
- Прогресс в `localStorage` (сессии, серия дней, лучшие результаты)

## Локально

```bash
npm install
npm run dev
```

Сборка статики:

```bash
npm run build
```

Результат в папке `out/`.

## Деплой на Timeweb (поддомен)

### 1. DNS (у регистратора домена biznes-ip.ru)

Добавьте запись для поддомена, например:

- тип **A** → IP сервера Timeweb (тот же, что у `biznes-ip.ru`), имя `memory`

или

- тип **CNAME** → на хост Timeweb, если так принято в панели

### 2. Сайт в панели Timeweb

1. Создайте сайт / поддомен `memory.biznes-ip.ru`.
2. Отдельная папка `public_html` — **не** смешивать с СчётИП.

### 3. GitHub Actions (как у СчётИП)

В репозитории Память10 → Settings → Secrets:

| Secret | Значение |
|--------|----------|
| `FTP_SERVER` | хост FTP Timeweb |
| `FTP_USERNAME` | логин FTP |
| `FTP_PASSWORD` | пароль FTP |
| `FTP_SERVER_DIR` | путь, напр. `/memory.biznes-ip.ru/public_html/` |

Workflow: `.github/workflows/deploy-timeweb.yml` — деплой при push в `main`.

### 4. Ручная заливка

Если без Actions: `npm run build` и залить содержимое `out/` в `public_html` поддомена.
