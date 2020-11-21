# Configuration Technique
We are using 'node-config' library to manage environment.
'node-config' has its own resolution order. See it in the link
  - https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order

It uses environment variable `NOVE_ENV` to determine which config file to be used.
But for the aspect Next.js, `NOVE_ENV` must be only `PRODUCTION` or `DEVELOPMENT`.
So, there is another environment variable `CONFIG_ENV` to pass requested config file to 'node-config'.

You can see the `package.json` to getting up the project.

After all, 'node-config' overrides the selected config with the environment variables defined in `custom-environment-variables`.

Note: Don't trust dev.json. It is your local config. So, don't push it if there is no major change.