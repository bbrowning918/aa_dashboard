import React, { Component, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

type State = {
    error: string;
};

export class ErrorBoundary extends Component<Props, State> {
    state: State = {
        error: "",
    };

    static getDerivedStateFromError(error: Error): State {
        return { error: "Uh Oh... \n" + error };
    }

    render() {
        if (this.state.error) {
            return (
                <>
                    {this.state.error.split("\n").map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </>
            );
        }
        return this.props.children;
    }
}
