/*
PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file, NON modificarlo in alcun modo.
L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

- da ogni inserzione trovata, elimina i campi "description", "requirements", "benefits" e "company_profile" per semplificare il risultato

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  {
    title: "Customer Service - Cloud Video Production",
    location: "NZ, Auckland",
  },
  {
    title: "Commissioning Machinery Assistant (CMA)",
    location: "US, IA, Wever",
  },
  {
    title: "Account Executive - Washington DC",
    location: "US, DC, Washington",
  },
  { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
  { title: "Accounting Clerk", location: "US, MD," },
  { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
  {
    title: "Lead Guest Service Specialist",
    location: "US, CA, San Francisco",
  },
  { title: "HP BSM SME", location: "US, FL, Pensacola" },
  {
    title: "Customer Service Associate - Part Time",
    location: "US, AZ, Phoenix",
  },
  {
    title: "ASP.net Developer Job opportunity at United States,New Jersey",
    location: "US, NJ, Jersey City",
  },
  {
    title: "Talent Sourcer (6 months fixed-term contract)",
    location: "GB, LND, London",
  },
  {
    title: "Applications Developer, Digital",
    location: "US, CT, Stamford",
  },
  { title: "Installers", location: "US, FL, Orlando" },
  { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
  {
    title: "VP of Sales - Vault Dragon",
    location: "SG, 01, Singapore",
  },
  { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
  {
    title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
    location: "GB, SOS, Southend-on-Sea",
  },
  { title: "Visual Designer", location: "US, NY, New York" },
  {
    title: "Process Controls Engineer - DCS PLC MS Office - PA",
    location: "US, PA, USA Northeast",
  },
  { title: "Marketing Assistant", location: "US, TX, Austin" },
  { title: "Front End Developer", location: "NZ, N, Auckland" },
  { title: "Engagement Manager", location: "AE," },
  {
    title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
    location: "US, CA, Carlsbad",
  },
  { title: "Customer Service", location: "GB, LND, London" },
  { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
  { title: "Marketing Exec", location: "SG," },
  {
    title: "HAAD/DHA Licensed Doctors Opening in UAE",
    location: "AE, AZ, Abudhabi",
  },
  {
    title: "Talent Management Process Manager",
    location: "US, MO, St. Louis",
  },
  { title: "Customer Service Associate", location: "CA, ON, Toronto" },
  {
    title: "Customer Service Technical Specialist",
    location: "US, MA, Waltham",
  },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Craftsman Associate", location: "US, WA, Everett" },
  { title: "Completion Engineer", location: "US, CA, San Ramon" },
  { title: "I Want To Work At Karmarama", location: "GB, LND," },
  {
    title: "English Teacher Abroad",
    location: "US, NY, Saint Bonaventure",
  },
]

//variabili globali
let resultGlobal={};
let outputBoxNode=document.getElementById('outputBox');
let inputBoxNode=document.getElementById('inputBox');
//---------  EVENTI  ----------------------------------------------------------------
// click su tasto FIND
document.getElementById('buttonFind').addEventListener('click',goFind);
// premendo il tasto enter
document.addEventListener('keypress',(event)=>{
        if(event.key!=='Enter') return;
        goFind();
});

// ------ Funzione di creazione risultati ----------------------------
function showResult(resultObjet){
  let nResult=resultObjet.count;
  //nessuna corrispondenza
  if(nResult===0){
    let newRecordBox=document.createElement('li')
    newRecordBox.className='resultBox';
    newRecordBox.innerText='NO RESULT : no '+(document.getElementById('titleJob').value)+' in '+(document.getElementById('locationJob').value)
    document.getElementById('recordList').appendChild(newRecordBox);
  }else{
  for (let index = 0; index < nResult; index++) {
//creo il numero N di elementi
    let newRecordBox=document.createElement('li');
    newRecordBox.className='resultBox';
    document.getElementById('recordList').appendChild(newRecordBox);
    let newRecordValue=[];
    newRecordValue[0]=document.createElement('div');
    newRecordValue[0].className='boxTitle';
    newRecordValue[0].innerText=resultObjet['result'][index].title;
    newRecordValue[1]=document.createElement('div');
    newRecordValue[1].className='boxLocation';
    newRecordValue[1].innerText=resultObjet['result'][index].location;
    newRecordValue[2]=document.createElement('button');
    newRecordValue[2].className='buttonMoreInfo';
    newRecordValue[2].innerText='SHOW MORE';
    newRecordValue[2].value=index;            //indice per individuare il tasto
    for (let element of newRecordValue) {
      document.getElementsByClassName('resultBox')[index].appendChild(element)}
  }
  }
// nascondo il box input e mostro quello risultati
  outputBoxNode.style.display='flex';
  inputBoxNode.style.flexWrap='noWrap';
  inputBoxNode.style.minHeight='initial';
// listener sul bottone per maggiori info, lo traccio con il value 
  for (let showMorePin of document.getElementsByClassName('buttonMoreInfo')) {
    showMorePin.addEventListener('click',(event)=>{
      let pin=event.target.value;
      alert(resultGlobal.result[pin].title+' in  '+resultGlobal.result[pin].location);
    }) 
  }
}
// funzione di ricerca che si avvia con i due possibili eventi
function goFind(){
  resetRecord();
  let temp1=document.getElementById('titleJob').value;
  let temp2=document.getElementById('locationJob').value;
  //obbligo la compilazione di almeno uno dei due campi
  if((temp1==='')&&(temp2==='')) return alert('Compila almeno uno dei due campi');
  searchPositionTwo(temp1,temp2);
}
// elimino tutti i li.resultBox per aver l'output pulito
function resetRecord(){
  let results=document.getElementsByClassName('resultBox');
  for (let i=(results.length-1);i>=0;i--){
    results[i].remove();
  }
}

// funzione con i valori degli input per dividerli se hanno uno spazio e modificare il case 
function searchPositionTwo(workValue,locationValue){
  workValue=workValue.toLowerCase();
  workValue=workValue.split(' ');
  locationValue=locationValue.toLowerCase();
  locationValue=locationValue.split(' ');
  let tempValue=researchValue(workValue,jobs,'title');
  tempValue=researchValue(locationValue,tempValue,'location');
  resultGlobal={result: tempValue, count: tempValue.length};
  showResult(resultGlobal);
}
// funzione di ricerca con array singole parole in ingresso, array di oggetti da controllare e proprita comune da verificare
// da di ritorno l'array di oggetti corrispondenti 
// spazio vouto buoni tutti
function researchValue(arrayIN,arrayTemp,propertyTemp){
  let varTemp='';
  let resultArray=[];
  for (let i = 0; i < arrayIN.length; i++) {
    resultArray=[];
    for (let index = 0; index < arrayTemp.length; index++) {
      varTemp=arrayTemp[index][propertyTemp].toLowerCase();
      if(varTemp.includes(arrayIN[i])) resultArray=resultArray.concat(arrayTemp[index]);
    } 
    arrayTemp=resultArray;
  }
  console.log(resultArray);
  return resultArray;
}