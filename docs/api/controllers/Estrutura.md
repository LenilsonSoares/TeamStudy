# Project Structure

TeamStudy/
├── client/
│   ├── Cadastro/
│   │   └── public/
│   │       ├── Assets/
│   │       ├── index.html
│   │       ├── main.js
│   │       └── styles.css
│   ├── Cronograma/
│   │   └── public/
│   │       ├── Assets/
│   │       ├── index.html
│   │       ├── main.js
│   │       └── styles.css
│   ├── Cursos/
│   │   └── public/
│   │       ├── Assets/
│   │       ├── index.html
│   │       ├── main.js
│   │       └── styles.css
│   ├── Dashboard/
│   │   └── public/
│   │       ├── Assets/
│   │       ├── index.html
│   │       ├── main.js
│   │       └── styles.css
│   ├── Entrar/
│   │   └── public/
│   │       ├── Assets/
│   │       ├── index.html
│   │       ├── main.js
│   │       └── styles.css
│   ├── Home/
│   │   └── public/
│   │       ├── Assets/
│   │       ├── index.html
│   │       ├── main.js
│   │       └── styles.css
│   ├── Perfil/
│   │   └── public/
│   │       ├── Assets/
│   │       ├── index.html
│   │       ├── main.js
│   │       └── styles.css
│   └── RecuperarSenha/
│       └── public/
│           ├── Assets/
│           ├── index.html
│           ├── main.js
│           └── styles.css
├── docs/
│   ├── api/
│   │   └── controllers/
│   │       └── .md
│   ├── DOCUMENTACAO.md
│   ├── README.md
│   └── Tutorial.md
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── dashboardController.js
│   │   ├── historyController.js
│   │   ├── planController.js
│   │   ├── profileController.js
│   │   ├── progressController.js
│   │   ├── scheduleController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── History.js
│   │   ├── Plan.js
│   │   ├── Progress.js
│   │   ├── Schedule.js
│   │   ├── Subscription.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── historyRoutes.js
│   │   ├── planRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── progressRoutes.js
│   │   ├── scheduleRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── sql/
│   │   └── testestudy.sql
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── course.test.js
│   │   ├── db.test.js
│   │   ├── history.test.js
│   │   ├── plan.test.js
│   │   ├── profile.test.js
│   │   ├── progress.test.js
│   │   ├── schedule.test.js
│   │   ├── setup.js
│   │   ├── task.test.js
│   │   ├── teardown.js
│   │   ├── testEmail.js
│   │   └── user.test.js
│   ├── utils/
│   │   └── errorHandler.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   ├── Procfile
│   └── server.js
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
