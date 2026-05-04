"use client";

import { useState, useRef, useEffect } from "react";

const ReadMore = ({ text, lines = 3, more = "Afficher plus", less = "Afficher moins", ...props }) => {


    const [expanded, setExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const check = () => setIsClamped(el.scrollHeight > el.clientHeight);

        check();

        const observer = new ResizeObserver(check);
        observer.observe(el);
        return () => observer.disconnect();
    }, [text, lines]);

    return (
        <div>
            <p
                ref={textRef}
                style={{
                    margin: 0,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: expanded ? "unset" : lines,
                    lineHeight: "1.3",
                }}
                {...props}
            >
                {text}
            </p>
            {isClamped || expanded ? (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        marginTop: 6,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500,
                    }}
                >
                    {expanded ? less : more}
                </button>
            ) : null}
        </div>
    );
};

export default ReadMore;