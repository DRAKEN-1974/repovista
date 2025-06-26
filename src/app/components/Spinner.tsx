import React from "react";

export default function Spinner() {
  return (
    <div className="spinner-bw">
      <div className="spinner-bw-ring">
        <div className="spinner-bw-dot" />
      </div>
      <style>{`
        .spinner-bw {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 56px;
          width: 100%;
        }
        .spinner-bw-ring {
          width: 38px;
          height: 38px;
          border: 3px solid #222;
          border-top: 3px solid #fff;
          border-radius: 50%;
          position: relative;
          animation: spinner-bw-spin 0.85s linear infinite;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .spinner-bw-dot {
          position: absolute;
          top: 3px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: #222;
          border-radius: 50%;
          box-shadow: 0 0 6px #fff, 0 0 2px #222;
        }
        @keyframes spinner-bw-spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}