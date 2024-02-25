export const typeOf = (
  val: any,
  type: string | "string" | "array" | "object"
) =>
  !val ? false : val?.constructor?.name?.toLowerCase() === type.toLowerCase();
