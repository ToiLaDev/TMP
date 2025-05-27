FROM node:20

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
