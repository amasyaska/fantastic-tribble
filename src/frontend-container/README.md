# About the frontend

## Pages

- **Home**: The main page of the project.
- **Login**: User authorization form.
- **Registration**: Form for creating a new user.
- **Password Recovery**: Functionality for recovering account access.
- **Settings**: Personalization of profile and other parameters.
- **Components**: Reusable components for the project.
- **Company Management**: Page for managing company details, team members, and related projects.
- **Projects**: Page for viewing and managing projects, including assigning team members and tracking progress.
- **Tasks**: Page for viewing and managing tasks, including name, description and task statuses.

Check the latest routing configuration [here](https://github.com/amasyaska/fantastic-tribble/blob/frontend/frontend/src/configs/routes.config.ts).

## Technologies and Libraries

- **React**
- **Redux**: Global state management.
- **TypeScript**: For safer and more maintainable code.
- **shadcn/ui**: Library for building UI components.
- **react-hook-form (useForm)**: For managing forms and validation.
- **axios**: For HTTP requests.
- **tailwindcss**: For rapid and flexible styling.

## Project Structure

```plaintext
src/
├── components/            # Reusable UI and layout components
├── pages/                 # Application pages
│   ├── home/              # Home page
│   ├── auth/              # Authorization pages
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   └── forgotPassword/ # Password recovery page
│   ├── components/        # Page for displaying and testing components
│   ├── user/              # User-specific pages
│   │   ├── settings/      # Settings page
│   ├── company/           # Company management page
│   ├── projects/          # Projects management page
│   ├── tasks/             # Tasks management page
├── configs/               # Configuration files and constants
├── lib/                   # Utilities (helper functions)
├── hooks/                 # React hooks for handling component logic
├── services/              # API interaction services (axios)
├── types/                 # Types, zod schemas, and form fields
├── store/                 # Redux for global state management
├── AppRouter.tsx          # Routing logic
└── App.tsx                # Main component and providers
