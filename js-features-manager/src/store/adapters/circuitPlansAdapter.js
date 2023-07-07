import { createEntityAdapter } from '@reduxjs/toolkit';

const circuitPlansAdapter = createEntityAdapter({
  selectId: (entry) => entry.sys.id,
  sortComparer: (a, b) =>
    (a.fields.circuitId || '').localeCompare(b.fields.circuitId || '') ||
    (a.fields.planId || '').localeCompare(b.fields.planId || ''),
});

export default circuitPlansAdapter;
