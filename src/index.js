import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

class NeatGrid extends React.PureComponent {
   
    constructor(props){
        super(props);
        this.state={
            pageNo : 1
        };
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
    }

    render(){
        let paginationElement;

        let bodyData = this.props.bodyData.slice((this.state.pageNo - 1) * this.props.dataPerPage, this.state.pageNo * this.props.dataPerPage);

        if(this.props.hasPagination){
            let fromData = ((this.state.pageNo - 1) * this.props.dataPerPage);
            paginationElement = <Pager onNext = {this.onNext} onPrev = {this.onPrev} 
                                    fromData = { fromData + 1 } 
                                    dataCount = { fromData + bodyData.length } 
                                    total = {this.props.bodyData.length}/>
        }

        return (
            <div className = {this.props.cssClass} id = {this.props.gridId}>
                            {paginationElement }
                <table className = 'table-boarder'>
                    <thead>
                    <TableRow>
                    {
                        this.props.headerData.map((item)=>{
                            return <TableHeader>{item}</TableHeader>
                        })
                    }
                    </TableRow>
                    </thead>
                    <tbody>
                        {
                            bodyData.map((list)=>{
                                return <TableRow onRowClick = {this.onRowClick}>
                                    {
                                        list.map((item)=>{
                                            return <TableData item={item}></TableData>
                                        })
                                    }
                                </TableRow>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    onRowClick = (props)=>{
        this.props.onClick(props);
    }
    onNext = () =>{
        if(this.state.pageNo * this.props.dataPerPage < this.props.bodyData.length){
            this.setState({
                pageNo: this.state.pageNo + 1
            })
        }
    }

    onPrev = () =>{
        if(this.state.pageNo > 1){
            this.setState({
                pageNo: this.state.pageNo - 1
            })
        }
    }
};

NeatGrid.propTypes = {
    headerData: PropTypes.array,
    bodyData: PropTypes.array,
    cssClass: PropTypes.string,
    gridId : PropTypes.string,
    hasPagination: PropTypes.bool,
    dataPerPage: PropTypes.number,
    onRowClick: PropTypes.func
}

/**
 * table row component (tr)
 */
const TableRow = React.memo(function(props){
    const onRowClick = function(event){
        event.stopPropagation();
        props.onRowClick(props);
    }
    return <tr className = {props.rowClass ? props.rowClass :'table-boarder'} onClick = { onRowClick}>{props.children}</tr>
});

/**
 * table data component (td)
 */
const TableData = React.memo(function(props){
    return (<td className = {props.cssClass ? props.cssClass : 'table-data'}>
        {getComponent(props.item)}
    </td>);
});

/**
 * table heder component (th)
 */
const TableHeader = React.memo(function(props){
    return <th className = {props.cssClass? props.cssClass :'table-header'}>{props.children}</th>
});

const Pager = React.memo(function(props) {
    return <React.Fragment>
            <button onClick = {()=>{props.onPrev()}} className={props.pagerClass?props.pagerClass:'button-next-prev'}>Prev</button>
            <spa>{`Showing data ${props.fromData} to ${props.dataCount} of ${props.total}`} </spa>
            <button onClick = {()=>{props.onNext()}} className={props.pagerClass?props.pagerClass:'button-next-prev'}>Next</button>
    </React.Fragment>;
});

/**
 * return the component based on the given type.
 */
const getComponent = function(item){
    switch (item.type) {
        case "input":
            return <input type='text' className = {item.cssClass} value= {item.value} onChange = {item.onChange}/>;
        case "label":
            return <lable className = {item.cssClass} > {item.value}</lable>;
        case "custom":
            return item.value
        default:
            return <span>{item.value}</span>;
    }
}

export default NeatGrid;