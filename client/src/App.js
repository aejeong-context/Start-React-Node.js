import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//api로딩 메시지를 위한 라이브러리
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

//웹 폰트 적용 라이브러리
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';



const styles = theme =>({
  root:{
    width:'100%',
    marginTop:theme.spacing.unit *3,
    overflowX:"auto"
  },
  table:{
    minWidth:1080
  },
  progress:{
    margin:theme.spacing.unit * 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

});

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      customers:'',
      completed:0
    }
  }

  stateRefresh=()=>{
    this.setState({
      customers:'',
      completed:0
    });
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err=>console.log(err));
  }
  // state = {
  //   customers:"",
  //   completed:0
  // }
  //모든 컨포넌트가 마운트가 완료되었을때 실행되는 부분
  componentDidMount(){
    //0.02초마다 프로그래스 함수가 실행될 수 있도록 timer 설정
    this.timer=setInterval(this.progress,20);
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err=>console.log(err));

  }
  callApi = async()=>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  progress = ()=>{
    const {completed} = this.state;
    this.setState({completed:completed>=100?0:completed+1});
  }


  render() {
    const {classes}=this.props;
    return(
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
    {this.state.customers?this.state.customers.map(c=>{
        return ( <Customer stateRefresh ={this.stateRefresh}
        key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} job={c.job}/>);
        }):
        <TableRow>
          <TableCell colSpan="6" align="center">
            <CircularProgress className = {classes.progress} variant ="determinate" value={this.state.completed}/>


          </TableCell>
        </TableRow>
        }
            </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
    </div>
    );
  }
}

export default withStyles(styles)(App);
