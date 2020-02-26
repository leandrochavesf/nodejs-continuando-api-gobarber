# Módulo 03 - Continuando API do GoBarber (Passo 56)

## Ambiente e conceitos

### Lesson: "Configurando Estrutura"

1. Start package.json with Yarn
   `yarn init -y`

2. Install Express to help in routes on Node.JS
   `yarn add express`

3. Create `src` forlder, and inside make files route.js, app.js and server.js

4. Make a constructor of `Class App` in app.js, and yout functions
   `Middlewares` and `Routes`

### Lesson: "Nodemon e Sucrase"

5. Install Sucrase (Babel alternative) to enable use `import` instead of `const`
   `yarn add sucrase -D`

6. Install Nodemon to monitore and autoreload application in developmente mode.
   `yarn add nodemon -D`

7. Make changes of `imports` on files to JS6 import/export

8. Make file `nodemon.json` to work with sucrase

9. Dev the script `dev` on package.json

10. And configure script `dev:debug` to debug the app on VSCode

11. Open or create launch.json on VSCode Debug to configure to run with sucrase and nodemon

### Lesson: "Configurando Docker"

12. Install Docker and create a container with command above.
    `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

13. Install Postbird, connect on container and create a database with name `gobarber`

### Lesson: "ESLint, Prettier e EditorConfig"

14. Install eslint to standadize the code
    `yarn add eslint -D`

15. Run eslint
    `yarn eslint --init`

16. The eslint download dependences on npm, so we exclude file `package-lock.json`
    and run `yarn` on terminal to update dependences list.
    `yarn`

17. Install ESlint plugin on VSCode

18. Write the code below on settings.json of VSCode to autofix with eslint

```json
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  },
  "[javascriptreact]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  }`
```

19. Add rules of eslint on .eslintrc.js

```js
  rules: {
    'class-methods-use-this': 'off',
    'no-params-reassign': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  }
```

20. Install prettier and auxiliar dependences
    `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`

21) Add prettier to extends, plugins and rules in `.eslintrc`

```js
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  }
```

22. Create .prettierrc file to overwirte some rules of eslint.

```js
  {
    "singleQuote": true,
    "trailingComma": "es5"
  }
```

23. To fix all the files with eslint, run:
    `yarn eslint --fix src --ext .js`

24. Install editor config plugin for VSCode

25. Create and configure .editorconfig on VSCode, pay attention to:

```json
  trim_trailing_whitespace = true
  insert_final_newline = true
```

### Lesson: "Configurando Sequelize"

26. Create folder and files:
    src/config/database.js
    src/database/migrations
    src/app/controllers
    src/app/models

27. Install Sequelize dependence to work with ORM databases
    `yarn add sequelize`

28. Install sequelize-cli to facilitate model creation
    `yarn add sequelize-cli -D`

29. Create file .sequelizerc to configure paths of sequelize on app

## Cadastro e autenticação de usuários

### Lesson: "Migration de usuário"

30. To use postgres with sequelize, instal pg dependences
    `yarn add pg pg-hstore`

31. Go to `src/config/database.js` and configure parameters to use sequelize

32. Run sequelize-cli to create migration of users
    `yarn sequelize migration:create --name=create-users`

33. Developer fields of each column of table on migration

34. Run migration via CLI to migrate fields to database
    `yarn sequelize db:migrate`

35. If I want return a migrate, i can run:
    `yarn sequelize db:migrate:undo`

### Lesson: "Model de usuário"

36. Create model of User in app/models/User.js

### Lesson: "Criando loader de models"

37. Create database/index.js to make connection with BD

38. Import database/index.js in app.js file.

### Lesson: "Cadastro de usuários"

39. Create a controller of User in app/controller/UserController.js
    function Store to add a new User on database,

40. Import UserController in Routes.js to configure a route to add User.

41. Code a test to identify double entry on database in moment of add User

42. We don't need return all parameters, so We wipe some parameters to return in
    UserController.store()

### Lesson: "Gerando hash da senha"

43. Install bcrypt to create hashs of passwords
    `yarn add bcryptjs`

44. Code the model User to make hash on passwords of users in models/User.js

### Lesson: "Autenticação JWT"

45. Install Json Web Token to work with JWT
    `yarn add jsonwebtoken`

46. Create method store on Controller `app/controlllers/SessionController.js`

47. Create function checkpassword to compare hashs in Model User.

48. Create a route `/session` in routes.js to access SessionController

49. Create `config/auth.js` file to put autentication data of application.

### Lesson: "Middleware de autenticação"

49. Create a Middleware to intercept requests and verify authorization
    `app/middlewares/auth.js`

50. In `auth.js` we get the bearer token, split then and use promisify to convert
    a old promises in a new ecms2015 format using async/await.

51. With the token decoded, we atribute id to req.userId and call `next()`.

52. In `routes.js`, import middleware auth and use to protect routes.

### Lesson: "Update do usuário"

53. Create function update on `UserController.js` to make some checks and update
    the user in case of pass for checks.

### Lesson: "Validando dados de entrada"

54. Install Yup Schema Validation to work with validations on functions of app.
    `yarn add yup`

55. Apply the funcionality where there is user input, as in UserController and SessionController

## Envio de arquivos

### Lesson: "Configurando Multer"

56. Install multer to work with multpart form data and files
    `yarn add multer`

57. Create afolder `tmp/uploads` in root app

58. Create a config of multer in `app/config/multer.js`

59. Code multer to replace filename with a random string and persist in tmp/upload folder.

60. Import multer and your config in routes.js and configure a route `/files`

### Lesson: "Avatar do usuário"

61. Create a FileCOntroller.js and adjust routes.js to call this Controller

62. With migrations, create a new table in BD to Files
    `yarn sequelize migration:create --name=create-files`

63. Configure migration `create-files` and run migration through the CLI
    `yarn sequelize db:migrate`

64. Create a model `File.js` to Files

65. Import File model in index.js on `/app/database/index.js`

66. Code FileController to insert data of File in BD

67. With migrations, create a column to relate User with File in BD `users`
    `yarn sequelize migration:create --name=add-avatar-field-to-users`

68. Run again migrate through the CLI
    `yarn sequelize db:migrate`

69. Create a associate `belongsTo` in Model User

70. Configure in `/app/database/index.js` a map to `associate` created

## Funcionalidade de agendamentos

### Lesson: "Listagem de prestadores de serviço"

71. Create a ProviderController in `app/controllers/ProviderController.js`

72. Create a index function in ProviderController to return only providers

73. In model User, configure a slug to `avatar_id` with the tag `as`

74. Configure routes.js to accept a route get to ProviderController

75. Create a virtual field in Model File to available an avatar URL

76. Declare in `app.js` a middleware to allow static files for `/files`

### Lesson: "Migration e model de agendamento"

77. Create a migration of appointments
    `yarn sequelize migration:create --name=appointments`

78. Run again migrate through the CLI
    `yarn sequelize db:migrate`

79. Create a model for appointments and inside, put your associate.

80. Don't forget to add Appointments in list models on `app/database/index.js`

### Lesson: "Agendamento de serviço"

81. Create a AppointmentController and function Store

82. In AppointmentController.store, check if provider_id is Provider

83. Configure routes.js to permite post with AppointmentController

### Lesson: "Validações de agendamento"

84. Install date-fns library to work with dates
    `yarn add date-fns@next`

85. In AppointmentController.store, code checks to dates send by user using date-fns
    Check past dates and avaliability

### Lesson: "Listando agendamentos do usuário"

86. Create routes in `routes.js` to permit user get index list of Appointment

87. Create a index function on AppointmentController.js

88. Code this index function to return attributes of Provider and related File

### Lesson: "Aplicando paginação"

89. In AppointmentController.js, code limit and offset to permit pagination

### Lesson: "Listando agenda do prestador"

90. Create a ScheduleController.js to permit a Provider to get your schedule list

91. Create routes in `routes.js` to permit user get index list of Schedule

## Envio de notificações

### Lesson: "Configurando MongoDB"

92. Now, we instantiate a NoSQL DB, for this, we use docker with a command below
    to install a MogoDB Container
    `docker run --name mongobarber -p 27017:27017 -d -t mongo`

93. Install ORM library to communcate with MongoDB
    `yarn add mongoose`

94. Configure a connection with MongoDB in database/index.js

### Lesson: "Notificando novos agendamentos"

95. To work with NoSQL BDs, we need to create Schemas, what is similar to models
    in your funcionality, where they determine how the data are inject in DB.
    For this, we create a configure a file `app/schemas/notification.js`

96. In Appointmentcontroller.store, apply a notify appointment provider inserting
    content and provider_id in Mongo DB

97. Download MongoDB Compass Community to view data on MongoDB

### Lesson: "Listando notificações do usuário"

98. In `routes.js`, create a route to get data in `NotificationController.index`

99. Create `app/controllers/NotificationController.js` e configure a index method to
    list notifications

### Lesson: "Marcar notificações como lidas"

100. In `routes.js`, create a route to update data in `NotificationController.update`

101. Create a method `NotificationController.update` e configure this to set read notifications

## Cancelamento e envio de e-mail

### Lesson: "Cancelamento de agendamento"

102. Create a method AppointmentController.destroy to delete an appointment

103. Create routes in `routes.js` to permit user delete an appointment

### Lesson: "Configurando Nodemailer"

104. Install nodemailer
     `yarn add nodemailer`

105. Create a file `app/config/mail.js` and add your configurations.

106. Create a mailtrap account and add configs of host, pass and user to `config/mail.js`

107. Create `lib/Mail.js` with the funcionality to send emails

108. Configure AppointmentController.js to send email in your related methods

### Lesson: "Configurando templates de e-mail"

109. Install Handlebars to work with templates in HTML more custom to emails
     `yarn add express-handlebars nodemailer-express-handlebars`

110. Import new libs in `lib/Mail.js`

111. Create the files and folders above, and code then.
     app/views/emails/layouts
     app/views/emails/partials
     app/views/emails/cancellation.hbs

112. In AppointmentController.destroy, configure to permite send emails using templates

### Lesson: "Configurando fila com Redis"

113. To put the send email funcionality in a paralel job, we can use Redis, to this:
     `docker run --name redisbarber -p 6379:6379 -d -t redis:alpine`

114. Install

115. Install the queue management tool for use with Redis
     `yarn add bee-queue`

     Obs: In more ingenious situations, where queuing management with more resources
     is needed, kue can be used.

116. Create a file `app/jobs/CancellationMail.js`

117. Create a file of Redis Config in `config/Redis.js`

118. Create a file `lib/Queue.js`

119. Configure in AppointmentController the new funcionalities

120. Create file `./queue.js` to permit run in a new instance of node of Queues funcionality

121. Don`t forget add a Queue in package.json to run with sucrase

### Lesson: "Monitorando falhas na fila"

122. To monitore errors in queue, we use bee.on in `lib/Queue.js` and code a handleFailure function

### Lesson: "Listando horários disponíveis"

123. Configure `routes.js` to permite receive Available status and call AvailableController.index

124. Create a file `app/controllers/AvailableController.js` and configure to check
     and returna available schedules.

### Lesson: "Campos virtuais no agendamento"

125. Modify `models/Appointments.js` to init `past` variable in a VIRTUAL field

126. Modify `models/Appointments.js` to init `cancelable` variable in a VIRTUAL field

127. Modify `AppointmentController.index` to return `past` and `cancelable` attributes

## Configurações avançadas

### Lesson: "Tratamento de exceções"

128.  Implement Sentry to monitore exceptions in App, folow comands on Sentry panel
      like the next steps below.
      `yarn add @sentry/node@5.7.0`

129.  Create afile `config/sentry.js` and add the DSN given by Sentry panel

130.  Import Sentry on `app.js`

131.  Install the extention to capture erros given by async on express and import on `app.js`
      `yarn add express-async-errors`

132.  Put `this.server.use(Sentry.Handlers.requestHandler())` in middleware()

133.  Put `this.server.use(Sentry.Handlers.errorHandler())` in the last line of route() method

134.  Install Youch to take care excepetionHandler in app.js
      `yarn add youch`

135.  Create function `exceptionHandler()` and put on final of constructor to intercept
      errors and return to user in API status

### Lesson: "Variáveis ambiente"

136. Install dotenv to load environment variables in application
     `yarn add dotenv`

137. Import dotenv in `app.js`, `queue.js` and `config/database.js`

138. Create a `.env` file in root of app and put all variables possible of app

139. Add `.env` in `.gitignore`

140. Apply environment variables in files below
     app/models/File.js - APP_URL
     app.js - NODE_ENV
     config/auth.js - APP_SECRET
     config/database.js - DB_HOST, DB_USER, DB_PASS, DB_NAME
     database/index.js - MONGO_URL
     config/redis.js - REDIS_HOST, REDIS_PORT
     config/mail.js - MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS
     config/sentry.js - SENTRY_DSN

141. Add a `.env.example` to facilitate in sharing instructions to run app
