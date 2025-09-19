import React from 'react'

export default function Skeleton({ width, height, className}) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width: width,
                height: height
            }}/>
    )
}
