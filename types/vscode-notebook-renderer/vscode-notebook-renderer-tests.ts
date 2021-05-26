import { ActivationFunction } from "vscode-notebook-renderer";

const activate: ActivationFunction<{ cool: boolean }> = context => {
    const prevState = context.getState();

    // $ExpectError
    prevState.cool;

    if (prevState) {
        console.log("cool?", prevState.cool);
    }

    context.setState({ cool: true });

    // $ExpectError
    context.setState({ unknownProp: true });

    context.postMessage?.('hello world');
    context.onDidReceiveMessage?.(message => {
        // $ExpectType any
        message;
    });

    return {
        renderCell(outputId, { value, mime, metadata, element, text, json, blob, bytes }) {
            // $ExpectType string
            outputId;
            // $ExpectType HTMLElement
            element;
            // $ExpectType string
            mime;
            // $ExpectType unknown
            metadata;
            // $ExpectType unknown
            value;
            // $ExpectType () => string
            text;
            // $ExpectType () => any
            json;
            // $ExpectType () => Blob
            blob;
            // $ExpectType () => Uint8Array
            bytes;
        },

        destroyCell(outputId) {
            // $ExpectType string | undefined
            outputId;
        },

        otherProp: () => { },
    };
};

import "vscode-notebook-renderer/preload";

onDidReceiveKernelMessage(msg => {
    // $ExpectType any
    msg;

    postKernelMessage(msg);
});
