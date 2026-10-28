export function DockRefraction() {
  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none fixed h-0 w-0"
        focusable="false"
      >
        <defs>
          <filter
            id="dock-refraction"
            x="-12%"
            y="-35%"
            width="124%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.022"
              numOctaves="2"
              seed="11"
              result="refraction-map"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="refraction-map"
              scale="38"
              xChannelSelector="R"
              yChannelSelector="B"
              result="warped"
            />
            <feOffset in="warped" dx="-1.6" result="red-offset" />
            <feColorMatrix
              in="red-offset"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red-channel"
            />
            <feColorMatrix
              in="warped"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green-channel"
            />
            <feOffset in="warped" dx="1.6" result="blue-offset" />
            <feColorMatrix
              in="blue-offset"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue-channel"
            />
            <feBlend in="red-channel" in2="green-channel" mode="screen" result="red-green" />
            <feBlend in="red-green" in2="blue-channel" mode="screen" />
          </filter>
        </defs>
      </svg>

      <div aria-hidden className="dock-refraction-field" />
    </>
  );
}
