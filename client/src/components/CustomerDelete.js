import React from 'react';
//모달 라이브러리
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class CustomerDelete extends React.Component{
    
    constructor(props){
    super(props);
    this.state = {
        open:false
    }
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
            open:false
    });
}

    deleteCustomer(id){
        const url = '/api/customers/'+id;
    fetch(url,{
        method:'DELETE'

    });
    this.props.stateRefresh();
    
    }
    render(){
        return(
            <div>
            <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle onClose={this.handleClose}>
                    삭제 경고

                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                       선택한 고객 정보가 삭제됩니다. 
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e)=>{this.deleteCustomer(this.props.id)}}>삭제</Button>            
                    <Button variant="contained" color="primary" onClick={this.handleClose}>닫기</Button>            
                
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}
export default CustomerDelete;