#
This folder contains the pages handled by Next.js framework.  
The one and the only job of the pages are `INITIAL DATA LOADING`.  
These pages `must not` contain anything except initial data loading and redirection.  
___
Use your API call `asynchronously` in the hook named `getInitialProps`.  
####The component give 2 general props to the child screen: `pageResponse` and `error`  
####`pageResponse` contains the response fetched from data source(API).  
####`error` contains the required information for something gone wrong.
___

Examples:  
1. Answer any url with with the view of 404 page  
- set the response status `res.statusCode = 404;`  
- return the error object to the child page:  
- ```error = { code: 404, description }```  
- check the prop and render the view in the child component:  
-
    ```
    if (error) {
        const { code } = error;
        return <ErrorView statusCode={code} />;
    }
    ```  
  
2.Redirect to another URL  
- get response object from props  
- use express.js' `redirect` function:    
    ```res.redirect(301, 'an existing URL here');```