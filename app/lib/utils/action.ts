export function getFieldArrayFormData(
  name: string,
  key: string,
  formData: FormData
) {
  const fieldArray: { [key: string]: FormDataEntryValue | null }[] = [];

  for (let i = 0; ; i += 1) {
    const arrayEntryName = `${name}.${i}.${key}`;
    const value = formData.get(arrayEntryName);

    if (!value) break;
    fieldArray.push({ [key]: value });
  }

  return fieldArray;
}
