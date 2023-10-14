"use client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Event } from "./components/Event";

interface IEvent {
  title: string;
  [index: string]: any;
}

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");

  const [events, setEvents] = useState<IEvent[]>([]);

  async function sign() {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const body = {
      from,
      to,
      title,
    };
    const message = await signer.signMessage(JSON.stringify(body));

    fetch(`/api/calendar`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        signature: message,
        ...body,
      }),
    });
  }

  useEffect(() => {
    (async () => {
      const req = await fetch("/api/calendar");
      const res = await req.json();
      setEvents(res);
    })();
  });

  return (
    <main>
      {events.map((event) => (
        <Event key={event.id} title={event.title} />
      ))}
      <input
        type="datetime-local"
        onInput={(e) => setFrom(e.currentTarget.value)}
      />
      {from}
      <input
        type="datetime-local"
        onInput={(e) => setTo(e.currentTarget.value)}
      />
      {to}
      <input value={title} onInput={(e) => setTitle(e.currentTarget.value)} />
      <button onClick={sign}>Sign</button>
      {/* <iframe
        style={{ height: "500px" }}
        src="https://chitchatter.im/public/55f1d71e-6b34-44ee-b8d7-6848c5149f55?embed=1"
        allow="camera;microphone;display-capture;fullscreen"
        width="100%"
        height="100%"
      /> */}
    </main>
  );
}
