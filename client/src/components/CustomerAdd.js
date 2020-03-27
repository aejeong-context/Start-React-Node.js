import React from 'react';
import {post} from 'axios';
//모달 라이브러리
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme =>({
    hidden : {
        display : 'none'
    }
})


class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file: null,
            userName:'',
            bithday:'',
            job:'',
            fileName:'',
            //다이어로그 창 확인
            open:false
        }
    }
    handleFormSubmit=(e)=>{
        e.preventDefault()
        this.addCustomer()
            .then((response)=>{
                console.log(response.data);
                this.props.stateRefresh();
            })
            this.setState({
                file:null,
                userName:'',
                bithday:'',
                job:'',
                fileName:'',
                open:false
            })
            //text를 이용한 전체 페이지 새로고침
            //window.location.reload();
    }
    handleFileChange = (e)=>{
        this.setState({
            file:e.target.files[0],
            fileName:e.target.value
        })
    }
    handleValueChange = (e)=>{
        let nextState = {};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }

    addCustomer=()=>{
        const url ='/api/customers';
        const formData= new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('job',this.state.job);

        //파일이 포함된 폼을 만들 경우
        const config={
            headers:{
            'content-type':'multipart/form-data'
            }
        }
        return post(url,formData,config);
    }
    handleClickOpen=()=>{
        //추가를 눌렀다면 화면 출력 
        this.setState({
            open:true
        });
    }
    handleClose=()=>{
        //다시 클릭시 팝업창 화면 출력 닫음
            this.setState({
                file:null,
                userName:'',
                bithday:'',
                job:'',
                fileName:'',
                open:false
            
        });
    }

    render(){
        const{classes}=this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                
                <Dialog open ={this.state.open} onClose={this.handleClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                <input className={classes.hidden} accept ="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
               <label htmlFor="raised-button-file">
                   <Button variant="contained" color="primary" component="span" name="file">
                       {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                   </Button>

               </label>
               <br />
                <TextField label="이름" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                <TextField label="생년월일" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                <TextField label="직업" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름:<input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일:<input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                직업:<input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>    
            </form>
            */

        )
    }

}

export default withStyles(styles)(CustomerAdd);