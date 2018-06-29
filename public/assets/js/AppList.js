function RetornarDespesas(){
    var tabela = document.getElementById('tbResultado');
    var list = db.database()
     .ref('minhasdespesas')
     .on('value',function(res){
         console.log(res.val());
     })
    console.log(tabela);
}

function LoadData(){

var url = "https://projetominhasdespesassi.firebaseio.com/";
    $.get(url,function(data){
            window.console.log(data.length);                                        
            //parte inicial do Tbody
            content = ` <tbody>`; 
            //Parte onde o conteúdo se repete nas linhas
            for(var i=0;i<data.length;i++){
                content +=`<tr>
                          <th scope="row">`+data[i].description+`</th>                          
                          <td>`+data[i].amount+`</td>
                          <td>`+data[i].dateAdd+`</td>
                        </tr>`;

            }         
            //Parte final do tbody
            content += `</tbody>`;                      

            $('.table').append(content);                    

    });
}