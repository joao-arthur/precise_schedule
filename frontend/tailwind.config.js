module.exports = {
    mode: "jit",
    purge: ["./src/**/*.tsx"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                prm: {
                    lg3: "#87B7FF",
                    lg2: "#719EE3",
                    lg: "#5A86C7",
                    DEFAULT: "#446DAB",
                    dk: "#2D548F",
                    dk2: "#173C73",
                    dk3: "#002357",
                },
                block: "rgba(0, 0, 0, 0.1)",
                pastel: {
                    gray: "#f5f5f5",
                },
                drk: {
                    lg3: "#4a4a4a",
                    lg2: "#404040",
                    lg: "#363636",
                    DEFAULT: "#2c2c2c",
                    dk: "#212121",
                    dk2: "#171717",
                    dk3: "#0d0d0d",   
                },
            },
            flex: {
                "0-auto": "0 0 auto",
                0: "0 1 0%",
            },
            margin: {
                "-100": "-100%",
            },
            width: {
                "1/10": "10%",
                100: "400px",
                120: "500px",
            },
            maxWidth: {
                "4/5": "80%",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
            border: ["active"],
            borderColor: ["active"],
            textColor: ["active"],
            fontSize: ["active"],
        },
    },
    plugins: [],
};
