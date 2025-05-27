FROM node:22.16.0

# Set working directory
WORKDIR /app

# Copy app files
COPY ./frontend .

# Install dependencies
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
