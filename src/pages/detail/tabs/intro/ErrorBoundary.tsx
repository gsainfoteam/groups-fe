import React, { Component, ReactNode } from "react";
interface ErrorBoundaryProps {
  children: ReactNode;
}
import ErrorComponent from "@/assets/error/Error";
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <ErrorComponent>{"Fail to load Notion Page"}</ErrorComponent>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
