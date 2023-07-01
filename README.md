# PreciseSchedule

This project is a rewrite of
[an old project](https://github.com/Joao-Arthur/CursoTecnico-TCC-PreciseSchedule)
I've writen in _Java_.

It is a monorepo with backend written in _Deno_ and frontend written
in _Next.js_. I've been using this project to practice programming.

## Philosophy

The **backend** is written with the biggest care, applying DDD and an
layered architecture. The **fronend** is written using a minimal
amount of abstraction.

## Requirements

- User
  - Register
  - Login
  - Define user and general settings
  - Use Google and Facebook to register and login
  - Better password validation
  - Two factor authentication (e-mail or app)
- Calendar
  - Scroll months
  - View modes (day, week, month)
  - Total events by priority on each day cell
- Events
  - Register
  - Edit
  - Read
  - Delete
  - Filter
  - Search
- Charts
  - Read
  - Filter
  - Export to PDF
- UI
  - ✅ Dark mode
  - Responsiveness
  - Multi language support / i18n
