# neat-grid   IN PROGRESS
A generic react component to create a data grid

npm install neat-grid --save


Sample usage 

    // Sample Data
    let _data =[];
    for(var i = 0; i< 15; i++){
        //var element = response.data[i];
        _data.push([
            {type: "input", value: ` nithesh ${i}`},
            {type: "custom", value: <SampleComponent value = {i} />},
            {type: "label", value: '26-05-1988'}
          ]);
        }
     }
     
     // Row click event
     onRowClick = (props)=>{
         alert('Row clicked !');
     }
     
     // The component usage
        <NeatGrid
          headerData = {["Name" , "Surname", "DOB"]}
          bodyData = {_data}
          hasPagination = {true}
          dataPerPage = {10}
          onRowClick = {this.onRowClick}/>
    


      
