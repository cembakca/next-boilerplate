# Next Boilerplate

## Get Started

### Install Required Packages

    $ brew install node
    $ Docker install from (https://docs.docker.com/)

### Install requirements

    $ npm install

### Run the project

To run ui the project with development, Follow the following command:

    $ npm run dev

To run ui the project with development and hot reload option, Follow the following command

    $ npm run hot:dev

To run ui the project from Docker, Follow the following command
> coming soon


The options for running the project are not just that much. See more on package.json.

Now open [http://localhost:3000](http://localhost:3000).

## Understanding the Folder Structure

> Folder structure options and naming conventions for projects

    .
    ├── client                  
    ├── config                  # App environments
    ├── pages                   # Nextjs pages
    │   ├── _app.jsx  
    │   ├── _document.jsx  
    │   ├── _error.jsx 
    │   ├── 404.jsx 
    │   ├── 500.jsx 
    │   └── home.jsx                
    ├── routes                  # Express routes
    │   └── index.jsx  
    ├── server                  # Express
    │   └── index.jsx  
    ├── src                     # Source folder
    │   ├── components          # Common components used on all pages (like seo, gtm, header etc.)
    │   ├── components 
    │   │   └── pure            # Basic components (alert, button, input etc.)
    │   ├── helpers
    |   ├── redux-store         # Redux logic (optional)
    │   ├── screens
    │   ├── services 
    │   └── utils  
    ├── stories                 # storybook elements (like alert, button, input etc.)
    │  └── alert.stories.jsx  
    ├── static                  # Nextjs static folder
    ├── next.config.js          # Nextjs config
    └── README.md

## Start Storybook

> Sample component folder structure for storybook

    └── alert                
        ├── index.jsx  
        └── styles.scss 

Storybook configuration include in this project. Just running the script below will be sufficient.

    $ npm run storybook

Now open [http://localhost:9001](http://localhost:9001).

## Troubleshooting

If you encounter an error, please create a issue :)
