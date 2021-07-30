// Inspired by https://github.com/ethereum/blockies
import React from "react";
import sha256 from "crypto-js/sha256";

/**
 * Extract four bytes (in the form of Int8) from a 32-bit number.
 * @param index The number to extract bytes from.
 * @see https://stackoverflow.com/a/24947000/15543974
 */
function extractBytes(index: number): Uint8Array {
    const arr = new ArrayBuffer(4); // 32 = 4*8
    const view = new DataView(arr);
    view.setUint32(0, index, false);
    return new Uint8Array(arr);
}

/**
 * Returns a random color in (Hue, Saturation, Value) format.
 * @param index A 32-bit number.
 */
function getColor(index: number): string {
    const bytes = extractBytes(index);
    // between 0 and 360, in increments of 5
    const hue = (bytes[0] * 5) % 360;
    // between 40% and 60%
    const saturation = Math.floor((bytes[1] * (20 / 255)) + 40);
    // between 40% and 80%
    const value = Math.floor((bytes[2] * (40 / 255)) + 40);
    return `hsl(${hue},${saturation}%,${value}%)`;
}

interface IdenticonProps {
    size: number;
    seed: string;
}

/**
 * A component that returns a random "avatar", inspired by Ethereum's identicon
 * @param size The size of the component
 * @param seed The value from which the hash should be computed
 */
export default function Identicon({ size, seed }: IdenticonProps) {
    /** The size of the SVG view. */
    const viewSize = 64;

    // An array of 32-bit numbers
    const { words } = sha256(seed);

    const bgColor = getColor(words[0]);
    const fgColor = getColor(words[1]);
    const extraColor = getColor(words[2]);

    function getCell(byte: number) {
        if (byte <= 50) {
            return extraColor;
        } else if (byte <= 165) {
            return fgColor;
        } else {
            return null;
        }
    }

    // An 8x4 array of random Cell values
    const matrix = words.map(w => {
        const bytes = extractBytes(w);
        // 0 <= b < 256
        return Array.from(bytes).map(b => getCell(b));
    });

    return (
        <svg width={size} height={size} viewBox={`0 0 ${viewSize} ${viewSize}`}>
            <rect x={0} y={0} width={viewSize} height={viewSize} fill={bgColor} />
            {matrix.map((row, i) => row.map((cell, j) => (
                cell && <React.Fragment key={`${i}-${j}`}>
                    <rect
                        x={viewSize * j / 8}
                        y={viewSize * i / 8}
                        // +1 to deal make them overlap
                        width={viewSize / 8}
                        height={viewSize / 8}
                        fill={cell}
                    />
                    <rect
                        // mirror
                        x={viewSize * (8 - j - 1) / 8}
                        y={viewSize * i / 8}
                        width={viewSize / 8}
                        height={viewSize / 8}
                        fill={cell}
                    />
                </React.Fragment>
            )))}
        </svg>
    );
}
