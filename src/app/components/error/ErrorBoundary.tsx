/** @format */

"use client";

import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ErrorResetBoundaryProps {
  children: ReactNode;
}

/** @see {@link https://tanstack.com/query/v4/docs/framework/react/reference/QueryErrorResetBoundary} */
export const ErrorResetBoundary = ({ children }: ErrorResetBoundaryProps) => (
  <ErrorBoundary
    onError={(error, info) => {
      console.error(
        JSON.stringify({
          message: "UNCAUGHT_RUNTIME_ERROR",
          error,
          info,
        })
      );
    }}
    fallbackRender={({ resetErrorBoundary }) => (
      <ErrorEmptyStates onClick={resetErrorBoundary} />
    )}
  >
    {children}
  </ErrorBoundary>
);

const ErrorEmptyStates = ({ onClick }: { onClick: () => void }) => (
  <div style={{ marginTop: 90 }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "24px" }}>⚠️</div>
      <h2 style={{ margin: 0 }}>문제가 발생했어요</h2>
      <p style={{ margin: 0 }}>문제가 지속되면 지원팀에 문의해 주세요.</p>
      <button
        onClick={onClick}
        style={{
          padding: "8px 16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        다시 불러오기
      </button>
    </div>
  </div>
);
