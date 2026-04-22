import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FONT = "'Trebuchet MS', 'Segoe UI', sans-serif";

const TextCard: React.FC<{
  text: string;
  subtitle?: string;
  emoji?: string;
  color?: string;
}> = ({ text, subtitle, emoji, color = "#FFD166" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.55)",
          padding: "40px 60px",
          borderRadius: 40,
          border: `6px solid ${color}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          maxWidth: "90%",
        }}
      >
        {emoji ? (
          <div style={{ fontSize: 140, lineHeight: 1, marginBottom: 10 }}>
            {emoji}
          </div>
        ) : null}
        <div
          style={{
            fontFamily: FONT,
            color,
            fontSize: 110,
            fontWeight: 900,
            letterSpacing: 2,
            textShadow: "0 6px 18px rgba(0,0,0,0.9)",
            lineHeight: 1.05,
          }}
        >
          {text}
        </div>
        {subtitle ? (
          <div
            style={{
              fontFamily: FONT,
              color: "#FFFFFF",
              fontSize: 56,
              fontWeight: 700,
              marginTop: 24,
              textShadow: "0 4px 12px rgba(0,0,0,0.9)",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const HandleBadge: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 5,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 44,
          fontWeight: 800,
          color: "#fff",
          background: "rgba(0,0,0,0.55)",
          padding: "16px 36px",
          borderRadius: 999,
          border: "3px solid #FFD166",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        🐎 Valentina
      </div>
    </div>
  );
};

const Countdown: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 220,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          textAlign: "center",
          background: "linear-gradient(135deg, #C1121F, #780000)",
          padding: "30px 60px",
          borderRadius: 30,
          border: "5px solid #FFD166",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            color: "#FFD166",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Su primera carrera
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 96,
            fontWeight: 900,
            marginTop: 10,
            textShadow: "0 6px 14px rgba(0,0,0,0.8)",
          }}
        >
          DICIEMBRE 2026
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Valentina: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const videoSrc = staticFile("video.mp4");
  const musicSrc = staticFile("music.mp3");

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );
  const globalOpacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ opacity: globalOpacity }}>
        {/* Blurred video as background to fill vertical frame */}
        <AbsoluteFill>
          <OffthreadVideo
            src={videoSrc}
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(40px) brightness(0.5)",
              transform: "scale(1.15)",
            }}
          />
        </AbsoluteFill>

        {/* Centered source video */}
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <OffthreadVideo
            src={videoSrc}
            volume={0.15}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "60%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>

        {/* Handle badge */}
        <HandleBadge />

        {/* Background music */}
        <Audio src={musicSrc} volume={0.55} />

        {/* Text sequences (timings in seconds) */}
        <Sequence durationInFrames={Math.round(3.5 * fps)}>
          <TextCard text="Te presento a..." emoji="🐴" />
        </Sequence>

        <Sequence
          from={Math.round(3.5 * fps)}
          durationInFrames={Math.round(3.5 * fps)}
        >
          <TextCard text="VALENTINA" subtitle="mi yegua" color="#FFD166" />
        </Sequence>

        <Sequence
          from={Math.round(30 * fps)}
          durationInFrames={Math.round(4 * fps)}
        >
          <TextCard
            text="Criada con amor"
            subtitle="paso a paso 💛"
            color="#F4A261"
          />
        </Sequence>

        <Sequence
          from={Math.round(60 * fps)}
          durationInFrames={Math.round(4 * fps)}
        >
          <TextCard
            text="Fuerte · Veloz · Valiente"
            emoji="🏇"
            color="#E76F51"
          />
        </Sequence>

        <Sequence
          from={Math.round(95 * fps)}
          durationInFrames={Math.round(4 * fps)}
        >
          <TextCard
            text="Este año..."
            subtitle="llega su gran momento"
            color="#FFD166"
          />
        </Sequence>

        <Sequence
          from={Math.round(105 * fps)}
          durationInFrames={Math.round(12 * fps)}
        >
          <Countdown />
        </Sequence>

        <Sequence
          from={Math.round(120 * fps)}
          durationInFrames={Math.round(9 * fps)}
        >
          <TextCard
            text="¡VAMOS VALENTINA!"
            emoji="🐎🏆"
            color="#FFD166"
          />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
