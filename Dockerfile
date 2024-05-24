# Используем базовый образ Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Указываем порт, который будет слушать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["node", "server.js"]
