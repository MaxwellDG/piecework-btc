export const fetcher = (...args) => {
    console.log('args? ', args);
    return fetch(...args).then((res) => res.json());
};
