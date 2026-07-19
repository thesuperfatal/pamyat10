# Память10

Отдельный проект развития памяти на поддомене `memory.biznes-ip.ru`.

- Репозиторий: https://github.com/thesuperfatal/pamyat10  
- Сестринский сайт: [СчётИП](https://biznes-ip.ru)

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

## Деплой

Сейчас сайт доступен как раздел СчётИП: **https://biznes-ip.ru/memory/**  
(сборка с `NEXT_PUBLIC_BASE_PATH=/memory`, заливка через workflow СчётИП).

Позже на поддомене `memory.biznes-ip.ru` — собирать **без** basePath.  
Инструкция по поддомену: **[DEPLOY-TIMEWEB.md](./DEPLOY-TIMEWEB.md)**.
