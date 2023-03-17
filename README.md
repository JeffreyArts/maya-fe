# Maya frontend

Create Maya inspired symbols with speech. This tool requires to also run maya-backend to generate and store the generated images and prompts with Strapi

## Getting started

To get the project up and running, execute the following commands;

```
$ npm install
$ npm run dev

or

$ yarn install
$ yarn dev
```

To build the project for production, run the following command:
```
$ npm run build 

or 

$ yarn build
```
This will build the project, and output the files to the dist directory.



After installation you will have to generate an [OpenAI key](https://platform.openai.com/account/api-keys) and add it to the .env file
```
VITE_OPENAI_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

This project also requires the [gsap-bonus.tgz file](https://greensock.com/forums/topic/35838-installation-of-bonus-plugins-with-typescript-support/#comment-179619). Which can be obtained by purchasing a Greensock license.




Please note that if you want to run this project in a server to use a https connection, otherwise the browser will most likely refuse to ask for permission to get access to your microphone

You can also customise the `deploy.sh` file with the correct (SSH) login credentials and the desired directory location. So you can deploy the project easily with a single command:

```
$ npm run deploy 

or 

$ yarn deploy
```


## [License](https://github.com/JeffreyArts/create-jeff-backend/blob/master/LICENSE)

Copyright © 2023 <Jeffrey Arts>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
