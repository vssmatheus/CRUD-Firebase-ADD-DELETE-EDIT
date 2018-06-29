function CadastrarDespesa(){
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var dateAdd = document.getElementById("dateAdd").value;

    console.log("Descrição",description,"Valor",amount,"Data",dateAdd);   
    /* var database = firebase.database(); */
    
    var despesas = {description:description,amount:amount,dateAdd:dateAdd};
    db.database().ref('minhasdespesas').push(despesas);

}