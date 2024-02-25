## Endpoints

### Auth endpoints

1. User registration
2. Confirmation
3. Login
4. Forget/Reset password

   1. Email the reset pwd link
   2. Change password on webpage redirected through link in email.

5. Change email
6. Confimation of email
7. Forget identifier/email - Regex

### Story endpoints

1. create story
   If logged-in user hitting the endpoint, story will be created with random slug.
2. Update the story
3. Delete the story(ies)
4. Read the story - by id or slug
   - If published and not blocked, give back publicly available
   - Else only author and admin/sub-admin can access.
5. Publish story - only if rules in DB are followed on story.
6. Get the stories with advance pagination

### Comment

1. Comment on story
2. Reply to comment
3. Update the comment
4. Delete the comment
5. Get primary/secondary comments (pagination)

### Story Reading List

1. Create
2. Add Single story to list(s).
3. Remove story from list(s).
4. Delete List
5. Update the list title
6. Change order
7. Get my list (pagination)
8. Get list stories(pagination)

### Like

1. Like story
2. Dislike story

### Profile

7. Change profile/username

1. Me
1. Update profile except email/phone number(these two updation will be held in auth routers)
1. GET /all Admin access
1. Block someone Admin access
1. Delete user(s)
1.

### Client side navigation

- /
- /login
- /register
- /resetPassword
- /confirmEmail
- /
