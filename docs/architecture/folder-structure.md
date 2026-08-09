LMS-Platform/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── server.js
│   │   │   │   ├── worker.js
│   │   │   │   └── bootstrap/
│   │   │   ├── config/
│   │   │   ├── shared/
│   │   │   │   ├── utils/
│   │   │   │   ├── constants/
│   │   │   │   ├── errors/
│   │   │   │   └── middleware/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── student/
│   │   │   │   ├── teacher/
│   │   │   │   ├── course/
│   │   │   │   ├── lecture/
│   │   │   │   ├── enrollment/
│   │   │   │   ├── payment/
│   │   │   │   └── notification/
│   │   │   ├── routes/
│   │   │   ├── jobs/
│   │   │   ├── workers/
│   │   │   └── tests/
│   │   └── package.json
│   │
│   └── frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── router/
│       │   │   ├── store/
│       │   │   └── providers/
│       │   ├── shared/
│       │   │   ├── ui/
│       │   │   ├── hooks/
│       │   │   ├── services/
│       │   │   ├── utils/
│       │   │   └── styles/
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   ├── student/
│       │   │   │   ├── dashboard/
│       │   │   │   ├── courses/
│       │   │   │   └── lectures/
│       │   │   ├── teacher/
│       │   │   │   ├── dashboard/
│       │   │   │   ├── courses/
│       │   │   │   └── lectures/
│       │   │   └── common/
│       │   ├── layouts/
│       │   ├── pages/
│       │   └── routes/
│       └── package.json
│
├── packages/
│   ├── shared/
│   │   ├── types/
│   │   ├── constants/
│   │   └── validators/
│   └── ui/
│
├── infra/
│   ├── docker/
│   ├── nginx/
│   └── env/
│
└── docs/