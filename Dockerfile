FROM node:20.15.1

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Database URL hosted on Supabase
ENV DATABASE_URL="postgresql://postgres.xkacxfwodqhnndaqvqvs:damilola780*@aws-0-eu-west-2.pooler.supabase.com:5432/postgres"

# Google Gemini API Key
ENV GOOGLE_API_KEY=AIzaSyAUdi2z2cpkG-GTgEIzhoq9_pBPoNcZ8u0

# Copy Prisma files and generate client
COPY prisma ./prisma
RUN npx prisma generate
RUN npx prisma migrate deploy

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
