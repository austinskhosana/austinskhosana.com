"use client";

import { useEffect, useRef } from "react";

type CalQueue = unknown[];
type CalApi = {
  (...args: unknown[]): void;
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: CalQueue;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

export function CalEmbed() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const windowWithCal = window;
    const documentRef = windowWithCal.document;

    const enqueue = (api: CalApi, args: IArguments | unknown[]) => {
      api.q = api.q ?? [];
      api.q.push(args);
    };

    if (!windowWithCal.Cal) {
      const cal: CalApi = function (...args: unknown[]) {
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q ?? [];
          const script = documentRef.createElement("script");
          script.src = "https://app.cal.eu/embed/embed.js";
          script.async = true;
          documentRef.head.appendChild(script);
          cal.loaded = true;
        }

        if (args[0] === "init") {
          const namespace = args[1];
          const api: CalApi = function (...namespaceArgs: unknown[]) {
            enqueue(api, namespaceArgs);
          };
          api.q = api.q ?? [];

          if (typeof namespace === "string") {
            cal.ns = cal.ns ?? {};
            cal.ns[namespace] = cal.ns[namespace] ?? api;
            enqueue(cal.ns[namespace], args);
            enqueue(cal, ["initNamespace", namespace]);
          } else {
            enqueue(cal, args);
          }
          return;
        }

        enqueue(cal, args);
      };

      windowWithCal.Cal = cal;
    }

    const cal = windowWithCal.Cal;
    cal("init", "15min", { origin: "https://app.cal.eu" });
    cal.ns?.["15min"]?.("inline", {
      elementOrSelector: "#my-cal-inline-15min",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "austinskhosana/15min",
    });
    cal.ns?.["15min"]?.("ui", {
      hideEventTypeDetails: true,
      layout: "month_view",
    });
  }, []);

  return (
    <div
      id="my-cal-inline-15min"
      className="h-full min-h-[640px] w-full overflow-auto"
    />
  );
}
