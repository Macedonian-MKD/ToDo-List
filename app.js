const addForm = document.querySelector(".add");
const lista = document.querySelector(".todos"); // referenca za unoredered listata, kje ni treba vo funkcijata generateTemplate
//funkcija za dodavanje na drzavata vo listata
//funkcijava se povikuva so parametar drzava koja ja zimame od text fieldot najdole
// vo funkcijata kreirame promenliva html koja e ednavka na html kod od list item kopiran od html-ot
// samo sega vo span tagot ja dodavame promenlivata koja sto e parametar
const generateTemplate = function(dr){

    const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${dr}</span>
                        <i class="far fa-trash-alt delete"></i>
                  </li>`;

    lista.innerHTML += html; // znaci vo unordered listata dodavame go ovoj html pogore
}
addForm.addEventListener('submit',function(event){
    event.preventDefault();
    const drzava = addForm.add.value.trim(); // ja zima vrednosta od formata od imeto na input-ot e add pa potoa negovata value
                                             //trim metodot gi brise site poveke prazni mesta dokolku se napisani po greska 


    //proverka dali sme vnele barem eden karakter vo text-fieldot
    //zatoa sto glupo e da vnesuvame prazen string vo listata
    // ako lenght dade 0, togas avtomatski if e false
    if(drzava.length){
    generateTemplate(drzava);
    // koga vneseme imeto na drzava toa pak si ostane vo text-fieldot, sakame da go izbriseme da si bide prazno text-fieldceto
    addForm.reset(); // sega koga klikneme enter toa se brise so ovaa ednostavana build-in funkcija

    }
})

//Sega za korpickite koga se pretisne da se izbrise drzavata
//Toa moze da go napravime so postavuvanje na Event Listener na site list elementi , no toa ke ja uspori stranata 
// Najdobro e da iskoristime invent delegation, odnosno da postavime event na celata <ul> lista

//znaci gore na pocetokot veke napravivme referenca do <ul> a toa e povrzuvanje so klasata .todos 
lista.addEventListener('click',function(event){
    //prvo da provereme dali userot kliknal na kantickata , oti ako kliknal na drugo mesto ne treba da vazi ovoj event
    //sekoja kanticka sodrzi klasa delete
    //ovde upotrebuvame target property za da videme sto e kliknato
    //pa pristapuvame do classList na targetot i gledame dali ja sodrzi klasata delete
    if(event.target.classList.contains('delete')){
        //sega treba pak da go iskoristime targetot
        //znaci event.target
        //potoa treba nekako da pristapime do roditelot na korpickata, odnosno toa e <li> tagot koj i sakame vprocem da go izbriseme
        event.target.parentElement.remove(); // so parentElement pristapuvame do <li> i potoa funkcijata remove sto e built-in i tolku
    }
    //znaci ako ne sme kliknale na nesto sto ne sodrzi klasa delete togas nisto ne se slucuva
});


//Sega sakame da go napravime SEARCH barot
//toa moze da go napravime so filter metodot
// koga napiseme barem del od imeto vo search barot, ako takov del postoi vo <ul> togas nanesi mu klasa na toj element i smeni mu ja bojata
//so menuvanje na negovata boja toj ke stane kako highlighted vo CSS


//treba da zememe referenca do inputot vo search formata
//ne ni treba celata search forma zatoa sto ovojpat ke ima keyup event a ne submit
// znaci kako sto pisuvame taka da se odbelezuva pronajdenoto
const search = document.querySelector('.search input');

//pisuvame funkcija tuka a ne vnatre vo eventot zatoa sto ako ja napiseme vnatre togas taa funkcija ne moze da se povika nikade na drugo mesto
//sakame da gi skrieme site list elementi koi ne se sovpagaat so vnesenoto vo search
// toa go praveme so referencata do <ul> gore sto ja imame, zatoa sto taa e roditel na sekoj <li>

const pronajdi = function( vneseno ){

    // bidejki lista.children kje ni dade html collection od site list elementi, ne mozeme da upotrebuvame array metodi na kolekcija
    //zatoa ja pretvarame najprvin vo lista so ovaa postapka Array.from(sto sakame da pretvoreme vo lista?);
    //sega moze da go koristeme filter metodot, no kje napravime chaining zatoa sto e podobro 
   Array.from(lista.children)
   .filter(function(drzavi){
     //Znaci filter metodot isfrla nekoi elementi a nekoi gi dodava
     //nie kje gi isfrleme tie sto se sovpagaat so search barot
     //a tie sto ne se sovpagaat ke ostanat vo nova niza sto ja dava filter metodo za da podocna i naneseme display none i da isceznat
     //taka ke ostanat tie so se sovpagaat 
     // znaci vo return proveruvame dali textcontentot na li tagot go sodrzi vneseniot parametar "vneseno"
     // bidejki sakame obratnoto, tie sto se sovpagaat da gi isfrle, a da gi zeme tie sto ne se sovpagaat
     // ja negirame celata ovaa return metoda
      return !drzavi.textContent.toLowerCase().includes(vneseno);
   })
   .forEach(function(drzavi){ // na sekoja drzava da i nanese klasa isfiltirani, toa ke go nanese u span tago
       drzavi.classList.add('isfiltrirani');
   });
   //znaci sto praveme so pronajdi funkcijata
   //najprvo ja konvertirame od html kolekcija vo niza listata od site deca na <ul> a toa se <li>
   //potoa na taa niza i zakacuvame 2 metodi : filter() i forEach()
   // so filter gi trgame tie so se sovpagaat a ostanuvaat tie so ne se sovpagaat so vnesenoto
   // potoa na site tie so ne se sovpagaat i nanesuvame klasa 'isfiltrirani' za da moze vo css na taa klasa da gi skrieme tie so ne se sovpagaat

   //DA NO , AKO NAPISEME PRIMER VO SEARCH SEGA 'MA' I IMAME 2 LIST ELEMENTI, OD KOI EDNIOT SODRZI SAMO BUKVA M ,A DRUGIOT SODRZI MA
   //SEGA NA TOJ STO SODRZI SAMO M KJE MU SE NANESE KLASA isfiltrirani, NO SEGA JA BRISEME A, I OSTANUVA SAMO M
   // SEGA NA TOJ USTE MU OSTANUVA TAA KLASA IAKO SE SOVPAGA, TREBA DA JA TRGNEME TAA KLASA:

   //SEGA MOZE DA JA TRGNEME TAA KLASA AKO GO NAPRAVIME OBRATNOTO OD ONA POGORE
   // SAMO VO filter() METODOT GO BRISEME IZVICNIKOT ,A VO forEach() MESTO .add() PISUVAME .remove()

   Array.from(lista.children)
    .filter(function(drzavi){
        return drzavi.textContent.toLowerCase().includes(vneseno); // sega ako go sodrzi vnesenoto togas napolni ja listata so tie sto se tocni
    })
    .forEach(function(drzavi){
        drzavi.classList.remove('isfiltrirani'); // i izbrisi im ja klasta isfiltrirani, za da se vidlivi pak
    });
}



search.addEventListener('keyup',function(){
    //prvo da go zememe toa sto e napisano vo search poleto i da mu naneseme metod trim za da mu gi izbrisime praznite mesta
    // isto taka ako userot go napise so golemi bukvi , toa da go proveruva so mali buvki
    const vneseno = search.value.trim().toLowerCase();
    pronajdi(vneseno);
});