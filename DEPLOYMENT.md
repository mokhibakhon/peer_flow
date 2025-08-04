# Deploying Peer Flow to Vercel

This guide will help you deploy the Peer Flow application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **OpenAI API Key**: Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

## Deployment Steps

### 1. Prepare Your Repository

Make sure your code is pushed to a GitHub repository.

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Environment Variables

In your Vercel project settings, add these environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key

### 4. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. You'll get a URL like `https://your-project.vercel.app`

## Important Notes

### Database
- The application uses CSV files for data storage (not suitable for production)
- For production, consider using a proper database like PostgreSQL or MongoDB
- Vercel's serverless functions have read-only filesystem access

### API Routes
- All API routes are in `app/api/` directory
- They run as serverless functions on Vercel
- File-based storage (CSV) works but has limitations

### Environment Variables
- Set `OPENAI_API_KEY` in Vercel dashboard
- Local development: create `.env.local` file

## Local Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your OpenAI API key

# Run development server
pnpm dev
```

## Production Considerations

1. **Database**: Replace CSV storage with a proper database
2. **Authentication**: Implement proper session management
3. **File Storage**: Use cloud storage for any file uploads
4. **Environment Variables**: Set all required env vars in Vercel

## Troubleshooting

- Check Vercel build logs for errors
- Ensure all environment variables are set
- Verify API routes are working correctly
- Check function timeout limits (default 10s) 