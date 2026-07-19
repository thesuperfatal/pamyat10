# Деплой Память10 на Timeweb

Сайт: **https://memory.biznes-ip.ru**  
Репозиторий: **https://github.com/thesuperfatal/pamyat10**  
Сестринский проект: [СчётИП](https://biznes-ip.ru)

После настройки: каждый `git push` → сайт обновляется сам (~2–3 мин).

---

## Шаг 0. Поддомен в Timeweb

1. Панель Timeweb → добавь сайт / поддомен **`memory.biznes-ip.ru`**.
2. DNS у домена `biznes-ip.ru`: запись **A** (или CNAME) для имени `memory` на тот же хостинг.
3. В файловом менеджере появится отдельная папка, например `/memory.biznes-ip.ru/public_html/`.

Пока поддомен не создан, деплой заливать некуда — сначала шаг 0.

---

## Шаг 1. FTP-данные

Те же, что у СчётИП (обычно один FTP-аккаунт):

| Параметр | Где взять |
|----------|-----------|
| **Сервер** | Timeweb → Подключение / FTP |
| **Логин** | Timeweb → FTP |
| **Пароль** | Timeweb → FTP |
| **Папка** | `/memory.biznes-ip.ru/public_html/` |

---

## Шаг 2. Секреты в GitHub

1. Открой: https://github.com/thesuperfatal/pamyat10/settings/secrets/actions
2. **New repository secret** — добавь:

| Имя | Значение |
|-----|----------|
| `FTP_SERVER` | хост FTP (без `ftp://`) — **тот же**, что у СчётИП |
| `FTP_USERNAME` | логин FTP |
| `FTP_PASSWORD` | пароль FTP |
| `FTP_SERVER_DIR` | `/memory.biznes-ip.ru/public_html/` |

Значения секретов из СчётИП API **не отдаёт** — скопируй их вручную из панели Timeweb или из secrets СчётИП (если помнишь).

---

## Шаг 3. Запуск деплоя

### Автоматически
Push в `main`:

```powershell
cd "C:\Мое\сайты\проект\memory"
git push
```

### Вручную
1. https://github.com/thesuperfatal/pamyat10/actions  
2. **Deploy Memory10 to Timeweb** → **Run workflow**

---

## Шаг 4. Проверка

1. Actions → зелёная галочка  
2. https://memory.biznes-ip.ru  
3. Ctrl+F5  

---

## Если деплой красный

- неверный FTP или путь `FTP_SERVER_DIR`
- поддомен ещё не создан в Timeweb
- DNS не успел обновиться (подожди 5–30 мин)
