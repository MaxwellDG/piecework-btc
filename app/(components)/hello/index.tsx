import React from 'react';

export default function Hello() {
    const getGreeting = React.useMemo((): React.ReactElement => {
        // var entries = Object.entries(GREETINGS)
        // const choice = entries[(entries.length * Math.random()) << 0]
        return (
            <>
                {/* <h1 className="text-5xl font-bold">{choice[1]}</h1>
                <p>{choice[0]}</p>
                <p>{"Used as a greeting"}</p>
                <p>{`${choice[1]} world`}</p> */}
                <h1 className="text-8xl font-bold">Hello</h1>
                <span className="flex items-center mb-6">
                    <p>english - </p>
                    <p className="text-xl">/həˈləʊ,hɛˈləʊ/</p>
                </span>
                <p>{'Used as a greeting'}</p>
                <p className="italic">{`"Hello World"`}</p>
            </>
        );
    }, []);

    return <div className="mr-12 mb-8">{getGreeting}</div>;
}
