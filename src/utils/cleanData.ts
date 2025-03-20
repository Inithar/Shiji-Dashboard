export function cleanData<T extends Record<string, any>>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => {
      return value !== undefined && value !== null && value !== "";
    })
  ) as Partial<T>;
}
