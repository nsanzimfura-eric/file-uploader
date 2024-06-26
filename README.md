# File Uploader

File Uploader is a web application built with Next.js 14.0.0, designed to simplify the process of uploading files to a cloud storage service. It leverages the full-stack capabilities of Next.js to provide a seamless file uploading experience, including real-time feedback on upload progress, success, and failure notifications, as well as the ability to manage uploaded files

## Features

- `File Upload:` Users can upload files up to 5MB in size. For files larger than this limit, the application displays a modal indicating the file is too large.
- `Change fileName and Download file:` User can change file namebefore and after uploading the file, and the download it with the new Name.
- `Real-Time Notifications:` The app integrates with third-party APIs to send notifications at the start of an upload, upon success, and in case of failure.
- `File Management:` Users can view a list of uploaded files, download them, rename them through a modal interface, or delete them.
- `Persistence:` The state of uploaded files persists across page refreshes, ensuring data isn't lost.
- `UI Feedback:` Displays a skeleton UI when the list of files is loading, enhancing the user experience.
- `Error Handling:` Implements error boundaries to catch and display errors gracefully.

## Projects Structure
<img width="1920" height="800" alt="my VS code sreen shoot" src="https://github.com/nsanzimfura-eric/file-uploader/assets/91186046/76a905c1-b523-477c-a1e1-79af43eef1ee">

From the folder structure above: Each folder contains its specifice files accordingly
- ``app``: The main app route
- ``components``:  global app compoents such as Loading, error, Notifcation and Shadcn components in ``/ui/`` folder
- ``heplers``: Contains all the re-usable functions across the page
- ``Hooks``: Deals with custom hooks for dealing with third party api
- ``public``: Contains app public assests
- ``Server-actions``: Contains all server actions for uploading file to vercel blob, deleteing file, etc
- ``Vendor``: Contains Frontend api Routes, and you can put there backend routes if needed

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1.Clone the repository:

```bash
https://github.com/nsanzimfura-eric/file-uploader.git
```

2.Navigate into the project directory:

```bash
cd file-uploader
```

3.Install the dependencies:

```bash
npm i
```

### Running the project

4.Start the development server:

```bash
npm run dev
```

5.Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

To upload a file, simply click the "Upload File" button and select a file from your computer. If the file is larger than `5MB`, a modal will inform you of the limitation. Upon a successful upload, the file will appear in the list below, where you can download, rename, or delete it.

## Technologies

- Next.js 14.0.0
- Vercel's Blob Storage
- shadcn/ui
- TypeScript
- Tailwind-CSS
- CSS
