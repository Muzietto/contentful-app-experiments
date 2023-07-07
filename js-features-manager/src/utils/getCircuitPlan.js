export function getCircuitPlan(circuitPlan) {
  if (circuitPlan.fields.circuitId) {
    return circuitPlan;
  }
  // create new circuit/plan
  const fields = { ...circuitPlan.fields, circuitId: '' };
  return { ...circuitPlan, fields };
}
