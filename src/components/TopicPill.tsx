const PALETTE = [
  { bg: "bg-accent-soft", text: "text-accent" },
  { bg: "bg-amber-soft", text: "text-[#c96a00]" },
  { bg: "bg-mint-soft", text: "text-[#1c8a5c]" },
];

function paletteFor(topic: string) {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) hash = (hash + topic.charCodeAt(i)) % PALETTE.length;
  return PALETTE[hash];
}

export function TopicPill({ topic }: { topic: string }) {
  const { bg, text } = paletteFor(topic);
  return (
    <span
      className={`inline-flex items-center rounded-full ${bg} ${text} px-2.5 py-1 text-xs font-semibold`}
    >
      {topic}
    </span>
  );
}
