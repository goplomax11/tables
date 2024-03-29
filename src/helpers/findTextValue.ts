const textKeys = ["title", "description", "name"];

export const findTextKeyValue = <T extends Record<string, string>>(obj: T) => {
    const key = Object.keys(obj).find((key: string) => textKeys.includes(key))
    return key ? [key, obj[key]] : ["", ""]
}
