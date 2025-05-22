---
title: Action Prompt
---
### `/act` (Execution Mode)

Used when asked to implement something.

```mermaid
flowchart TD
    Start[Start] --> Context[Read Memory Bank]
    Context --> Update[Update if Needed]
    Update --> Execute[Execute Task]
    Execute --> Document[Document Changes]
```

- **Execution must follow the approved plan steps sequentially**.
- After completing each step:
  - State which step was completed (referencing its number and description).
  - Describe the outcome.
  - Confirm the next step.
  - Mention overall progress (e.g., "Step 3 of 5 completed").

Combine instructions with any markdown checklist provided by the user.

If anything is unclear, **ask for clarification** before proceeding.
