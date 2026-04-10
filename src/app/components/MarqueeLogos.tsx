import { Box } from "@mui/material";

const LOGO_COUNT = 38;

const logos = Array.from({ length: LOGO_COUNT }, (_, i) => ({
  id: i + 1,
  src: `/assets/images/sarl-clients/${i + 1}.png`,
  alt: `Client logo ${i + 1}`,
}));

// Duplicate for seamless infinite loop (translate -50%)
const trackLogos = [...logos, ...logos];

export default function MarqueeLogos() {
  return (
    <Box
      component="section"
      className="w-full bg-[#F8F9FA] py-8"
    >
      <Box
        sx={{
          overflow: "hidden",
          height: 150,
          display: "flex",
          alignItems: "center",
          "&:hover .marquee-track": {
            animationPlayState: "paused",
          },
        }}
      >
        <Box
          className="marquee-track"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            animation: "marqueeScroll 40s linear infinite",
            "@keyframes marqueeScroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {trackLogos.map((logo, index) => (
            <Box
              key={`${logo.id}-${index}`}
              sx={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "12px",
                mx: "4px",
                height: 110,
                bgcolor: "white",
                transition: "box-shadow 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ maxWidth: 100, maxHeight: 70, objectFit: "contain" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
