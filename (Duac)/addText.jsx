
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
	addPreset : Ajouter un preset

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        //fenètre de config du texte
		fenetre = new Window("dialog","Créer Solide");
		fenetre.bounds = [300,300,600,342];
		fenetre.add("statictext",[2,2,100,20],"Texte : ");
		var texte = fenetre.add("edittext",[102,2,298,20],"texte");

		//bouton ok / test, construire le code
         var test = fenetre.add("button",[140,22,198,40],"Tester");
		var ok = fenetre.add("button",[200,22,298,40],"OK");
        
		ok.onClick = function () {
		var script = "//#addText \n" + 
        "app.project.activeItem.layers.addText('" + texte.text + "');\n\n";		
		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write(script);
		tmp.close();
        delete tmp;
        fenetre.hide();	
            }
        
       test.onClick = function () { 
		var script = "//#addText \n" + 
        "app.project.activeItem.layers.addText('" + texte.text + "');\n\n";
        eval(script);
           }
       
       fenetre.show();