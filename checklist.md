# Project Checklist

Random thoughts and concerns while on development. Finished items will have ✅ mark beside it.

### New Features

- Inter-page loading state.
- Cloud storage implementation for image uploads. Or you can use Cloudinary too.
- New pet form cancellation to also delete the uploaded images from Cloudinary. Stop the clutter!
- Pet form loading state.
  - Image upload.
  - Image delete.
  - Form submission.
- Pet form image changes to also update the database.  
  Imagine a scenario where the user make changes to image input while editing an existing pet data, but then the user cancels it. If one of the image is deleted, and you don't make changes to the image list in the data itself, it will break the data.

  Or maybe you can create a cache system where it won't delete any image until the user decide whether to proceed or cancel with the data edit.

### Fix/Refactor

- Write documentation for REST endpoints.
- Form button isSubmitting state.
- Incorrect redirection to login page when cookie is still valid.  
  Same with Crustecan Warrior app, find a better way to initialize user's login state on first load.
