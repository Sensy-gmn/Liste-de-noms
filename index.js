// RECUPERATION DOM ELEMENTS
document.addEventListener('DOMContentLoaded', function() {
    const maList = document.querySelector('#list');
    const inputElement = document.querySelector('input');
    const ajouterElement = document.querySelector('button');
    const compteur = document.querySelector('#compteur');

    let nombreNoms = 0;

//MODIFICATIONS DU DOM & COMPTEUR
    ajouterElement.addEventListener('click', function() {
        const valeur = inputElement.value.trim();
        if (valeur !== '') {
            const nouvelElement = document.createElement('li');
            nouvelElement.textContent = valeur;
            maList.appendChild(nouvelElement);
            inputElement.value = ''; // Efface le champ de texte après l'ajout
            nombreNoms++;
            compteur.textContent = `Nombre total : ${nombreNoms}`;

        } else {
            alert(`Veuillez entrer un nom.`);
        }
    })
})


//EXPORT DE LA LISTE EN FICHIER EXCEL
document.getElementById("export").addEventListener("click", function() {
    let listNames = document.querySelectorAll('#list li');
    let data = [];
    listNames.forEach(function(names) {
        data.push({ Text: names.textContent });
    });

    //CREER FICHIER EXCEL
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    
    //AJOUTER FEUILLE DE CALCUL
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "liste.xlsx");

    // CONVERTIR LE CLASSEUR EN BINAIRE EXCEL & CREER LIEN TELECHARGEMENT
    var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "liste.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});