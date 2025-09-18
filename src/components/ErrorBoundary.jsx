import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so fallback UI renders
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    // Reset error state so component can try rendering again
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "#ff4d4f" }}>
          <h2>⚠️ Oops! Something went wrong.</h2>
          <p>
            {this.state.error?.message ||
              "An unexpected error occurred. Please try again."}
          </p>

          {this.state.errorInfo && (
            <details style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
              {this.state.errorInfo.componentStack}
            </details>
          )}

          <button
            onClick={this.handleReset}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
