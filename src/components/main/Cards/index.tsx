import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import LinkRoute from "../../common/LinkRoute";
import { getSeasons } from "../../../api/seasons/queries";
import { TSeasonDto } from "../../../api/seasons/types";

function srcset(
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1,
) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Cards = () => {
  const { data, isLoading, isError } = getSeasons();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  const lastCard = data.length - 1

  return (
    <Box sx={{ flexGrow: 1 }}>
        <ImageList sx={{ my: 0 }}>
          {data.map((season: TSeasonDto, index) => {
            const cols =
              index === 0 || (index === lastCard && lastCard % 2 !== 0) ? 2 : 1;
            const rows =
              index === 0 || (index === lastCard && lastCard % 2 !== 0) ? 2 : 1;
            const barFontSize =
              index === 0 || (index === lastCard && lastCard % 2 !== 0)
                ? "2em"
                : "1.3em";

            return (
              <ImageListItem
                component={LinkRoute}
                to={season.link}
                key={season.id}
                cols={cols}
                rows={rows}
                sx={{ margin: 1 }}
              >
                <img
                  {...srcset(season.logo, 250, 200, rows, cols)}
                  alt={season.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 20%, " +
                      "rgba(0,0,0,0.7) 20%, rgba(0,0,0,0) 100%)",
                    textAlign: "center",
                    "& .MuiImageListItemBar-title": {
                      fontSize: { barFontSize },
                      lineHeight: 1.25,
                    },
                  }}
                  title={season.name}
                  position="bottom"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
    </Box>
  );
};

export default Cards;
