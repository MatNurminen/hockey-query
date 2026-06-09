import { useState } from "react";
import Box from "@mui/material/Box";
import { PieChart, Pie, Sector, type PieLabelRenderProps, type PieSectorShapeProps, type PieSectorDataItem } from "recharts";
import SectionChapter from "../../common/Sections/sectionChapter";
import { getCountPlayersByNation } from "../../../api/players-stats/queries";
import { formatSeason } from "../../utils/formatSeason";

interface Props {
  leagueId: number;
  seasonId: number;
  title: string;
}

const NationsChart = ({ leagueId, seasonId, title }: Props) => {
  const { data, isLoading, isError } = getCountPlayersByNation({
    leagueId,
    seasonId,
  });

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  const chartData = data.map((nation) => ({
    name: nation.name,
    value: Number(nation.count),
    fill: nation.color,
    flag: nation.flag,
  }));

  const total = chartData.reduce((sum, d) => sum + d.value, 0);
  const RADIAN = Math.PI / 180;
  const cx = 350;
  const cy = 230;

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

    const mx = cx + (outerRadius + 38) * cos;
    const my = cy + (outerRadius + 38) * sin;

    const offsetX = cos >= 0 ? 1 : -1;
    const ex = mx + offsetX * 28;
    const ey = my;

    const isRight = cos >= 0;
    const textAnchor = isRight ? "start" : "end";
    const path = `M${sx},${sy}L${mx},${my}L${ex},${ey}`;

    return (
      <g opacity={opacity}>
        <path d={path} stroke={fill} fill="none" strokeWidth={1.5} />
        <text
          x={ex + (isRight ? 10 : -4)}
          y={ey}
          textAnchor={textAnchor}
          dominantBaseline="central"
          fill="#333"
          fontSize={13}
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
    <Box my={2}>
      <SectionChapter
        txtAlign="left"
        content={
          `${formatSeason(seasonId)} ${title} Demographics`
        }
      />
      <Box display="flex" justifyContent="center">
        <PieChart width={800} height={460}>
          <Pie
            data={chartData}
            cx={cx}
            cy={cy}
            innerRadius={100}
            outerRadius={150}
            dataKey="value"
            paddingAngle={0.5}
            cornerRadius={4}
            isAnimationActive={false}
            label={renderCustomLabel}
            shape={renderShape}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          />

          {activeEntry && (
            <g transform={`translate(${cx}, ${cy})`}>
              <rect
                x={-48}
                y={-50}
                width={100}
                height={100}
                rx={8}
                fill="white"
                stroke="#e0e0e0"
                strokeWidth={1}
              />
              <text
                x={-2}
                y={-32}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#333"
                fontSize={12}
                fontFamily="Exo, sans-serif"
                fontWeight={700}
              >
                {activeEntry.name}
              </text>
              {activeEntry.flag && (
                <image
                  href={activeEntry.flag}
                  x={-18}
                  y={-22}
                  width={35}
                  height={25}
                />
              )}
              <text
                x={0}
                y={18}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#555"
                fontSize={18}
                fontFamily="Exo, sans-serif"
                fontWeight={600}
              >
                {((activeEntry.value / total) * 100).toFixed(1)}%
              </text>
              <text
                x={0}
                y={36}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#333"
                fontSize={12}
                fontFamily="Exo, sans-serif"
                fontWeight={700}
              >
                {activeEntry.value} players
              </text>
            </g>
          )}
        </PieChart>
      </Box>
    </Box>
  );
};

export default NationsChart;
