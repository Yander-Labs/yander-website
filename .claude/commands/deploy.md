# Pre-Deploy Checklist

Commands and checks to run before deploying to production.

## Build & Lint Commands

```bash
# Check for TypeScript errors and build
npm run build

# Check for linting issues
npm run lint

# Verify dev server works
npm run dev
```

## Environment Variables

### Required for Production

```
NEXT_PUBLIC_SANITY_PROJECT_ID=s3r1d2vt
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Vercel Configuration

Set in Vercel Dashboard → Project → Settings → Environment Variables

## Sanity CORS Origins

Add production domain to Sanity:
1. Go to https://www.sanity.io/manage
2. Select project `s3r1d2vt`
3. Navigate to API → CORS Origins
4. Add production URL (e.g., `https://yander.io`)

## Pre-Deploy Checklist

### Code Quality
- [ ] `npm run build` passes without errors
- [ ] `npm run lint` passes
- [ ] No TypeScript errors in IDE
- [ ] No console.log statements in production code

### Content
- [ ] All blog posts have images and excerpts
- [ ] Categories are properly assigned
- [ ] Author profiles are complete

### Testing
- [ ] Homepage loads correctly
- [ ] All sections render properly
- [ ] Blog listing page works
- [ ] Individual blog posts render
- [ ] Search and filtering work
- [ ] Mobile responsive design verified
- [ ] Links work (no 404s)

### Sanity Studio
- [ ] `/studio` loads correctly
- [ ] Can create/edit content
- [ ] CORS configured for production domain

### Performance
- [ ] Images optimized (using Sanity CDN)
- [ ] No large bundle warnings
- [ ] Lighthouse score acceptable

## Deployment

### Vercel (Recommended)

```bash
# Push to main branch triggers auto-deploy
git push origin main
```

Or manual deploy:
```bash
vercel --prod
```

### Post-Deploy Verification

1. Visit production URL
2. Check homepage loads
3. Verify `/blog` works
4. Test `/studio` authentication
5. Check mobile version
6. Verify social sharing metadata

## Rollback

If issues found:
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

Or use Vercel Dashboard → Deployments → Rollback
