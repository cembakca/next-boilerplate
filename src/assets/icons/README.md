#There is something important below:  
 
There is two types of SVG asset usage:  
The first one is babel loader. You can directly import `SVG` files like components.  

The second and the `recommended` one is `svgr` library.

`svgr` takes the list of `svg` files inside a folder and transforms them into `React Components`.  

For the detailed information use link below:  
[SVGR Library on npm](https://www.npmjs.com/package/@svgr/cli)  
 
Sample usage:  
```<Icon name="AddCircleOutline" black />```

