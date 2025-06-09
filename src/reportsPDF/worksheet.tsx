import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Line,
} from '@react-pdf/renderer';

interface Player {
  last_name: string;
  player_position: string;
  player_order: number;
}

interface PDFDocumentProps {
  players: Player[];
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Times-Italic',
  },
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
  },
  column: {
    width: '24%' as const,
    flexDirection: 'column' as const,
  },
  gap: {
    width: 40,
  },
  table: {
    flexDirection: 'column' as const,
  },
  tableRow: {
    flexDirection: 'row' as const,
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    minHeight: 30,
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'left' as const,
  },
  verticalLine1: {
    position: 'absolute' as const,
    top: 30,
    bottom: 30,
    left: '25%' as const, // ~193 pt
  },
  verticalLine2: {
    position: 'absolute' as const,
    top: 30,
    bottom: 30,
    left: '74%' as const, // ~579 pt
  },
});

const PDFDocument: React.FC<PDFDocumentProps> = ({ players }) => {
  const sortedPlayers = players
    .filter((player) => player.player_order !== 1)
    .sort((a, b) => a.last_name.localeCompare(b.last_name));

  const rowHeight = 30;
  const pageHeight = 595 - 60;
  const estimatedRowsPerColumn = Math.floor(pageHeight / rowHeight);
  const itemsPerPage = estimatedRowsPerColumn * 4;

  const pages = [];
  for (let i = 0; i < sortedPlayers.length; i += itemsPerPage) {
    pages.push(sortedPlayers.slice(i, i + itemsPerPage));
  }

  return (
    <Document>
      {pages.map((pagePlayers, pageIndex) => {
        // Check if columns 3 and 4 have players
        const hasCol3 = pagePlayers.length > estimatedRowsPerColumn * 2;
        const hasCol4 = pagePlayers.length > estimatedRowsPerColumn * 3;

        return (
          <Page
            orientation='landscape'
            key={pageIndex}
            size='A4'
            style={styles.page}
            wrap
          >
            {/* Conditionally render vertical line 1 */}
            {pagePlayers.length > estimatedRowsPerColumn && (
              <Svg style={styles.verticalLine1}>
                <Line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={pageHeight}
                  stroke='#bfbfbf'
                  strokeWidth={1}
                />
              </Svg>
            )}
            {/* Conditionally render vertical line 2 */}
            {(hasCol3 || hasCol4) && (
              <Svg style={styles.verticalLine2}>
                <Line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={pageHeight}
                  stroke='#bfbfbf'
                  strokeWidth={1}
                />
              </Svg>
            )}
            <View style={styles.container}>
              <View style={styles.column}>
                <View style={styles.table}>
                  {pagePlayers
                    .slice(0, estimatedRowsPerColumn)
                    .map((row, index) => (
                      <View
                        key={`page${pageIndex}-col1-${index}`}
                        style={styles.tableRow}
                      >
                        <Text style={styles.tableCell}>
                          {row.player_position}. {row.last_name}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.table}>
                  {pagePlayers
                    .slice(estimatedRowsPerColumn, estimatedRowsPerColumn * 2)
                    .map((row, index) => (
                      <View
                        key={`page${pageIndex}-col2-${index}`}
                        style={styles.tableRow}
                      >
                        <Text style={styles.tableCell}>
                          {row.player_position}. {row.last_name}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
              <View style={styles.gap} />
              <View style={styles.column}>
                <View style={styles.table}>
                  {pagePlayers
                    .slice(
                      estimatedRowsPerColumn * 2,
                      estimatedRowsPerColumn * 3
                    )
                    .map((row, index) => (
                      <View
                        key={`page${pageIndex}-col3-${index}`}
                        style={styles.tableRow}
                      >
                        <Text style={styles.tableCell}>
                          {row.player_position}. {row.last_name}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.table}>
                  {pagePlayers
                    .slice(
                      estimatedRowsPerColumn * 3,
                      estimatedRowsPerColumn * 4
                    )
                    .map((row, index) => (
                      <View
                        key={`page${pageIndex}-col4-${index}`}
                        style={styles.tableRow}
                      >
                        <Text style={styles.tableCell}>
                          {row.player_position}. {row.last_name}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            </View>
          </Page>
        );
      })}
      {sortedPlayers.length === 0 && (
        <Page size='A4' style={styles.page}>
          <Text>No players available</Text>
        </Page>
      )}
    </Document>
  );
};

export default PDFDocument;
