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
	selectName : Sélecte un calque par son nom


	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();
        
        var fenetre = new Window("dialog","Sélection par nom");
        fenetre.bounds = [300,300,700,362];

        var exact = fenetre.add("radiobutton",[2,2,100,20],"Nom exact :");
        var contient = fenetre.add("radiobutton",[2,22,100,40],"Contient :");
        var nomCalque = fenetre.add("edittext",[102,2,398,20],"");
        nomCalque.enabled = false;
        var contientCalque = fenetre.add("edittext",[102,22,398,40],"");
        contient.value = true;
        exact.onClick = function () {
            nomCalque.enabled = exact.value;
            contientCalque.enabled = contient.value;
            }
         contient.onClick = function () {
            nomCalque.enabled = exact.value;
            contientCalque.enabled = contient.value;
            }
        
        //bouton ok construire le code
		var ok = fenetre.add("button",[102,42,166,60],"OK");
        
		ok.onClick = function () {        
        
            if(exact.value) {
        //le code
		var script = "//#selectName \n" + 
        "for (i=0;i<app.project.activeItem.layers.length;i++) {\n" +
        "if (app.project.activeItem.layer(i+1).name.toLowerCase() == '" + nomCalque.text.toLowerCase() + "') app.project.activeItem.layer(i+1).selected = true;\n" +
        "}\n\n";
        }
        if(contient.value) {
            		var script = "//#selectName \n" + 
        "for (i=0;i<app.project.activeItem.layers.length;i++) {\n" +
        "if (app.project.activeItem.layer(i+1).name.toLowerCase().indexOf('" + contientCalque.text.toLowerCase() + "') != -1) app.project.activeItem.layer(i+1).selected = true;\n" +
        "}\n\n";
            }


		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write(script);
		tmp.close();
        delete tmp;
        fenetre.hide();	
            }
        
        
        fenetre.show();