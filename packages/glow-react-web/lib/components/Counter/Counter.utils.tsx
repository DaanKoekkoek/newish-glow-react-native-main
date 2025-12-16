export const isUnitPassed = (
  unit: string,
  units: { unit: string }[],
  remainingTime: { [key: string]: number },
) => {
  const unitNames = units.map((u) => u.unit);
  const currentUnitIndex = unitNames.indexOf(unit);
  const higherUnits = unitNames.slice(0, currentUnitIndex);
  const higherUnitsAreZero = higherUnits.every(
    (higherUnit) => remainingTime[higherUnit] === 0,
  );

  return remainingTime[unit] === 0 && higherUnitsAreZero;
};

export const getCounterUnits = (
  variant: string,
  digits: number,
  digitDaysLabel = "Dagen",
) => {
  if (variant === "default") {
    return digits === 1
      ? [{ unit: "days", label: digitDaysLabel }]
      : [
          { unit: "days", label: "Dagen" },
          { unit: "hours", label: "Uur" },
          { unit: "minutes", label: "Min." },
          { unit: "seconds", label: "Sec." },
        ].slice(-digits);
  }

  if (variant === "hoursOnly") {
    return [
      { unit: "hours", label: "" },
      { unit: "minutes", label: "" },
    ];
  }

  return [];
};
