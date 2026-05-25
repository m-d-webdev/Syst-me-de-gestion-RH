"use client"
import { useRef, useState, useEffect } from "react";
import Dialog from "./Global/Dialog";
import { BrushCleaning, X } from "lucide-react";

export default function SignaturePadButton({ disabled, onSave, isSigned = false }) {
    const [menuOpen, setmenuOpen] = useState(false);

    return (
        <>
            <button
                disabled={disabled}
                className={`flex w-full mt-1 md:mt-0 md:w-fit justify-center text-center  gap-2 p-2 disabled:opacity-50 px-2 ${isSigned ? "bg-green-500/20 border-green-500  " : "bg-accent "}  rounded-md border border-foreground/10`}
                onClick={() => setmenuOpen(true)}>
                signature
                {
                    isSigned
                        ? <i className="bi  text-green-600 bi-check-circle"></i>
                        : <i className="bi bi-pen"></i>
                }
            </button>
            {
                menuOpen &&
                <SignaturePad
                    onSave={sv => {
                        onSave(sv);
                        setmenuOpen(false);
                    }}
                    onClose={() => setmenuOpen(false)}
                />
            }
        </>
    );
}


function SignaturePad({ onClose, onSave = () => { } }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [penColor, setPenColor] = useState("#1a1a2e");
    const [penSize, setPenSize] = useState(2);
    const [exportStatus, setExportStatus] = useState(null); // null | 'copied' | 'downloaded'
    const [showOutput, setShowOutput] = useState(false);
    const [svgString, setSvgString] = useState("");
    const lastPos = useRef(null);
    // Track all strokes as SVG path data: [{d, color, width}]
    const strokesRef = useRef([]);
    const currentPathRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.fillStyle = "#fafaf7";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const getPos = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if (e.touches) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY,
            };
        }
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        };
    };

    const startDraw = (e) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        const pos = getPos(e, canvas);
        setIsDrawing(true);
        setIsEmpty(false);
        setShowOutput(false);
        setExportStatus(null);
        lastPos.current = pos;
        // Start a new stroke
        currentPathRef.current = {
            d: `M ${pos.x.toFixed(1)} ${pos.y.toFixed(1)}`,
            color: penColor,
            width: penSize,
        };
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, penSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = penColor;
        ctx.fill();
    };

    const draw = (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const pos = getPos(e, canvas);
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        // Append to current SVG path
        if (currentPathRef.current) {
            currentPathRef.current.d += ` L ${pos.x.toFixed(1)} ${pos.y.toFixed(1)}`;
        }
        lastPos.current = pos;
    };

    const endDraw = () => {
        if (isDrawing && currentPathRef.current) {
            strokesRef.current.push({ ...currentPathRef.current });
            currentPathRef.current = null;
        }
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fafaf7";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        strokesRef.current = [];
        currentPathRef.current = null;
        setIsEmpty(true);
        setShowOutput(false);
        setSvgString("");
        setExportStatus(null);
    };

    const buildSVG = () => {
        const canvas = canvasRef.current;
        const w = canvas.width;
        const h = canvas.height;
        const paths = strokesRef.current
            .map(
                (s) =>
                    `<path d="${s.d}" stroke="${s.color}" stroke-width="${s.width}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
            )
            .join("\n  ");
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n  ${paths}\n</svg>`;
    };


    const handleSave = () => {
        const svg = buildSVG();
        setSvgString(svg);
        setShowOutput(true);
        onSave(svg);
        navigator.clipboard.writeText(svg).then(() => {
            setExportStatus("copied");
            setTimeout(() => setExportStatus(null), 2500);
        });
    };


    return (
        <>



            <Dialog
                closeIfClickOutside={false}
            >


                <div className="mb-4 flex  w-full justify-between text-center">
                    <div className=""></div>
                    <h1 className="text-2xl font-light text-stone-800 tracking-wide">Signez ici</h1>

                    <button onClick={onClose} className="bg-accent p-1 border border-foreground/10 rounded-sm"><X className="w-5 h-5" /></button>

                </div>

                {/* Canvas area */}
                <div className="relative  rounded-sm border shadow-sm overflow-hidden">
                    <div className="absolute bottom-14 left-8 right-8 h-px bg-stone-200 pointer-events-none" />
                    <div className="absolute bottom-[52px] left-8 right-8 flex items-center pointer-events-none">
                        <span className="text-[9px] tracking-[0.3em] text-stone-300 uppercase">Signature</span>
                    </div>
                    <canvas
                        ref={canvasRef}
                        className="w-full h-58 cursor-crosshair touch-none"
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        onMouseUp={endDraw}
                        onMouseLeave={endDraw}
                        onTouchStart={startDraw}
                        onTouchMove={draw}
                        onTouchEnd={endDraw}
                    />
                    {isEmpty && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="text-[11px] tracking-widest text-stone-300 uppercase">Dessinez votre signature</p>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="w-full grid grid-cols-2 gap-2">

                    <button
                        onClick={clearCanvas}
                        disabled={isEmpty}
                        className="bg-accent w-full justify-center mt-4 text-sm flex gap-2 items-center border border-foreground/10 rounded-sm    transition-colors disabled:opacity-30 px-3 py-1.5"
                    >
                        Claire
                        <BrushCleaning className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={isEmpty}
                        className="bg-foreground text-background w-full justify-center mt-4 text-sm flex gap-2 items-center border border-foreground/10 rounded-sm    transition-colors disabled:opacity-30 px-3 py-1.5"
                    >
                        Sauvegarder
                        <i class="bi bi-check-circle"></i>
                    </button>

                </div>
            </Dialog>

        </>
    );
}

