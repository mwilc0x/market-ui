import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export default function MintCompletion({ mintResult }) {
    const { width, height } = useWindowSize();
    return (
        <>
            { !!mintResult ? 
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                /> : null
            }
        </>
    );
}