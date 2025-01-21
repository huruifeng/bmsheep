// Home.jsx
import {Grid, Card, CardContent, CardMedia, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './styles.css';

const Home = () => (
  <div className="home-container">
    <Grid container  spacing={3} className="breadcrumb">
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography>当前位置 &gt;&gt; 主页</Typography>
      </Grid>
    </Grid>
    <hr />
    <Grid container spacing={3} className="welcome-text">
      <Grid item xs={12}>
        <Typography sx={{ mb: 2 }} variant="h3">欢迎使用巴美肉羊计算服务系统</Typography>
        <Typography sx={{ mb: 2 }} variant="body1">本系统提供了一系列的计算服务，包括变异查询、品种鉴定、鉴定芯片设计、基因型填充、血缘分析等。</Typography>
        <Typography sx={{ mb: 2 }} variant="body1">请点击上方导航栏选择您需要的服务。</Typography>
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>First</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Handle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Mark</TableCell>
                <TableCell>Otto</TableCell>
                <TableCell>@mdo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Jacob</TableCell>
                <TableCell>Thornton</TableCell>
                <TableCell>@fat</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
    <Grid container spacing={3} sx={{mt: 2}} className="card-group">
      <Grid item xs={12} md={4}>
        <Card>
          <CardMedia
            component="img"
            alt="Sheep Image"
            image="/src/assets/images/sheep1.jpg"
            className="card-media"
          />
          <CardContent className="card-content">
            <Typography variant="h5">Card Title</Typography>
            <Typography variant="body2">
              This is a wider card with supporting text below as a natural lead-in to additional content.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardMedia
            component="img"
            alt="Sheep Image"
             image="/src/assets/images/sheep2.jpeg"
            className="card-media"
          />
          <CardContent className="card-content">
            <Typography variant="h5">Card Title</Typography>
            <Typography variant="body2">
              This card has supporting text below as a natural lead-in to additional content.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardMedia
            component="img"
            alt="Sheep Image"
             image="/src/assets/images/sheep3.jpg"
            className="card-media"
          />
          <CardContent className="card-content">
            <Typography variant="h5">Card Title</Typography>
            <Typography variant="body2">
              This is a wider card with supporting text below as a natural lead-in to additional content/.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
);

export default Home;
