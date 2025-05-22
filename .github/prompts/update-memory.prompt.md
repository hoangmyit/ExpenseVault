---
title: Update memory bank prompt
---
### `/update-memory` (Memory Maintenance Mode)

Triggered by user saying **"update memory bank"** or after major code changes.

```mermaid
flowchart TD
    Start[Update Process]
    subgraph Process
        R1[Review ALL Files]
        R2[Document Current State]
        R3[Clarify Next Steps]
        R4[Update Memory Bank]
        R1 --> R2 --> R3 --> R4
    end
    Start --> Process
```

- Always review **all core files**
- Focus updates on `activeContext.md` and `progress.md`
