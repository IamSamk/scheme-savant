
# Public Assets

This directory contains public assets for the application:

- `placeholder.svg` - Default SVG placeholder for images that fail to load
- `favicon.ico` - Application favicon 

## Image Loading Strategy

The application now uses real Unsplash images referenced from the `imageUtils.ts` utility file, with proper error handling in place. Each category of scheme has its own appropriate image, and mentor avatars are consistently assigned.

If any image fails to load, the application will fall back to either the category-specific default or the main default image.
