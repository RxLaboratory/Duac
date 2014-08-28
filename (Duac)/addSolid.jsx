/*
	

Duac / Duduf Actions for After Effects
Copyright (c) 2010 Nicolas Dufresne
http://www.duduf.net



This file is part of Duac.

     Duac is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

     Duac is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with  Duac. If not, see <http://www.gnu.org/licenses/>.
*/	


/* Duduf Actions for After Effects
	addSolid : Ajouter un solide

	*/


// fonction couleur hex to floating RGB
function hex2RGB(couleur) {
	// fonction hex to entier
	function hex2Number(hex) {
		if (hex == "0") return 0;
		if (hex == "1") return 1;
		if (hex == "2") return 2;
		if (hex == "3") return 3;
		if (hex == "4") return 4;
		if (hex == "5") return 5;
		if (hex == "6") return 6;
		if (hex == "7") return 7;
		if (hex == "8") return 8;
		if (hex == "9") return 9;
		if (hex.toLowerCase() == "a") return 10;
		if (hex.toLowerCase()  == "b") return 11;
		if (hex.toLowerCase()  == "c") return 12;
		if (hex.toLowerCase()  == "d") return 13;
		if (hex.toLowerCase()  == "e") return 14;
		if (hex.toLowerCase()  == "f") return 15;
		}
	var r =  hex2Number(couleur.substring(0,1)) * 16 + hex2Number(couleur.substring(1,2));
	var g =  hex2Number(couleur.substring(2,3)) * 16 + hex2Number(couleur.substring(3,4));
	var b =  hex2Number(couleur.substring(4,5)) * 16 + hex2Number(couleur.substring(5));
	return [r/255,g/255,b/255] ;
	}

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();
		
		
		
		//fenètre de config du solide
		fenetre = new Window("dialog","Créer Solide");
		fenetre.bounds = [300,300,600,522];
		fenetre.add("statictext",[2,2,100,20],"Nom : ");
		var nom = fenetre.add("edittext",[102,2,298,20],"solide");
		fenetre.add("statictext",[2,42,100,60],"Largeur (px) : ");
		fenetre.add("statictext",[2,62,100,80],"Hauteur (px) : ");
		var largeur = fenetre.add("edittext",[102,42,298,60]);
		var hauteur = fenetre.add("edittext",[102,62,298,80]);
		var compo = fenetre.add("checkbox",[2,82,298,100],"Créer de la taille de la compo");
		compo.onClick = function () {
			largeur.enabled = !compo.value ;
			hauteur.enabled = !compo.value ;
			}
		compo.value = true;
		largeur.enabled = false;
		hauteur.enabled = false;
		fenetre.add("statictext",[2,122,100,140],"Pixel Aspect : ");
		var pixel = fenetre.add("edittext",[102,122,298,140],"1");
		fenetre.add("statictext",[2,162,100,180],"Couleur :       #");
		var couleur = fenetre.add("edittext",[102,162,298,180],"000000");
		
		//bouton ok / test, construire le code
         var test = fenetre.add("button",[140,200,198,220],"Tester");
		var ok = fenetre.add("button",[200,200,298,220],"OK");
        
		ok.onClick = function () {
		if (compo.value)
		var script = "//#addSolid \n" + 
        "app.project.activeItem.layers.addSolid(" + hex2RGB(couleur.text).toSource() + ",'" +  nom.text + "'," +  "app.project.activeItem.width,app.project.activeItem.height," +  pixel.text + ");\n\n";		
		else
		var script = "//#addSolid \n" + 
        "app.project.activeItem.layers.addSolid(" + hex2RGB(couleur.text).toSource() + ",'" +  nom.text + "'," +   largeur.text + "," +  hauteur.text + "," +  pixel.text + ");\n\n";			
		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write(script);
		tmp.close();
        delete tmp;
        fenetre.hide();		
            }
        
       test.onClick = function () { 
          if (compo.value)
		var script = "//#addSolid \n" + 
        "app.project.activeItem.layers.addSolid(" + hex2RGB(couleur.text).toSource() + ",'" +  nom.text + "'," +  "app.project.activeItem.width,app.project.activeItem.height," +  pixel.text + ");\n";		
		else
		var script = "//#addSolid \n" + 
        "app.project.activeItem.layers.addSolid(" + hex2RGB(couleur.text).toSource() + ",'" +  nom.text + "'," +   largeur.text + "," +  hauteur.text + "," +  pixel.text + ");\n";
        eval(script);
           }

		//afficher la fenètre
		fenetre.show();