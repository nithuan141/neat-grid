import React from 'react';

const NeatGrid = props => {
        return (
            <table>
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
                        this.props.bodyData.map((list)=>{
                            return <TableRow>
                                {
                                    list.map((item)=>{
                                        return <TableData>{item}</TableData>
                                    })
                                }
                             </TableRow>
                        })
                    }
                </tbody>
            </table>
        );
};

const TableRow = React.memo(function(props){
    return <tr className = {props.rowClass}>{props.children}</tr>
});

const TableData = React.memo(function(props){
    return <td className = {props.dataClass}>{props.children}</td>
});

const TableHeader = React.memo(function(props){
    return <th className = {props.headerClass}>{props.children}</th>
});

export default NeatGrid;