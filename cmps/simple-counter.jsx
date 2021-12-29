export function SimpleCounter() {
    var val = 10;

    return <section className="simple-counter">
        <h1>
            <button>-</button>
            {val}
            <button>+</button>
        </h1>
    </section>
}
