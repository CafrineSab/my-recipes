var mi = require('mongoimport');
mi(config);

var host = '127.0.0.1:27017';
username = 'titre-lacapsule';
passwowrd = 'titrelacapsule'
var db = 'myFirstDatabase';
var collection = 'recipes'
var fields = [
        {
            "categorie": "Dessert",
            "name": "Tarte citron meringué",
            "picture": "../assets/tarte_citron_meringue.jpg",
            "ingredients": [
                "oeuf",
                "citron",
                "sucre",
                "farine"
            ],
            "preparation": "<p>PÂTE:</p><p>Blanchir les jaunes et le sucre au fouet et détendre le mélange avec un peu d'eau.</p><p>Mélanger au doigt la farine et le beurre coupé en petites parcelles pour obtenir une consistance sableuse et que tout le beurre soit absorbé (!!! Il faut faire vite pour que le mélange ne ramollisse pas trop!).</p><p>Verser au milieu de ce 'sable' le mélange liquide.</p><p>Incoporer au couteau les éléments rapidement sans leur donner de corps.</p><p>Former une boule avec les paumes et fraiser 1 ou 2 fois pour rendre la boule + homogène.</p><p>Foncez un moule de 25 cm de diamètre avec la pâte, garnissez la de papier sulfurisé et de haricots secs.</p><p>Faites cuire à blanc 20 à 25 mn, à 180°C, Th 6-7 . (NB après baisser le four à 120°C/150°C environ pour la meringue).</p><p>CRÈME AU CITRON :</p><p>Laver les citrons et en 'zester' 2.</p><p>Mettre les zestes très fins dans une casserole.</p><p>Presser les citrons et mettre le jus avec les zestes dans la casserole.</p><p>Verser le sucre et la Maïzena.</p><p>Remuer, et commencer à faire chauffer à feux doux.</p><p>Battre les oeufs dans un récipients séparé.</p><p>Une fois les oeufs battus, incorporer tout en remuant le jus de citron, le sucre, la Maïzena et les zestes.</p><p>Mettre à feu fort et continuer à remuer à l'aide d'un fouet.</p><p>Le mélange va commencer à s'épaissir.</p><p>Attention de toujours remuer lorsque les oeufs sont ajoutés, car la crème de citron pourrait brûler.</p><p>Oter du feux et verser l'appareil sur le fond de tarte cuit.</p><p>MERINGUE :</p><p>Monter les blancs en neige avec une pincée de sel.</p><p>Quand ils commencent à être fermes, ajouter le sucre puis la levure.</p><p>Mixer jusqu'à ce que la neige soit ferme.</p><p>Recouvrir avec les blancs en neige et napper. Cuire à four doux (120°C/150°C) juqu'à ce que la meringue dore (10 mn)",
            "time": "55 min",
            "preparation_time": "30 min",
            "cook-time": "25 min",
            "accessibility": "Très facile",
            "cost": "Bon marché"
        },
        {
            "categorie": "plat",
            "name": "Tajine de poulet",
            "picture": "../assets/tajine-de-poulet.jpg",
            "ingredients": [
                "poulet",
                "citron",
                "tomate",
                "carotte",
                "pomme-de-terre"
            ],
            "preparation": "<p>Faire revenir le poulet à feu moyen pour qu'il soit un peu doré.</p><p>Pendant ce temps, peler et couper les légumes : couper les carottes en 2 , puis dans le sens de la longueur. Idem pour les courgettes. Couper les oignons en lamelles et les pommes de terres en 4.</p><p>Mettre les légumes avec le poulet, rajouter les épices à tajine et le cumin. Mettez également un peu d'eau (3/4 verre d'eau).</p><p>Laisser cuire environ 1 heure et voilà, c'est prêt !</p>",
            "time": "1h30",
            "preparation_time": "30 min",
            "cook-time": "1h",
            "accessibility": "Facile",
            "cost": "Bon marché"
        },
        {
            "categorie": "plat",
            "name": "Saumon à l'échalotte",
            "picture": "../assets/saumon_echalote.jpeg",
            "ingredients": [
                "saumon",
                "echalotte",
                "creme"
            ],
            "preparation": "<p>Mettre les échalotes avec le beurre dans une poêle. Mettre les pavés de saumon quand les échalotes sont translucides, saler légèrement.</p><p>Quand le saumon est cuit, le réserver dans une assiette. Déglacer les échalotes cuites avec le vinaigre balsamique coupé avec un peu d'eau.</p><p>Ajouter la pointe de moutarde. Faire mijoter 2-3 mn puis ajouter la crème.</p><p>Remettre les pavés de saumon dans la poêle juste avant de servir afin de les rechauffer.</p><p>Miam, Miam... Servir avec du riz ou, pourquoi pas, du chou romanesco!</p>",
            "time": "25 min",
            "preparation_time": "10 min",
            "cook-time": "15 min",
            "accessibility": "Très facile",
            "cost": "Bon marché"
        },
        {
            "categorie": "dessert",
            "name": "Salade d'agrumes au miel'",
            "picture": "../assets/salade-agrumes_miel.jpg",
            "ingredients": [
                "1 cuillère à café d'eau de fleur d'oranger",
                "1 pamplemousse rose",
                "1 orange",
                "2 kiwi",
                "1 CS de miel"
            ],
            "preparation": "<p>Peler à vif le pamplemousse et l'orange. Les couper en tranches d'un centimètre d'épaisseur, puis en morceaux.</p><p>Peler et couper les deux kiwis.</p><p>Mélanger et verser l'eau de fleur d'oranger et le miel.</p><p>Laisser reposer au frais au moins 30 minutes.</p>",
            "time": "15 min",
            "preparation_time": "15 min",
            "cook-time": "-",
            "accessibility": "Très facile",
            "cost": "Bon marché"
        }
  ]


  function callback(err, db) {
    if(err) {
      if(err.message.match('ECONNREFUSED')) console.log('✘  make sure you have started mongodb server');
      if(err.message.match('Authentication')) console.log('✘  make sure the username/password pair is matched');
      console.log('=  done!\n');
      throw err.message;
    }
  
    console.log('✔  %d records inserted', ret.insertedCount);
    console.log('=  done!\n');
  }
