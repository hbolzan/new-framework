const trace = x => {
    console.log(x);
    return x;
};

const isPromise = x => x?.then ? true : false;
const first = x => ( _.isArray(x) && x.length ) > 0 ? x[0] : null;

export { trace, isPromise, first };
