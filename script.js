
var PRIX_COULEUR = 100;
var PRIX_NOIR_BLANC = 50;

window.onload = function () {
  var zoneFichier = document.getElementById('zoneFichier');
  var inputFichier = document.getElementById('inputFichier');

  zoneFichier.addEventListener('click', function () {
    inputFichier.click();
  });

  inputFichier.addEventListener('change', function () {
    var fichier = inputFichier.files[0];
    if (fichier) {
      var nomFichier = document.getElementById('nomFichier');
      nomFichier.textContent = '✅ Fichier sélectionné : ' + fichier.name;
      nomFichier.style.display = 'block';

      document.getElementById('resultat').style.display = 'none';
    }
  });
};

function calculerPrix() {

  var inputFichier = document.getElementById('inputFichier');
  if (!inputFichier.files[0]) {
    alert('Veuillez d\'abord choisir un fichier.');
    return;
  }

  var fichier = inputFichier.files[0];
  var nomFichier = fichier.name.toLowerCase();

  var typeImpression = document.querySelector('input[name="impression"]:checked').value;
  var copies = parseInt(document.getElementById('copies').value);
  if (isNaN(copies) || copies < 1) {
    alert('Veuillez entrer un nombre de copies valide (minimum 1).');
    return;
  }

  var tailleFichier = fichier.size; // taille en octets

  var nombrePages;

  if (nomFichier.endsWith('.pdf')) {
    nombrePages = Math.ceil(tailleFichier / 75000);
  } else if (nomFichier.endsWith('.doc') || nomFichier.endsWith('.docx')) {
    nombrePages = Math.ceil(tailleFichier / 40000);
  } else {
    alert('Format non reconnu. Veuillez choisir un fichier PDF ou Word.');
    return;
  }

  if (nombrePages < 1) {
    nombrePages = 1;
  }

  var prixParPage;
  if (typeImpression === 'couleur') {
    prixParPage = PRIX_COULEUR;
  } else {
    prixParPage = PRIX_NOIR_BLANC;
  }

  var prixTotal = nombrePages * copies * prixParPage;

  document.getElementById('affichagePages').textContent = nombrePages + ' page(s)';
  document.getElementById('affichageType').textContent = (typeImpression === 'couleur') ? 'Couleur' : 'Noir & Blanc';
  document.getElementById('affichageCopies').textContent = copies;
  document.getElementById('affichagePrix').textContent = prixTotal.toLocaleString('fr-FR');

  document.getElementById('resultat').style.display = 'block';
}
