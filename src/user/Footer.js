import React from "react";
import "../custom.css";

export default function Footer() {
  return (
    <footer className="sc-footer text-center py-2 mt-auto">
      <small>© {new Date().getFullYear()} Standard Chartered - RW Tool</small>
    </footer>
  );
}
