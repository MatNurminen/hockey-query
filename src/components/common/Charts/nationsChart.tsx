import { useState, memo, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
  type PieSectorDataItem,
} from "recharts";
import SectionChapter from "../../common/Sections/sectionChapter";
import { formatSeason } from "../../utils/formatSeason";
import { TCountPlayerByNation } from "../../../api/players-stats/types";

type Props = {
  players: TCountPlayerByNation[];
  title: string;
  seasonId: number;
};

const NationsChart = memo(({ title, seasonId, players }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = Math.min(1, containerWidth / 800);
  
  const showLegend = containerWidth < 480;

  const innerRadius = 100 * scale;
  const outerRadius = 150 * scale;
  const labelGap = 38 * scale;
  const labelLength = 28 * scale;
  const labelTextOffset = 10 * scale;
  const labelFontSize = Math.max(8, 13 * scale);
  const chartHeight = Math.max(showLegend ? 170 : 240, 460 * scale);
  const infoBoxSize = Math.max(80, 100 * scale);

  const chartData = players.map((nation) => ({
    name: nation.name,
    value: nation.count,
    fill: nation.color,
    flag: nation.flag,
  }));

  const total = chartData.reduce((sum, d) => sum + d.value, 0);
  const RADIAN = Math.PI / 180;

  const renderShape = (props: PieSectorShapeProps, index: number) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      cornerRadius,
      isActive,
    } = props;

    const isDimmed = activeIndex !== undefined && index !== activeIndex;
    const opacity = isDimmed ? 0.2 : 1;

    return (
      <g opacity={opacity}>
        {isActive && (
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={outerRadius + 3}
            outerRadius={outerRadius + 10}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            opacity={0.3}
          />
        )}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={cornerRadius}
        />
      </g>
    );
  };

  const renderCustomLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, outerRadius, name, fill, percent, index } = props;

    if (percent == null || midAngle == null || percent < 0.01) return null;

    const isDimmed = activeIndex !== undefined && index !== activeIndex;
    const opacity = isDimmed ? 0.2 : 1;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    const sx = cx + (outerRadius + 2) * cos;
    const sy = cy + (outerRadius + 2) * sin;

    const mx = cx + (outerRadius + labelGap) * cos;
    const my = cy + (outerRadius + labelGap) * sin;

    const offsetX = cos >= 0 ? 1 : -1;
    const ex = mx + offsetX * labelLength;
    const ey = my;

    const isRight = cos >= 0;
    const textAnchor = isRight ? "start" : "end";
    const path = `M${sx},${sy}L${mx},${my}L${ex},${ey}`;

    return (
      <g opacity={opacity}>
        <path d={path} stroke={fill} fill="none" strokeWidth={1.5} />
        <text
          x={ex + (isRight ? labelTextOffset : -4)}
          y={ey}
          textAnchor={textAnchor}
          dominantBaseline="central"
          fill="#333"
          fontSize={labelFontSize}
          fontFamily="Exo, sans-serif"
          fontWeight={600}
        >
          {name} ({(percent * 100).toFixed(1)}%)
        </text>
      </g>
    );
  };

  const onPieEnter = (_data: PieSectorDataItem, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const activeEntry =
    activeIndex !== undefined ? chartData[activeIndex] : undefined;

  return (
    <Box my={{ xs: 0.5, sm: 2 }}>
      <SectionChapter
        content={`${formatSeason(seasonId)} ${title} Demographics`}
      />
      {players.length > 0 ? (
        <Box
          ref={containerRef}
          sx={{
            width: "100%",
            maxWidth: 800,
            mx: "auto",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx={"50%"}
                  cy={"50%"}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  dataKey="value"
                  paddingAngle={0.5}
                  cornerRadius={4}
                  isAnimationActive={false}
                  label={showLegend ? false : renderCustomLabel}
                  shape={renderShape}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                />
              </PieChart>
            </ResponsiveContainer>

            {activeEntry && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "white",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  zIndex: 1,
                  width: infoBoxSize,
                  height: infoBoxSize,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Typography fontWeight={700} fontSize={12} color="#333">
                  {activeEntry.name}
                </Typography>
                {activeEntry.flag && (
                  <Box
                    component="img"
                    src={activeEntry.flag}
                    alt=""
                    width={35}
                    height={25}
                  />
                )}
                <Typography fontWeight={600} fontSize={18} color="#555">
                  {((activeEntry.value / total) * 100).toFixed(1)}%
                </Typography>
                <Typography fontWeight={700} fontSize={12} color="#333">
                  {activeEntry.value} players
                </Typography>
              </Box>
            )}
          </Box>

          {showLegend && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1.5,
                mt: { xs: 0.5, sm: 2 },
                pb: { xs: 2, sm: 0 },
                width: "100%",
              }}
            >
              {chartData.map((nation) => (
                <Box
                  key={nation.name}
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: nation.fill,
                      flexShrink: 0,
                    }}
                  />
                  {nation.flag && (
                    <Box
                      component="img"
                      src={nation.flag}
                      alt=""
                      width={20}
                      height={14}
                    />
                  )}
                  <Typography fontSize={12} color="#333" fontWeight={600}>
                    {nation.name} {nation.value} (
                    {((nation.value / total) * 100).toFixed(1)}%)
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ) : null}
    </Box>
  );
});

export default NationsChart;
