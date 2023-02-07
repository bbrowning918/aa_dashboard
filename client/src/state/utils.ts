export const rehydrateLocalStorage = (
    key: string,
    defaultValue: object | string | unknown[]
) => {
    const item = localStorage.getItem(key);
    return (item && JSON.parse(item)) ?? defaultValue;
};
