"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => <p>Loading Studio…</p>,
});

export default function Studio() {
  return <Editor />;
}
