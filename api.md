BASE URL: http://192.168.1.21:5000

AUTHENTICATION

`POST` http://192.168.1.21:5000/api/auth/login
```json
{ "username": "string", "password": "string" }
```

SCHOOLS

`POST` http://192.168.1.21:5000/api/schools/
```json
{ "name": "string", "code": "string", "cbse_affiliation_no": "string", "admin_username": "string", "admin_password": "min 6 chars" }
```

`GET` http://192.168.1.21:5000/api/schools/

`PATCH` http://192.168.1.21:5000/api/schools/:id/status
```json
{ "status": "pending | active | suspended | expired" }
```

`PATCH` http://192.168.1.21:5000/api/schools/:id/admin-status
```json
{ "is_active": true }
```

`PATCH` http://192.168.1.21:5000/api/schools/:id/admin-reset-password
```json
{ "new_password": "min 6 chars" }
```

STUDENTS

`POST` http://192.168.1.21:5000/api/students/complete-profile
```json
{ "name": "string", "phone": "string (optional)" }
```

`GET` http://192.168.1.21:5000/api/students/me

`POST` http://192.168.1.21:5000/api/students/auto-create
```json
{ "class_id": 1, "sections": [ { "section_id": 1, "count": 10 } ] }
```

`GET` http://192.168.1.21:5000/api/students/

`PATCH` http://192.168.1.21:5000/api/students/:id/move
```json
{ "section_id": 1 }
```

`PATCH` http://192.168.1.21:5000/api/students/:id/status
```json
{ "is_active": true }
```

TEACHERS

`POST` http://192.168.1.21:5000/api/teachers/complete-profile
```json
{ "name": "string", "phone": "string", "designation": "string", "experience": 5 }
```

`GET` http://192.168.1.21:5000/api/teachers/me

`POST` http://192.168.1.21:5000/api/teachers/
```json
{ "username": "string" }
```

`GET` http://192.168.1.21:5000/api/teachers/

`PATCH` http://192.168.1.21:5000/api/teachers/:id/status
```json
{ "is_active": true }
```

PARENTS

`POST` http://192.168.1.21:5000/api/parents/admin/parents
```json
{ "body": { "username": "string", "links": [ { "student_id": 1, "relation_type": "mother" } ] } }
```

`POST` http://192.168.1.21:5000/api/parents/admin/parents/link
```json
{ "body": { "parent_user_id": 1, "student_id": 1, "relation_type": "father" } }
```

`PATCH` http://192.168.1.21:5000/api/parents/parents/profile
```json
{ "body": { "name": "string", "phone": "string" } }
```

`GET` http://192.168.1.21:5000/api/parents/dashboard?limit=10&offset=0

`POST` http://192.168.1.21:5000/api/admin/parents/bulk-approve
```json
{ "body": { "parent_ids": [1, 2], "action": "approve" } }
```

SECTIONS

`POST` http://192.168.1.21:5000/api/sections
```json
{ "body": { "class_id": 1, "name": "A", "capacity": 40 } }
```

`GET` http://192.168.1.21:5000/api/classes/:class_id/sections

`PATCH` http://192.168.1.21:5000/api/sections/:id/status
```json
{ "body": { "is_active": true } }
```

APPROVALS

`PATCH` http://192.168.1.21:5000/api/teachers/profile/request
```json
{ "profile_fields": "..." }
```

`POST` http://192.168.1.21:5000/api/admin/teachers/:teacher_id/approve

`PATCH` http://192.168.1.21:5000/api/students/profile/request
```json
{ "profile_fields": "..." }
```

`POST` http://192.168.1.21:5000/api/teachers/students/:student_id/approve

`GET` http://192.168.1.21:5000/api/teachers/approvals/pending?class_id=...

ATTENDANCE

`POST` http://192.168.1.21:5000/api/teachers/attendance
```json
{ "body": { "class_id": 1, "section_id": 1, "date": "YYYY-MM-DD", "records": [ { "student_id": 1, "status": "present" } ] } }
```

`GET` http://192.168.1.21:5000/api/teachers/attendance/summary?class_id=1&from_date=...

`GET` http://192.168.1.21:5000/api/teachers/attendance/analytics?from_date=...&student_id=...

AUDIT & BULK

`GET` http://192.168.1.21:5000/api/admin/audit-logs?entity_type=student&limit=10

`POST` http://192.168.1.21:5000/api/admin/teachers/bulk-approve
```json
{ "body": { "teacher_ids": [1, 2], "action": "approve" } }
```