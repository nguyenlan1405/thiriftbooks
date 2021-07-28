

const { useRef, useEffect } = wp.element;


//? for getting previous props of the functional component ( useful when comparing old & new values )

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}