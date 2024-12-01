# PreciseSchedule

A schedule system.

## Structure

### backend

Written in **Deno**, trying to apply **DDD** with an **layered architecture**.

### automation

Tests the main functionality of the backend.

### lib_repeat_events

Isolated _node_ library that contains the logic to calculate repeating events,
using the new **Temporal API**.

### frontend_core

Provides the **domain** types and functionality to the frontend, so the UI is
isolated from testable code.

### frontend

Written in **Next.js** with the minimal abstraction of logic, applying **atomic
design**.

> At the end of the project I decided to make the frontend standalone from the
> backend, as there is no real need for an backend in such a dumb application
> with no real users.

## Future TODOs

- `backend`
  - Password hashing
  - Save user theme and language
  - Recover account
  - Update password
  - Validate user age
  - No events in past
  - Export and import events in _ICalendar_ format
  - Use a database
- `lib_repeat_events`
  - weekend repeat
  - begin and end date for repetitions
- `frontend`
  - user preference for language
  - session
  - multiple calendar views (day, week, year)
  - highlight current day
  - Do not display the events of the day in the calendar, only in the sidebar
  - Charts with statistics for the number and categories of events
  - Search events
