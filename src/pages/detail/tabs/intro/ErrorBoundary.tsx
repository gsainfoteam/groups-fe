import React, { Component, ReactNode } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

interface ErrorBoundaryProps extends WithTranslation {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const ErrorComponent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center p-4 text-red-500">
      {children}
    </div>
  );
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return <ErrorComponent>{t("group.intro.loadError")}</ErrorComponent>;
    }
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
